import React from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';

const Map = ({ activeTrip }) =>
    <View> 
      <MapView
        provider={'google'}
        showsMyLocationButton
        style={{ alignSelf: 'stretch', height: 540 }}
        region={activeTrip.location} 
      />
    </View>;

export default Map;
