import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/homescreen';

const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

export default HomeStack;

