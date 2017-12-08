import { CREATE_TRIP } from '../constants';

export default function createTripReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_TRIP:
      return action.payload;
    default:
      return state;
  }
}
