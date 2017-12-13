import {
  SAVE_SESSION,
  SAVE_SESSION_SAVE,
  SAVE_SESSION_SUCCESS,
  SAVE_SESSION_FAILED,
  RETRIEVED_TRIP_DATA,
} from '../constants';

const initialState = {
  status: inactive,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case SAVE_SESSION:
      return {
        ...state,
        payload,
      };
    case SAVE_SESSION_SUCCESS:
      return {
        ...state,
        payload,
      };
    case SAVE_SESSION_FAILED:
      return {
        ...state,
      };
    case RETRIEVED_TRIP_DATA:
      return {
        ...state,
        data: {
          routeTitle: payload.routeTitle,
          distance: payload.text,
          wayPoints: payload.via_waypoint,
          userId: payload.userId,
        },
      };
    case SAVE_SESSION_SAVE:
      return {
        ...state,
        postData: {
          tripStats: payload.tripStats,
          tripData: payload.tripData,
        },
      };

    default:
      return state;
  }
};
