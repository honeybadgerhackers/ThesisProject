import { CREATE_TRIP } from '../constants/';

export default function createTrip(trip) {
  return {
    type: CREATE_TRIP,
    payload: trip,
  };
}
