import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import mapIcon from '../assets/mapIcon.png'; 
import { selectTrip } from '../actions/trip-actions';

class Trip extends Component {
  
  onTripSelect() {
    return this.props.navigation.navigate('MapScreen');
  }

  createTrip() {
    return this.props.trips.map(trip => (
      <TouchableOpacity
        key={trip.id}
        onPress={() => this.props.selectTrip(trip, this.onTripSelect()}
        style={styles.container}
      >
        <View style={styles.textContainer}>
        <Text style={styles.title}>{trip.name}</Text>
        <Text style={styles.subtitle}>{trip.start}</Text>
        <Text style={styles.subtitle}>to</Text>
        <Text style={styles.subtitle}>{trip.end}</Text>
        </View>
        <Image source={mapIcon} style={styles.imageStyle} />
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View>
        {this.createTrip()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    trips: state.trips
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ selectTrip }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Trip);

// const styles = {
//   imageStyle: {
//     alignSelf: 'flex-end',
//     marginTop: 40,
//     // marginRight: 10,
//     width: 100,
//     height: 100
//   }
// };
const styles = StyleSheet.create({
  imageStyle: {
    alignSelf: 'flex-end',
    marginTop: 30,
    width: 100,
    height: 100
  },
  container: {
    flexDirection: 'row',
    borderBottomColor: 'black'
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: '#565656'
  }
});
