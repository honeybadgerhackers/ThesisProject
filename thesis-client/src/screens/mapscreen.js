import React, { Component } from 'react';
import { View } from 'react-native';
import Map from '../components/map-component';


class MapScreen extends Component {
  render() {
    return (
      <View>
        <Map />
      </View>
    );
  }
}

export default MapScreen;
