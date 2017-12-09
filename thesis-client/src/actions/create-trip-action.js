import { CREATE_TRIP } from '../constants/';

export default (origin, destination, waypoints, userId) => {
  return {
    type: CREATE_TRIP,
    payload: {
      origin,
      destination,
      waypoints,
    },
    userId,
  };
};
