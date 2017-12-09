
// export default function(trip, cb) {
//   cb();
//   return {
//     type: "GET_ACTIVE_TRIP",
//     payload: trip
//   };
// }

export const getActiveTrip = (trip, cb) => {
  cb();
  return {
    type: "GET_ACTIVE_TRIP",
    payload: trip,
  };
};

export const clearActiveTrip = () => {
  console.log('CLEARING ACTIVE');
  return {type: "CLEAR_ACTIVE_TRIP"};
};

