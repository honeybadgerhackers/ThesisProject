import { GET_DIRECTIONS } from '../constants';

export default (origin, destination, joinedWaypoints) => ({
  type: GET_DIRECTIONS,
  payload: {
    origin,
    destination,
    joinedWaypoints,
  },
});

