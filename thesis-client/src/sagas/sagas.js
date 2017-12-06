import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { AuthSession } from 'expo';
import { all, call, put, takeEvery, take, fork, cancel } from 'redux-saga/effects';
import { dbPOST } from '../utilities/server-calls';
import { storeItem } from '../utilities/async-storage';
import { INITIATE_LOGIN, LOGIN, LOGOUT, LOGIN_ERROR, STORAGE_KEY, ENABLE_BUTTON, DISABLE_BUTTON } from '../constants';
import { FB_APP_ID, facebookAuthUri, SERVER_URI } from '../../config';

//worker saga - calls API and returns response_handlePressAsync = async () => {
  /*
const _handlePressAsync = async () => {
  TODO this.setState({ disableButton: true });
  const redirectUrl = AuthSession.getRedirectUrl();
  // ! You need to add this url to your authorized redirect urls on your Facebook app ! //
  console.log({ redirectUrl });

  const { type, params: { code } } = await AuthSession.startAsync({
    authUrl: facebookAuthUri(FB_APP_ID, encodeURIComponent(redirectUrl)),
  });

  if (type !== 'success') {
  TODO  Alert.alert('Error', 'Uh oh, something went wrong');
  TODO   this.setState({ disableButton: false });
    return;
  }

  const userInfoResponse = await fetch(`${SERVER_URI}/authorize`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      redirectUrl,
    }),
  });

  const userData = await userInfoResponse.json();
  if (userData.type !== 'success!') {
  TODO  Alert.alert('Error', 'Unable to retrieve user data');
  TODO  this.setState({ disableButton: false });
    return;
  }

  const user = jwtDecode(userData.id_token);

  TODO this.setState({ disableButton: false });
  this.props.loginUser(user);
};

*/

const authorizeUser = function* () {
  // ? Break out to another function?
  const redirectUrl = AuthSession.getRedirectUrl();
  try {
    console.log('User fills out facebook forms');

    // ? Break out AuthSession.startAsync to API calls utility?

    const { type, params: { code } } = yield all([
      yield call(AuthSession.startAsync, {authUrl: facebookAuthUri(FB_APP_ID, encodeURIComponent(redirectUrl))}),
      yield put({ type: DISABLE_BUTTON }),
    ]);

    if (type !== 'success') {
      yield put({ type: LOGIN_ERROR });
    }

    // ? Check for failure
    const { type: apiType, id_token, access_token }  = yield call(dbPOST, '/authorize', { code, redirectUrl });

    if (apiType !== 'success!') {
      yield put({ type: LOGIN_ERROR });
    }

    const user = jwtDecode(id_token);

    yield all([
      yield put({ type: LOGIN, user }),
      yield call(storeItem, access_token, STORAGE_KEY),
    ]);
  } catch (error) {
    console.log(error);
    yield put({ type: LOGIN_ERROR, error});
  }
};

const getTripsAsync = function* () {
  try {
    console.log('Attempting to get trips from API');
    const tripsRequest = yield call(axios.get, `${SERVER_URI}/route`);
    yield put({ type: 'GET_TRIPS_SUCCESS', payload: tripsRequest.data });
    console.log('Saga Trips loaded');
  } catch (error) {
    console.log(error);
  }
};
//watcher saga - listen for actions to be dispatched, will call worker

const loginFlow = function* () {
  while (true) {
    yield take(INITIATE_LOGIN);
    const task = yield fork(authorizeUser);
    const action = yield take([LOGOUT, LOGIN_ERROR]);
    if (action.type === LOGOUT) {
      yield cancel(task);
    }
  }
  // yield takeLast(INITIATE_LOGIN. loginUserAsync);
};

const watchGetTrips = function* () {
  console.log('redux saga is running the getTrips action');
  yield takeEvery('GET_TRIPS', getTripsAsync);
  console.log('Getting Trips');
};

//combine watcher sagas to root saga

//entry point to start all sagas at once
const rootSaga = function* () {
  yield all([
    watchGetTrips(),
    loginFlow(),
  ]);
};

export { rootSaga, watchGetTrips };
