import { StackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/profile';

const ProfileStack = StackNavigator({
  Profile: {
    screen: ProfileScreen
  }
});

export default ProfileStack;
