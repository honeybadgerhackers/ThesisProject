import {
  SAVE_SESSION,
  SAVE_SESSION_SUCCESS,
  SAVE_SESSION_FAILED,
} from '../constants';

const initialState = {
  status: inactive,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    // case SAVE_SESSION:
    //   return {
    //     ...state,
    //     payload,
    //   };
    case SAVE_SESSION_SUCCESS:
      return {
        ...state,
        payload,
      };
    case SAVE_SESSION_FAILED:
      return {
        ...state,
      };
    case SAVE_SESSION:
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
