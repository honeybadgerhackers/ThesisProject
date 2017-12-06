import { combineReducers } from 'redux';
import trips from './trips-reducer';
import activeTrip from './active-trip-reducer';
import user from './user-reducer';
import navigation from './navigation-reducer';


export default combineReducers({
  trips,
  activeTrip,
  user,
  navigation,
});
