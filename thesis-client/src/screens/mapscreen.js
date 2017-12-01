import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Map from '../components/map-component';

class MapScreen extends Component {
  render() {
    const { activeTrip } = this.props;
    return (
      <View>
        <Map activeTrip={activeTrip} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeTrip: state.activeTrip
  };
}

export default connect(mapStateToProps)(MapScreen);
