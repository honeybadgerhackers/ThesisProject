import { combineReducers } from 'redux';
import trips from './trips-reducer.js';
import activeTrip from './active-trip-reducer.js';

export default combineReducers({
  trips,
  activeTrip
});
