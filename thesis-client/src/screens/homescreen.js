import React, { Component } from 'react';
import { View, ScrollView, StatusBar, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Expo from 'expo';
import { getActiveTrip } from '../actions/activeTrip-action';
import getUserLocation from '../actions/getUserLocation-action';
import { postFavorite, removeFavorite } from '../actions/favorite-action';
import icon from '../assets/icons/bikeIcon.png';
import { appColors } from '../constants';
import Trip from '../components/trip-component';
import getUserPhotosAction from '../actions/getUserPhotos-action';


const cacheImages = images => images.map(image => {
    if (typeof image === 'string') { return Image.prefetch(image); }
    return Expo.Asset.fromModule(image).downloadAsync();
});

class HomeScreen extends Component {
  static navigationOptions = () => ({
    header: () => (<View style={styles.header}><Text style={styles.title}>Routes</Text></View>),
  });

  static propTypes = {
    //eslint-disable-next-line
    user: PropTypes.object.isRequired,
    getUserLocation: PropTypes.func.isRequired,
    getUserPhotos: PropTypes.func.isRequired,
    addFavorite: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    trips: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    showTripLocation: PropTypes.func.isRequired,
    deleteFavorite: PropTypes.func.isRequired,
  };

  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this.props.getUserLocation();
    this.props.getUserPhotos(this.props.user.id);
    this._loadAssetsAsync();
  }

  _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([icon]);
    await Promise.all([...imageAssets]);
    this.setState({ appIsReady: true });
  }

  render() {
    const {
   navigation: { navigate }, trips, showTripLocation, userLocation, user, favorites, addFavorite, deleteFavorite,
  } = this.props;
    return (
      <View style={styles.homeScreenView}>
        <StatusBar
          barStyle="light-content"
        />
        <ScrollView>
          <Trip
            deleteFavorite={deleteFavorite}
            favorites={favorites}
            user={user}
            addFavorite={addFavorite}
            navigate={navigate}
            trips={trips}
            showTripLocation={showTripLocation}
          />
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userLocation: state.userLocation,
    user: state.user,
    trips: state.trips.trips,
    favorites: state.favorites.favorites,
  };
}

const mapDispatchToProps = dispatch => ({
  showTripLocation: (trip, cb) => {
    dispatch(getActiveTrip(trip, cb));
  },
  getUserLocation: () => {
    dispatch(getUserLocation());
  },
  addFavorite: (userId, routeId) => {
    dispatch(postFavorite(userId, routeId));
  },

  getUserPhotos: (userId) => {
    dispatch(getUserPhotosAction(userId));
  },

  deleteFavorite: (userId, routeId) => {
    dispatch(removeFavorite(userId, routeId));
  },
});

const styles = {
  title: {
    padding: 10,
    paddingTop: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: appColors.midLightBlue,
    textAlign: 'center',
    backgroundColor: appColors.navyBlue,
  },
  header: {
    height: 80,
  },
  homeScreenView: {
    flex: 1,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
