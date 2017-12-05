import React from 'react';
import Root from '../navigation/root-navigator';

export default class Redirect extends React.Component {
  static navigationOptions = {
    title: 'Redirect',
    header: null,
  };

  render = () => (
    <Root />
  );
}
