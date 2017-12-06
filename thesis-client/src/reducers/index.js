import { combineReducers } from 'redux';
import trips from './trips-reducer.js';
import activeTrip from './active-trip-reducer.js';
import user from './user-reducer';
import navigation from './navigation-reducer';
import userLocation from './user-location-reducer';
import mapRegion from './map-region-reducer';
import routeCoords from './update-route-coords';


export default combineReducers({
  routeCoords,
  mapRegion,
  userLocation,
  trips,
  activeTrip,
  user,
  navigation
}); 
