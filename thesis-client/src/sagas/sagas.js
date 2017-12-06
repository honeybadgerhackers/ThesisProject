import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Alert } from 'react-native';
import { AuthSession } from 'expo';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { LOGIN, INITIATE_LOGIN } from '../constants';
import { FB_APP_ID, facebookAuthUri, SERVER_URI } from '../../config';

//worker saga - calls API and returns response_handlePressAsync = async () => {
const _handlePressAsync = async () => {
  this.setState({ disableButton: true });
  const redirectUrl = AuthSession.getRedirectUrl();
  // ! You need to add this url to your authorized redirect urls on your Facebook app ! //
  console.log({ redirectUrl });

  const { type, params: { code } } = await AuthSession.startAsync({
    authUrl: facebookAuthUri(FB_APP_ID, encodeURIComponent(redirectUrl)),
  });

  if (type !== 'success') {
    Alert.alert('Error', 'Uh oh, something went wrong');
    this.setState({ disableButton: false });
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
    Alert.alert('Error', 'Unable to retrieve user data');
    this.setState({ disableButton: false });
    return;
  }

  const user = jwtDecode(userData.id_token);

  this.setState({ disableButton: false });
  this.props.loginUser(user);
};

const loginUserAsync = function* () {
  try {
    console.log('User fills out facebook forms');
    console.log('Send data to proxy, await response');
    console.log('On response, put data to store');
  } catch (error) {
    console.log(error);
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

// ! watchHandleLogin
// ! Button Press

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
  ]);
};

export { rootSaga, watchGetTrips };
