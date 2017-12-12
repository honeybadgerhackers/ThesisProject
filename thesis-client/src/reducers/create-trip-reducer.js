import {
  CREATE_TRIP,
  CREATE_TRIP_SAVE,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAILED,
  RETRIEVED_TRIP_DATA,
  inactive,
  inProgress,
  success,
  failed,
} from '../constants';

const initialState = {
  status: inactive,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case CREATE_TRIP:
      return {
        ...state,
        status: inProgress,
        payload,
      };
    case CREATE_TRIP_SUCCESS:
      return {
        ...state,
        status: success,
        payload,
      };
    case CREATE_TRIP_FAILED:
      return {
        ...state,
        status: failed,
      };
    case RETRIEVED_TRIP_DATA:
      return {
        ...state,
        status: inProgress,
        data: {
          routeTitle: payload.routeTitle,
          distance: payload.text,
          wayPoints: payload.via_waypoint,
          userId: payload.userId,
        },
      };
    case CREATE_TRIP_SAVE:
      return {
        ...state,
        status: inProgress,
        postData: {
          tripStats: payload.tripStats,
          tripData: payload.tripData,
        },
      };

    default:
      return state;
  }
};
