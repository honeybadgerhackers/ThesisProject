import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Map from '../components/map-component';

class MapScreen extends Component {
  render() {
    const { trip } = this.props;
    return (
      <View>
        <Map trip={trip} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    trip: state.activeTrip
  };
}

export default connect(mapStateToProps)(MapScreen);
