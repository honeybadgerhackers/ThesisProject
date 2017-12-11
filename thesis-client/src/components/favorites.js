import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import mapIcon from '../assets/icons/mapIcon.png';

const Favorite = ({ navigate, favorites, showTripLocation }) => {
    console.log(favorites);
  const goToMap = () => {
    navigate('Map');
  };

  const createTrip = () => favorites.map(trip => (
    <TouchableOpacity
      key={trip.id}
      onPress={() => showTripLocation(trip, goToMap)}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{trip.route_name}</Text>
          <Text style={styles.subtitle}>Current Rating: {trip.current_rating}</Text>
          <Text style={styles.startingAddress}>12345 N.Starting Address</Text>
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.imageContainerText}>{trip.type}</Text>
          <Image source={mapIcon} style={styles.imageStyle} />
          <Text style={styles.favoriteCount}>{trip.favorite_count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ));

  return <View>{createTrip()}</View>;
};

Favorite.propTypes = {
  navigate: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showTripLocation: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'grey',
    height: 150,
    borderWidth: 2,
  },
  textContainer: {
    flex: 3,
    backgroundColor: 'grey',
    height: 148,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'grey',
    height: 148,
    width: 50,
  },
  imageContainerText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
  },
  imageStyle: {
    alignSelf: 'center',
    marginTop: 5,
    height: 75,
    width: 75,
  },
  favoriteCount: {
    marginTop: 2,
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  startingAddress: {
    marginTop: 10,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});

export default Favorite;

