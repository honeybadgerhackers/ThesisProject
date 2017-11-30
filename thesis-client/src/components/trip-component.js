import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import mapIcon from '../assets/mapIcon.png'; 

const Trip = ({ navigate, trips, showTripLocation }) => {  
  const goToMap = () => {
    navigate('Map');
  };

  const createTrip = () => trips.map(trip => (
      <TouchableOpacity
        key={trip.id}
        onPress={() => showTripLocation(trip, goToMap)}
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

export default Trip;

