import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Dimensions } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import store from './src';
import HomeScreen from './src/screens/homescreen';
import MapScreen from './src/screens/mapscreen';

const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen
  },
});

const MapStack = StackNavigator({
  Map: {
    screen: MapScreen
  }
});

const RootNavigator = TabNavigator(
  {
    Home: {
      screen: HomeStack
    },
    Map: {
      screen: MapStack
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#2242CC',
      activeBackgroundColor: '#fff',
      inactiveTintColor: '#000',
      inactiveBackgroundColor: '#fff',
      labelStyle: {
        fontSize: 13
      },
      style: {
        // Currently there is no great way to center two tab icons, so we do
        // it manually here by assuming that each tab icon is about 125 points wide
        paddingHorizontal: (Dimensions.get('window').width - 225) / 2,
        backgroundColor: '#fff',
        height: 55
      }
    }
  }
);


export default class App extends Component {
  render() {
    // const MainNavigator = StackNavigator({
    //   Main: { screen: HomeScreen }
    // });

    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
