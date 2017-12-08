import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Alert } from 'react-native';
import { Location, Permissions } from 'expo';
import Polyline from '@mapbox/polyline';
import { all, call, put, takeEvery, take, fork, cancel } from 'redux-saga/effects';
import { dbPOST, dbSecureGET, dbSecurePOST } from '../utilities/server-calls';
import { storeItem, getItem } from '../utilities/async-storage';
import { getRedirectUrl, facebookAuth } from '../utilities/api-calls';
import { INITIATE_LOGIN, LOGIN, LOGOUT, LOGIN_ERROR, STORAGE_KEY, ENABLE_LOGIN, DISABLE_LOGIN } from '../constants';
import { SERVER_URI, googleAPIKEY } from '../../config';


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
          yield call(storeItem, STORAGE_KEY, access_token),
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
    const tripsRequest = yield call(dbSecureGET, 'route');
    yield put({ type: 'GET_TRIPS_SUCCESS', payload: tripsRequest });
  } catch (error) {
    console.log(error);
  }
};

const loginFlow = function* () {
  while (true) {
    yield take(INITIATE_LOGIN);

    const task = yield fork(authorizeUser);
    const action = yield take([LOGOUT, LOGIN_ERROR]);

    if (action.type === LOGOUT) {
      yield cancel(task);
    }
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

const getActiveTripAsync = function* (action) {
  let filter = {
    'id_route': action.payload.id,
  };
  try {
    const activeTrip = yield call(dbSecureGET, 'route&location', JSON.stringify(filter));
    yield put({ type: 'GET_ACTIVE_TRIP_SUCCESS', payload: activeTrip });
  } catch (error) {
    console.log(error);
  }
};

const watchGetTrips = function* () {
  yield takeEvery("GET_TRIPS", getTripsAsync);
};

const watchGetUserLocation = function* () {
  yield takeEvery("GET_USER_LOCATION", getUserLocationAsync);
};

const watchGetDirections = function* () {
  yield takeEvery('GET_DIRECTIONS', getUserDirectionsAsync);
};

const watchGetActiveTrip = function* () {  
  yield takeEvery('GET_ACTIVE_TRIP', getActiveTripAsync);
};

const rootSaga = function* () {
  yield all([
    watchGetTrips(),
    loginFlow(),
    watchGetUserLocation(),
    watchGetDirections(),
    watchGetActiveTrip(),
  ]);
};

export { rootSaga, watchGetTrips, watchGetUserLocation, watchGetDirections };
