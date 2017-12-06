import React from 'react';
import { Provider } from 'react-redux';
import store from './src';
import LoginNavigator from './src/navigation/login-navigation';

export default function App() {
  return (
    <Provider store={store}>
      <LoginNavigator />
    </Provider>
  );
}
