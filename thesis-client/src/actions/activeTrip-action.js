export default function(trip, cb) {
  cb();
  return {
    type: 'TRIP_SELECTED',
    payload: trip,
  };
}
