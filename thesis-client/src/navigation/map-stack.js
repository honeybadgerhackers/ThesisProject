import { StackNavigator } from 'react-navigation';
import MapScreen from '../screens/mapscreen';

const MapStack = StackNavigator({
  Map: {
    screen: MapScreen
  },  
},
{ 
  headerMode: 'screen'
});

export default MapStack;
