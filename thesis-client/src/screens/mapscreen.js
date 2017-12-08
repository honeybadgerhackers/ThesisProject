import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Map from '../components/map-component';
import CustomTripMap from '../components/location';

// eslint-disable-next-line
class MapScreen extends Component {
  static navigationOptions = () => ({
    header: null
  });
  
  static propTypes = {
    activeTrip: PropTypes.shape({}),
  };

  static defaultProps = {
    activeTrip: {},
  };

  render() {
    const { activeTrip, userLocation, mapRegion } = this.props;
    

    // return <CustomeTripMap />;
    return (
      <Map activeTrip={activeTrip} userLocation={userLocation} mapRegion={mapRegion} />
    );
  }
}

function mapStateToProps(state) {
  return {
    activeTrip: state.activeTrip,
    userLocation: state.userLocation,
    mapRegion: state.mapRegion,
  };
}

export default connect(mapStateToProps)(MapScreen);
