import { LOGIN, LOGOUT, INITIATE_LOGIN } from '../constants';

export const initiateLogin = (handleButtonPress) => {
  if (handleButtonPress) {
    handleButtonPress();
  }
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
