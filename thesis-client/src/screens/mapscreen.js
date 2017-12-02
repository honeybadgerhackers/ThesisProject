import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Map from '../components/map-component';
import RobMap from '../components/location';

class MapScreen extends Component {
  static navigationOptions = () => ({
    header: null
  });

  render() {
    const { activeTrip } = this.props;
    return (// <View>
      //   <View style={styles.statsToolbar} />
      //   {/* <Map activeTrip={activeTrip} /> */}
      // </View>
      <RobMap />
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
    // flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'black',
    height: 70,
  },
  stats: {
    flex: 1,
    backgroundColor: 'black',
    height: 40
  }
});
export default connect(mapStateToProps)(MapScreen);
