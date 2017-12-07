import { all, call, put, takeEvery } from 'redux-saga/effects';
import { MapView, Constants, Location, Permissions } from 'expo';
import axios from 'axios';
import Polyline from '@mapbox/polyline';
import googleAPIKEY from '../config';


const getTripsAsync = function* () {
  try {
    const tripsRequest = yield call(axios.get, 'http://18.216.220.101:8091/route');
    yield put({ type: 'GET_TRIPS_SUCCESS', payload: tripsRequest.data });
  } catch (error) {
    console.log(error);
  }
};

const watchGetTrips = function* () {
  yield takeEvery('GET_TRIPS', getTripsAsync);
};

const getUserLocationAsync = function* () {
  try { 
    console.log('ASKING FOR LOCATION ACCESS PERMISSION');
    const { status } = yield call(Permissions.askAsync, Permissions.LOCATION);
    if (status !== 'granted') {
      yield put({ type: 'GET_USER_LOCATION_FAILED', payload: 'Permission to access location was denied' });
    }
    const userLocation = yield call(Location.getCurrentPositionAsync, {});
    // console.log('USER LOCATION', userLocation);
    // * Sets current location to the users -
    yield put({ type: 'UPDATE_MAP_REGION', 
      payload: { 
        latitude: userLocation.coords.latitude, 
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
        } });
    yield put({ type: 'GET_USER_LOCATION_SUCCESS', payload: userLocation });
    // * Sets MAP current location.    
  } catch (error) {
    console.log(error);
  }
};

const watchGetUserLocation = function* () {
  console.log('GETTING USER LOCATION SAGA STARTED!');
  yield takeEvery('GET_USER_LOCATION', getUserLocationAsync);
};

const getUserDirectionsAsync = function* (action) {    
  const origin = action.payload.origin;
  const destination = action.payload.destination;
  const joinedWaypoints = action.payload.joinedWaypoints;

  try {
      let res;
      // * Ali says all URLs should go in a config file. Maybe set these as a function
      // *  that returns the correct one with the space filled in?
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
          longitude: point[1]
        }));

      // * coords is saved in state to re-render the directions line.
      yield put({ type: 'UPDATE_ROUTE_COORDS', payload: coords });

      return coords;
    } catch (error) {
      console.log(error);
    }
};

const watchGetDirections = function* () {
  console.log('GETTING DIRECTIONS SAGA STARTED!');
  yield takeEvery('GET_DIRECTIONS', getUserDirectionsAsync);
};

const rootSaga = function* () {
  yield all([
    watchGetTrips(), watchGetUserLocation(), watchGetDirections(),
  ]);
};

export { rootSaga, watchGetTrips, watchGetUserLocation };
