export default (origin, destination, joinedWaypoints) => ({
  type: 'GET_DIRECTIONS',
  payload: {
    origin,
    destination,
    joinedWaypoints
  }
});

