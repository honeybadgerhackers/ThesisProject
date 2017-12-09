import { GET_USER_SESSIONS_SUCCESS } from '../constants';

export default (state = {sessions: []}, action) => {
    switch (action.type) {
      case GET_USER_SESSIONS_SUCCESS:
        return {sessions: action.payload};
      default:
        return state;
    }
};
