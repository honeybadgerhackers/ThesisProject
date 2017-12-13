import { StackNavigator } from 'react-navigation';
import FavoriteScreen from '../screens/favorites';

const FavoriteStack = StackNavigator({
  Favorite: {
    screen: FavoriteScreen,
  },
});

export default FavoriteStack;
