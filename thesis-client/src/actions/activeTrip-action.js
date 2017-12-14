export const getActiveTrip = (trip, cb) => {
  cb();
  console.log(trip);
  return {
    type: "GET_ACTIVE_TRIP",
    payload: trip,
  };
};

export const clearActiveTrip = () => {
  return {type: "CLEAR_ACTIVE_TRIP"};
};

