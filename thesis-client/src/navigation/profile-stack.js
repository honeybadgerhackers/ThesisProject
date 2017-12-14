import { StackNavigator } from 'react-navigation';
import ProfileScreen2 from "../screens/profileScreen";
import StatsScreen from "../screens/profile-stats-screen";
import RoutesScreen from "../screens/profile-routes-screen";

const ProfileStack = StackNavigator({
  Profile: {
    screen: ProfileScreen2,
  },
  Stats: {
    screen: StatsScreen,
  },
  // Photos: {
  //   screen:
  // },
  Routes: {
    screen: RoutesScreen,
  },

});

export default ProfileStack;
