import { combineReducers } from 'redux';
import trips from './trips-reducer';
import activeTrip from './active-trip-reducer';
import createTrip from './create-trip-reducer';
import mapImage from './map-image-reducer';
import user from './user-reducer';
import navigation from './navigation-reducer';
import loginButton from './login-button-reducer';
import userLocation from './user-location-reducer';
import mapRegion from './map-region-reducer';
import routeCoords from './update-route-coords';
import userRoutes from './user-route-reducer';
import userSessions from './user-session-reducer';
import favorites from './user-favorite-reducer';

export default combineReducers({
  favorites,
  userRoutes,
  userSessions,
  routeCoords,
  mapRegion,
  userLocation,
  trips,
  activeTrip,
  createTrip,
  mapImage,
  user,
  navigation,
  loginButton,
});
