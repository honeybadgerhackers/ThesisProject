import { ENABLE_LOGIN, DISABLE_LOGIN } from '../constants';

const loginButton = (active = { enabled: false }, action) => {
  console.log(active, action.type);
  switch (action.type) {
    case '@@redux/INIT':
      return { ...active, enabled: false };
    case ENABLE_LOGIN:
      return { ...active, enabled: false };
    case DISABLE_LOGIN:
      return { ...active, enabled: true };
    default:
      return { ...active, enabled: false };
  }
};

export default loginButton;
