import React from 'react';
import { View, Image, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import mapIcon from '../assets/icons/mapIcon.png';
import defaultImage from '../assets/images/default.jpg';
import { appColors, appColorsTransparency } from '../constants';

const HeartIcon = (favorite) => (
  <Ionicons
    name={favorite ? 'ios-heart' : 'ios-heart-outline'}
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
    const {
      photo_url,
      id,
      type,
      route_name,
      current_rating,
      street,
      favorite_count,
    } = trip;
    let Icon = HeartIcon(!!favoriteId[id]);
    let action = favoriteId[id] ? () => deleteFavorite(user.id, id) : () => addFavorite(user.id, id);
    return (
      <ImageBackground
        key={id}
        style={{}}
        source={photo_url ? { uri: photo_url } : require('../assets/images/default.jpg')}
      >
        <View
          style={styles.container}
          key={id}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>{route_name}</Text>
            <Text style={styles.subtitle}>Current Rating: {current_rating}</Text>
            <Text style={styles.startingAddress}>{street}</Text>
          </View>
          <View style={styles.imageContainer}>
            {/* <Text style={styles.imageContainerText}>{type}</Text> */}
            {/* <TouchableOpacity
              onPress={action}
            >
              <Image source={icon} showIcon style={styles.imageStyle} />
            </TouchableOpacity> */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{route_name}</Text>
              <Text style={styles.startingAddress}>{street}</Text>
              <Text style={styles.subtitle}>Current Rating: {current_rating}</Text>
            </View>
            <View style={styles.imageContainer}>
              {/* <Text style={styles.imageContainerText}>{type}</Text> */}
              <TouchableOpacity
                onPress={() => showTripLocation(trip, goToMap)}
              >
                <Image source={mapIcon} showIcon style={styles.imageStyle} />
              </TouchableOpacity>
              <Text style={styles.favoriteCount}>{favorite_count}</Text>
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
      </ImageBackground>
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
    // backgroundColor: appColors.midLightBlue,
    height: 150,
    borderWidth: 1,
  },
  textContainer: {
    flex: 3,
    // height: 148,
    padding: 10,
    margin: 10,
    backgroundColor: appColorsTransparency(0.7).logoBlue,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: appColors.transparent,
    color: appColors.lightBlue,
    textAlign: 'left',
    fontFamily: 'Devanagari Sangam MN',
    // marginTop: 25,
  },
  startingAddress: {
    marginTop: 10,
    fontSize: 15,
    backgroundColor: appColors.transparent,
    color: appColors.lightBlue,
    textAlign: 'left',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: appColors.lightBlue,
    backgroundColor: appColors.transparent,
    textAlign: 'left',
  },
  imageContainer: {
    flex: 1,
    height: 148,
    width: 50,
    backgroundColor: appColors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteContainer: {
    flex: 1,
    height: 148,
    width: 50,
    backgroundColor: appColors.transparent,
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
});

export default Trip;

