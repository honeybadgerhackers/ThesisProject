import { GET_USER_TRIPS_SUCCESS } from '../constants';

export default (state = {routes: []}, action) => {
    switch (action.type) {
      case GET_USER_TRIPS_SUCCESS:
        return {routes: action.payload};
      default:
        return state;
    }
};
