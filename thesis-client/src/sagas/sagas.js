import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Alert } from 'react-native';
import { all, call, put, takeEvery, take, fork, cancel } from 'redux-saga/effects';
import { dbPOST } from '../utilities/server-calls';
import { storeItem } from '../utilities/async-storage';
import { getRedirectUrl, facebookAuth } from '../utilities/api-calls';
import { INITIATE_LOGIN, LOGIN, LOGOUT, LOGIN_ERROR, STORAGE_KEY, ENABLE_LOGIN, DISABLE_LOGIN } from '../constants';
import { SERVER_URI } from '../../config';

//worker saga - calls API and returns response_handlePressAsync = async () => {
const authorizeUser = function* () {
  const redirectUrl = getRedirectUrl;
  try {
    yield put({ type: DISABLE_LOGIN });

    const { type, params: { code, error } } = yield call(facebookAuth, redirectUrl);

    if (type === 'success' && !error) {
      const {
        type: apiType,
        id_token,
        access_token,
      } = yield call(dbPOST, '/authorize', { code, redirectUrl });

      if (apiType === 'success!') {

        const user = jwtDecode(id_token);

        yield all([
          yield put({ type: LOGIN, user }),
          yield call(storeItem, access_token, STORAGE_KEY),
          yield put({ type: ENABLE_LOGIN }),
        ]);
      }  else {
        throw new Error('Database call failed', type);
      }
    } else {
      throw new Error('Facebook login failed', type);
    }

  } catch (error) {
    console.log('error', error);
    Alert.alert('Cancelled');
    yield all([
        yield put({ type: LOGIN_ERROR, error }),
        yield put({ type: ENABLE_LOGIN }),
    ]);
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
