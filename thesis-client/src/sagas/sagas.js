import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Alert } from 'react-native';
import { Location, Permissions } from 'expo';
import Polyline from '@mapbox/polyline';
import { all, call, put, takeEvery, takeLatest, take, fork, cancel } from 'redux-saga/effects';
import { dbPOST, dbSecureGET, dbSecurePOST } from '../utilities/server-calls';
import { storeItem } from '../utilities/async-storage';
import { getRedirectUrl, facebookAuth } from '../utilities/api-calls';
import { INITIATE_LOGIN_DEMO, INITIATE_LOGIN, LOGIN, LOGOUT, LOGIN_ERROR, STORAGE_KEY, ENABLE_LOGIN, DISABLE_LOGIN, CREATE_TRIP, demoUser } from '../constants';
import { googleAPIKEY } from '../../config';


const authorizeUser = function* (params) {
  const redirectUrl = getRedirectUrl;
  try {
    yield put({ type: DISABLE_LOGIN });

    const { type, params: { code, error } } = params.type === INITIATE_LOGIN ? yield call(facebookAuth, redirectUrl) : { type: "success", params: { code: demoUser, error: null } };

    if (type === 'success' && !error) {
      // ! Quick hack to make loader run, probably should fix later
      yield put({ type: ENABLE_LOGIN });
      yield put({ type: DISABLE_LOGIN });
      const {
        type: apiType,
        id_token,
        access_token,
      } = yield call(dbPOST, '/authorize', { code, redirectUrl });

      if (apiType === 'success!') {

        const user = jwtDecode(id_token);
        yield all([
          yield put({ type: LOGIN, user }),
          yield call(storeItem, STORAGE_KEY, access_token),
          yield put({ type: ENABLE_LOGIN }),
        ]);

      } else {
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
    const tripsRequest = yield call(dbSecureGET, 'route');

    yield put({ type: 'GET_TRIPS_SUCCESS', payload: tripsRequest });
  } catch (error) {
    console.log('async', JSON.stringify(error));
  }
};

const getUserLocationAsync = function* () {
  try {
    const { status } = yield call(Permissions.askAsync, Permissions.LOCATION);
    if (status !== 'granted') {
      yield put({ type: 'GET_USER_LOCATION_FAILED', payload: 'Permission to access location was denied' });
    }
    const userLocation = yield call(Location.getCurrentPositionAsync, {});
    yield put({
      type: 'UPDATE_MAP_REGION',
      payload: {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        },
    });
    yield put({ type: 'GET_USER_LOCATION_SUCCESS', payload: userLocation });
  } catch (error) {
    console.log(error);
  }
};

const getUserDirectionsAsync = function* ({ payload: { origin, destination, joinedWaypoints } }) {
  // const origin = action.payload.origin;
  // const destination = action.payload.destination;
  // const joinedWaypoints = action.payload.joinedWaypoints;

  try {
      let res;
      if (!joinedWaypoints) {
        res = yield call(axios.get, `https://maps.googleapis.com/maps/api/directions/json?origin=${
            origin
          }&destination=${destination}&waypoints=${joinedWaypoints}&key=${googleAPIKEY}`);
      } else {
        res = yield call(axios.get, `https://maps.googleapis.com/maps/api/directions/json?origin=${
            origin
          }&destination=${destination}&key=${googleAPIKEY}`);
      }
      const points = Polyline.decode(res.data.routes[0].overview_polyline.points);
      const coords = points.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));

      yield put({ type: 'UPDATE_ROUTE_COORDS', payload: coords });
      return coords;

    } catch (error) {
      console.log(error);
    }
};

<<<<<<< f92a87b26edb54524ecde7bd3cb4c0b727277a7b
const createTripAsync = function* (payload) {
  const { payload: waypoints, userId} = payload;
  try {
    const result = yield call(dbSecurePOST, 'route', { waypoints, userId });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const loginFlow = function* () {
  while (true) {
    const initiateAction = yield take([INITIATE_LOGIN, INITIATE_LOGIN_DEMO]);

    const task = yield fork(authorizeUser, initiateAction);
    const action = yield take([LOGOUT, LOGIN_ERROR]);

    if (action.type === LOGOUT) {
      yield cancel(task);
    }
  }
};

const watchCreateTrip = function* () {
  yield takeLatest(CREATE_TRIP, createTripAsync);
};
=======
const getUserTrips = function* ({ payload: { userId } }) {
  try {
  const userTripRequest = yield call(axios({
      method: 'GET',
      url: `http://18.216.220.101:8091/session`,
      headers: {
        filter: `{"id_user_account": ${userId}}`,
      },
    }));
    yield put({type: 'GET_USER_TRIPS_SUCCESS', payload: userTripRequest});
  } catch (error) {
    console.error(error);
  }
};
//watcher saga - listen for actions to be dispatched, will call worker
>>>>>>> (add) getUserTrips saga

const watchGetTrips = function* () {
  yield takeEvery("GET_TRIPS", getTripsAsync);
};

const watchGetUserLocation = function* () {
  yield takeEvery("GET_USER_LOCATION", getUserLocationAsync);
};

const watchGetDirections = function* () {
  yield takeEvery('GET_DIRECTIONS', getUserDirectionsAsync);
};

const watchUserTrips = function* () {
  yield takeLatest('GET_USER_TRIPS', getUserTrips);
};
//combine watcher sagas to root saga

const rootSaga = function* () {
  yield all([
    watchGetTrips(),
    watchCreateTrip(),
    loginFlow(),
    watchGetUserLocation(),
    watchGetDirections(),
    watchUserTrips(),
  ]);
};

export { rootSaga, watchGetTrips, watchGetUserLocation, watchGetDirections, watchUserTrips};