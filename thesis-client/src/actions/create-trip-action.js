import { CREATE_TRIP, CREATE_TRIP_CANCELLED, CREATE_TRIP_SAVE } from '../constants/';

export const createTrip = (origin, destination, wayPoints, userId) => {
  return {
    type: CREATE_TRIP,
    payload: {
      origin,
      destination,
      wayPoints,
      userId,
    },
  };
};

export const cancelCreateTrip = () => {
  return {
    type: CREATE_TRIP_CANCELLED,
  };
};

export const createTripSave = (tripStats) => {
  return {
    type: CREATE_TRIP_SAVE,
    payload: {
      speedCounter: tripStats.speedCounter,
      avgSpeed: tripStats.avgSpeed,
      rating: tripStats.rating,
    },
  };
};
