import { CREATE_TRIP } from '../constants/';

export default (trip, userId) => {
  return {
    type: CREATE_TRIP,
    payload: trip,
    userId,
  };
}
