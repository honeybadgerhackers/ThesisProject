import React, { Component } from 'react';
import { View, ScrollView, Platform, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Expo from 'expo';
import Swiper from 'react-native-swiper';
import selectTrip from '../actions/activeTrip-action';
import getTrips from '../actions/getTrip-action';
import getUserLocation from '../actions/getUserLocation-action';
import { getUserFavorites } from '../actions/getUserInfo-action';
import icon from '../assets/icons/bikeIcon.png';
import { STATUS_BAR_HEIGHT } from '../constants';
import Trip from '../components/trip-component';
import Favorite from '../components/favorites';

const cacheImages = images => images.map(image => {
    if (typeof image === 'string') { return Image.prefetch(image); }
    return Expo.Asset.fromModule(image).downloadAsync();
});

class HomeScreen extends Component {
  static navigationOptions = () => ({
    header: null
  });

  static propTypes = {
    //eslint-disable-next-line
    user: PropTypes.object.isRequired,
    getUserLocation: PropTypes.func.isRequired,
    getUserFavorites: PropTypes.func.isRequired,
    getAllTrips: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    trips: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    showTripLocation: PropTypes.func.isRequired,
  };

  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this.props.getUserLocation();
    this._loadAssetsAsync();
    this.props.getUserFavorites(this.props.user.id);
    this.props.getAllTrips();
  }

  _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([icon]);
    await Promise.all([...imageAssets]);
    this.setState({ appIsReady: true });
  }

  render() {
    const {
   navigation: { navigate }, trips, showTripLocation, favorites,
  } = this.props;
  console.log(favorites);
    return (
      <Swiper
        style={styles.wrapper}
        loop={false}
      >
        <View style={styles.homeScreenView}>
          <Text style={styles.title}>
              Routes Near You
          </Text>
          <ScrollView>
            <Trip
              navigate={navigate}
              trips={trips}
              showTripLocation={showTripLocation}
            />
          </ScrollView>
        </View>
        <View style={styles.homeScreenView}>
          <Text style={styles.title}>
              Favorited
          </Text>
          <ScrollView>
            <Favorite
              navigate={navigate}
              favorites={favorites}
              showTripLocation={showTripLocation}
            />
          </ScrollView>
        </View>
      </Swiper>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    trips: state.trips.trips.slice(0, 10),
    favorites: state.favorites.favorites,
  };
}

const mapDispatchToProps = dispatch => ({
  showTripLocation: (trip, cb) => {
    dispatch(selectTrip(trip, cb));
  },
  getAllTrips: () => {
    dispatch(getTrips());
  },
  getUserLocation: () => {
    dispatch(getUserLocation());
  },
  getUserFavorites: (userId) => {
    dispatch(getUserFavorites(userId));
  },
});

const styles = {
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: 'lightblue',
    borderWidth: 2,
  },
  imageStyle: {
    marginLeft: 10,
    width: 40,
    height: 40,
  },
  imageStyle2: {
    marginRight: 10,
    width: 40,
    height: 40,
  },
  homeScreenView: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
