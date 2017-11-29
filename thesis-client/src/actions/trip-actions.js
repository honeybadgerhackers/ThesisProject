// import {
//   SELECT_TRIP_INDEX,
//   SELECT_TRIP
// } from './types';

export const selectTrip = (trip, cb) => {
  cb();
  return {
    type: 'TRIP_SELECTED',
    payload: trip
  };
};
