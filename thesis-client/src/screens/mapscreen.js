import React, { Component } from 'react';
import PropTypes from 'prop-types';import { connect } from 'react-redux';
import Map from '../components/map-component';
import CustomTripMap from '../components/location';
import { clearActiveTrip } from '../actions/activeTrip-action';
import { getDirections } from "../actions/getDirections-action";


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
      navigation: {navigate},
      getDirectionsSaga,
    } = this.props;

    return (
      <CustomTripMap
        activeTrip={activeTrip}
        userLocation={userLocation}
        mapRegion={mapRegion}
        routeCoords={routeCoords}
        clearActiveTrip={clearActiveTrip}
        navigate={navigate}
        getDirectionsSaga={getDirectionsSaga}
      />
    )

    // return (
    //   <Map
    //     activeTrip={activeTrip}
    //     userLocation={userLocation}
    //     mapRegion={mapRegion}
    //     routeCoords={routeCoords}
    //     clearActiveTrip={clearActiveTrip}
    //     navigate={navigate}
    //   />
    // );
  }
}

function mapStateToProps(state) {
  return {
    userLocation: state.userLocation,
    activeTrip: state.activeTrip,
    mapRegion: state.mapRegion,
    routeCoords: state.routeCoords.coordsArray,
  };
}
const mapDispatchToProps = dispatch => ({
  clearActiveTrip: () => {
    dispatch(clearActiveTrip());
  },
  getDirectionsSaga: (origin, destination, joinedWaypoints) => {
    dispatch(getDirections(origin, destination, joinedWaypoints));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
