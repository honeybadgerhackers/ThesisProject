import { StackNavigator } from 'react-navigation';
import Login from '../screens/login';
import Redirect from '../screens/redirect';

const LoginStack = StackNavigator(
  {
    login: {
      screen: Login
    },
    // ! Replace me!
    home: {
      screen: Redirect
    }
  },
  { headerMode: 'screen' }
);

export default LoginStack;
