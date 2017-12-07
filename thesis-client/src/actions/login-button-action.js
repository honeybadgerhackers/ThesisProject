import { ENABLE_LOGIN, DISABLE_LOGIN } from '../constants';

export const disableLoginButton = () => ({
  type: DISABLE_LOGIN,
});

export const enableLoginButton = () => ({
  type: ENABLE_LOGIN,
});
