import { ENABLE_BUTTON, DISABLE_BUTTON } from '../constants';

export const disableLoginButton = () => ({
  type: DISABLE_BUTTON,
});

export const enableLoginButton = () => ({
  type: ENABLE_BUTTON,
});
