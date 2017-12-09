import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Map from '../components/map-component';
import CustomTripMap from '../components/location';
import { clearActiveTrip } from '../actions/activeTrip-action';

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
    const {
      activeTrip,
      userLocation,
      mapRegion,
      routeCoords,
      clearActiveTrip,
      navigation: {navigate}
    } = this.props;

    // return <CustomeTripMap />;
    console.log("ROUTE COORDS", this.props.routeCoords);

    return (
      <Map 
        activeTrip={activeTrip}
        userLocation={userLocation}
        mapRegion={mapRegion}
        routeCoords={routeCoords}
        clearActiveTrip={clearActiveTrip}
        navigate={navigate}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    activeTrip: state.activeTrip,
    userLocation: state.userLocation,
    mapRegion: state.mapRegion,
    routeCoords: state.routeCoords.coordsArray,
  };
}
const mapDispatchToProps = dispatch => ({
  clearActiveTrip: () => {
    dispatch(clearActiveTrip());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
