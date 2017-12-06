import { LOGIN, LOGOUT, INITIATE_LOGIN } from '../constants';

export const initiateLogin = () => {
  return ({
    type: INITIATE_LOGIN,
  });
};

export const loginUser = user => ({
  type: LOGIN,
  user,
});

export const logoutUser = () => ({
  type: LOGOUT,
});
