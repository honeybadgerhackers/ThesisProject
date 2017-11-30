export const selectTrip = (trip, cb) => {
  cb();
  return {
    type: 'TRIP_SELECTED',
    payload: trip
  };
};
