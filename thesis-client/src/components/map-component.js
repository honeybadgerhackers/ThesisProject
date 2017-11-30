import React from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';

const Map = ({ trip }) =>
    <View> 
      <MapView
        provider={'google'}
        showsMyLocationButton
        style={{ alignSelf: 'stretch', height: 545 }}
        region={trip.location} 
      />
    </View>;

export default Map;
