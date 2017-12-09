import { NavigationActions } from 'react-navigation';
import { LOGIN, LOGOUT } from '../constants';
import LoginStack from '../navigation/login-stack';

const ActionForLoggedOut = LoginStack.router.getActionForPathAndParams('login');
const ActionForLoggedIn = LoginStack.router.getActionForPathAndParams('home');

const stateForLoggedOut = LoginStack.router.getStateForAction(ActionForLoggedOut);
const stateForLoggedIn = LoginStack.router.getStateForAction(ActionForLoggedIn);

const initialState = { stateForLoggedOut, stateForLoggedIn };

export default (state = initialState, action) => {
  switch (action.type) {
    case '@@redux/INIT':
    return {
      ...state,
      stateForLoggedIn: LoginStack.router.getStateForAction(
        ActionForLoggedIn,
        stateForLoggedOut
      ),
    };

    case LOGIN:
    return {
      ...state,
      stateForLoggedIn: LoginStack.router.getStateForAction(
        ActionForLoggedIn,
        stateForLoggedOut
      ),
    };

    case LOGOUT:
    return {
      ...state,
      stateForLoggedOut: LoginStack.router
        .getStateForAction(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'login' })],
        })),
    };

    default:
    return {
      ...state,
      stateForLoggedIn: LoginStack.router.getStateForAction(
          action,
          state.stateForLoggedIn
        ),
      };
  }
};
