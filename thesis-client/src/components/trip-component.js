import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';
import mapIcon from '../assets/icons/mapIcon.png';
import heartIcon from '../assets/icons/heart.png';
import { appColors } from '../constants';

const Trip = ({
   navigate, trips, showTripLocation, addFavorite, user, favorites, deleteFavorite
}) => {
  const goToMap = () => {
    navigate('Map');
  };
  const favoriteId = favorites.reduce((prev, current) => {
    prev[current.id] = true;
    return prev;
  }, {});
  const createTrip = () => trips.map(trip => {
    let icon = favoriteId[trip.id] ? heartIcon : mapIcon;
    let action = favoriteId[trip.id] ? () => deleteFavorite(user.id, trip.id) : () => addFavorite(user.id, trip.id);
    return (
      <View
        style={styles.container}
        key={trip.id}
      >
        <TouchableOpacity
          onPress={action}
        >
          <Image source={icon} showIcon style={styles.imageStyle} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{trip.route_name}</Text>
          <Text style={styles.subtitle}>Current Rating: {trip.current_rating}</Text>
          <Text style={styles.startingAddress}>12345 N.Starting Address</Text>
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.imageContainerText}>{trip.type}</Text>
          <TouchableOpacity
            onPress={() => showTripLocation(trip, goToMap)}
          >
            <Image source={mapIcon} showIcon style={styles.imageStyle} />
          </TouchableOpacity>
          <Text style={styles.favoriteCount}>{trip.favorite_count}</Text>
        </View>
      </View>
  );
  });
  return <View>{createTrip()}</View>;
};

Trip.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  navigate: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  // user: PropTypes.object.func.isRequired,
  trips: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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

export default Trip;

