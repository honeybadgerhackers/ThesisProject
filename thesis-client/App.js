import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src';
import LoginNavigator from './src/navigation/login-navigation';
import RootNavigator from "./src/navigation/root-navigator";


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoginNavigator />
        {/* <RootNavigator /> */}
      </Provider>
    );
  }
}
