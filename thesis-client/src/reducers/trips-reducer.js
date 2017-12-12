import { GET_TRIPS, GET_TRIPS_SUCCESS } from '../constants';

export default (state = { trips: [], loading: false }, action) => {
  switch (action.type) {
    case GET_TRIPS:
      return { ...state, loading: true };
    case GET_TRIPS_SUCCESS:
      return { trips: action.payload, loading: false };
    default:
      return state;
  }
};
