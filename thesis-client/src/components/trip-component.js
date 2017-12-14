import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import mapIcon from '../assets/icons/mapIcon.png';
import { appColors } from '../constants';

const HeartIcon = ({ focused }) => (
  <Ionicons
    name={focused ? 'ios-heart' : 'ios-heart-outline'}
    size={26}
    style={{ color: appColors.begonia }}
  />
);


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
    let Icon = HeartIcon(!!favoriteId[trip.id]);
    let action = favoriteId[trip.id] ? () => deleteFavorite(user.id, trip.id) : () => addFavorite(user.id, trip.id);
    return (
      <View
        style={styles.container}
        key={trip.id}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{trip.route_name}</Text>
          <Text style={styles.subtitle}>Current Rating: {trip.current_rating}</Text>
          <Text style={styles.startingAddress}>{trip.street}</Text>
        </View>
        <View style={styles.imageContainer}>
          {/* <Text style={styles.imageContainerText}>{trip.type}</Text> */}
          {/* <TouchableOpacity
            onPress={action}
          >
            <Image source={icon} showIcon style={styles.imageStyle} />
          </TouchableOpacity> */}
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
        <View style={styles.favoriteContainer}>
          <TouchableOpacity
            onPress={action}
          >
            <Icon />
            {/* <Image source={heartIcon} showIcon style={styles.imageStyle} /> */}
          </TouchableOpacity>
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
  user: PropTypes.shape({}).isRequired,
  trips: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showTripLocation: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: appColors.midLightBlue,
    height: 150,
    borderWidth: 1,
  },
  textContainer: {
    flex: 3,
    height: 148,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColors.navyBlue,
    textAlign: 'center',
    marginTop: 25,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: appColors.navyBlue,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    height: 148,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteContainer: {
    flex: 1,
    height: 148,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainerText: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: appColors.navyBlue,
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
    color: appColors.navyBlue,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  startingAddress: {
    marginTop: 10,
    fontSize: 15,
    color: appColors.navyBlue,
    textAlign: 'center',
  },
});

export default Trip;

