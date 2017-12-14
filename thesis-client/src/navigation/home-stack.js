import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/homescreen';

const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  }
}, /*{ headerMode: 'screen' }*/);

export default HomeStack;

