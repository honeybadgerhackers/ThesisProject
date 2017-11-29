import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';


class Map extends Component {

  handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion }); 
  };

  render() { 
    console.log(this.props.trip);
    return (
      <View> 
        <MapView
          provider={'google'}
          showsMyLocationButton
          style={{ alignSelf: 'stretch', height: 545 }}
          region={this.props.trip.location} 
        />
      </View> 
    );
  } 
}

function mapStateToProps(state) {
  return {
    trip: state.activeTrip
  };
}

export default connect(mapStateToProps)(Map);
