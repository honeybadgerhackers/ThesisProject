import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, Alert } from 'react-native';
import { MapView } from 'expo';


export default class Map extends Component {
  state={
    mapRegion: { latitude: 37.78825, 
      longitude: -122.4324, 
      latitudeDelta: 0.0922, 
      longitudeDelta: 0.0421 }
  };

  handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    return (
    <View>
      <MapView 
        style={{ alignSelf: 'stretch', height: 545 }} 
        // region={this.state.mapRegion} 
        // onRegionChange={this._handleMapRegionChange}
      />
    </View>);
  }
}
