import { CREATE_TRIP } from '../constants/';

export default function createTrip(trip, userId) {
  console.log(userId);
  return {
    type: CREATE_TRIP,
    payload: trip,
    userId,
  };
}
