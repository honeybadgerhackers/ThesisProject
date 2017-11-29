import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import mapIcon from '../assets/mapIcon.png'; 
import { selectTrip } from '../actions/trip-actions';

const Trip = ({ trips, navigate }) => {  
  const onTripSelect = () => {
    navigate('Map');
  };

  const createTrip = () => trips.map(trip => (
      <TouchableOpacity
        key={trip.id}
        onPress={() => selectTrip(trip, onTripSelect)}
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

  return <View>{createTrip()}</View>;  
};

function mapStateToProps(state) {
  return {
    trips: state.trips 
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectTrip }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Trip);

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
