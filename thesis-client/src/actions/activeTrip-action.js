// export default function(trip, cb) {
//   cb();
//   return {
//     type: 'TRIP_SELECTED',
//     payload: trip,
//   };
// }
export default function(trip, cb) {
  cb();
  return {
    type: "GET_ACTIVE_TRIP",
    payload: trip
  };
}