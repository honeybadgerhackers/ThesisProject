import { 
  CREATE_TRIP,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAILED,
  inactive,
  inProgress,
  success,
  failed,
} from '../constants';

const initialState = {
  status: inactive,
};

export default function createTripReducer(state = initialState, { payload }) {
  switch (action.type) {
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
    default:
      return state;
  }
}
