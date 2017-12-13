import { SAVE_SESSION, SAVE_SESSION_CANCELLED } from '../constants/';

// export const createTrip = (origin, destination, wayPoints, userId) => {
//   return {
//     type: SAVE_SESSION,
//     payload: {
//       origin,
//       destination,
//       wayPoints,
//       userId,
//     },
//   };
// };

export const cancelCreateTrip = () => {
  return {
    type: SAVE_SESSION_CANCELLED,
  };
};

export const createTripSave = (tripStats, tripData) => {
  return {
    type: SAVE_SESSION,
    payload: {
      tripStats,
      tripData,
    },
  };
};
