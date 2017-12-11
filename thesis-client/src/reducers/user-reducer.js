import { LOGIN, LOGOUT, LOGIN_ERROR } from '../constants';

export default (user = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return null;
    case LOGIN_ERROR:
      return null;
    default:
      return user;
  }
};
