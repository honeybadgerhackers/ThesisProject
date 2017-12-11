import { LOGIN, LOGOUT, INITIATE_LOGIN, INITIATE_LOGIN_DEMO } from '../constants';

export const initiateLogin = () => {
  return ({
    type: INITIATE_LOGIN,
  });
};

export const initiateLoginDemo = () => {
  return ({
    type: INITIATE_LOGIN_DEMO,
  });
};

export const loginUser = user => ({
  type: LOGIN,
  user,
});

export const logoutUser = () => ({
  type: LOGOUT,
});
