import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src';
import LoginNavigator from './src/navigation/login-navigation';
import TestingStuff from './src/screens/test';
// import RootNavigator from "./src/navigation/root-navigator";


export default function App() {
  return (
    <Provider store={store}>
      <TestingStuff />
      {/* <LoginNavigator /> */}
      {/* <RootNavigator /> */}
    </Provider>
  );
}
