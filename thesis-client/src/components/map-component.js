import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { MapView } from 'expo';

const Map = ({ activeTrip }) => (
  <View>
    <MapView
      provider="google"
      showsMyLocationButton
      style={{ alignSelf: 'stretch', height: 400 }}
      region={activeTrip.waypoints[0]}
    />
  </View>
);

Map.propTypes = {
  activeTrip: PropTypes.shape({}).isRequired,
};

export default Map;
