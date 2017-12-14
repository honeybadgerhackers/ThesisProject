import React, { Component } from 'react';
import { View, ScrollView, Platform, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Expo from 'expo';
import { getActiveTrip } from '../actions/activeTrip-action';
import getUserLocation from '../actions/getUserLocation-action';
import { getUserFavorites } from '../actions/getUserInfo-action';
import { removeFavorite } from '../actions/favorite-action';
import icon from '../assets/icons/bikeIcon.png';
import { appColors } from '../constants';
import Favorite from '../components/favorites';

const cacheImages = images => images.map(image => {
    if (typeof image === 'string') { return Image.prefetch(image); }
    return Expo.Asset.fromModule(image).downloadAsync();
});

class FavoriteScreen extends Component {
  static navigationOptions = () => ({
    header: () => (<View style={styles.header}><Text style={styles.title}>Favorites</Text></View>),
  });

  static propTypes = {
    //eslint-disable-next-line
    user: PropTypes.object.isRequired,
    getUserFavorites: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    showTripLocation: PropTypes.func.isRequired,
    deleteFavorite: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getUserFavorites(this.props.user.id);
  }

  render() {
    const {
   navigation: { navigate }, showTripLocation, favorites, userLocation, deleteFavorite, user,
  } = this.props;
    return (
      <View style={styles.homeScreenView}>
        <ScrollView>
          <Favorite
            user={user}
            deleteFavorite={deleteFavorite}
            navigate={navigate}
            favorites={favorites}
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
  getUserFavorites: (userId) => {
    dispatch(getUserFavorites(userId));
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen);
