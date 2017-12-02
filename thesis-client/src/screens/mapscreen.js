import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Map from '../components/map-component';

class MapScreen extends Component {
  render() {
    const { activeTrip } = this.props;
    return (
      <View>
        {/* <View style={styles.statsToolbar}>
          <View style={styles.stats} />
          <View style={styles.stats} />
          <View style={styles.stats} />
        </View> */}
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

const styles = StyleSheet.create({
  statsToolbar: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    height: 100,
  },
  stats: {
    flex: 1,
    backgroundColor: 'black',
    height: 40
  }
});
export default connect(mapStateToProps)(MapScreen);
