import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from './src';
import RootNavigator from './src/navigation/root-navigator';
import LoginNavigator from './src/navigation/login-navigation';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <LoginNavigator /> */}
        <RootNavigator />
      </Provider>
    );
  }
}
