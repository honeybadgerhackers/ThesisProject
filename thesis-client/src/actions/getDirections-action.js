export const getDirections = (origin, destination, joinedWaypoints) => ({
  type: 'GET_DIRECTIONS',
  payload: {
    origin,
    destination,
    joinedWaypoints
  }
});

