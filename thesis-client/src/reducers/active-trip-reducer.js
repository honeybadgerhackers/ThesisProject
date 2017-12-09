import { TRIP_SELECTED } from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case TRIP_SELECTED:
      return action.payload;
    default:
        return state;
  }
}
