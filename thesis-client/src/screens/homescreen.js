import React, { Component } from 'react';
import { View, ScrollView, Platform, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Expo from 'expo';
import { getActiveTrip } from '../actions/activeTrip-action';
import getUserLocation from '../actions/getUserLocation-action';
import { postFavorite } from '../actions/favorite-action';
import icon from '../assets/icons/bikeIcon.png';
import { STATUS_BAR_HEIGHT } from '../constants';
import Trip from '../components/trip-component';
import getUserPhotosAction from '../actions/getUserPhotos-action';

const cacheImages = images => images.map(image => {
    if (typeof image === 'string') { return Image.prefetch(image); }
    return Expo.Asset.fromModule(image).downloadAsync();
});

class HomeScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  static propTypes = {
    //eslint-disable-next-line
    user: PropTypes.object.isRequired,
    getUserLocation: PropTypes.func.isRequired,
    addFavorite: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    trips: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    showTripLocation: PropTypes.func.isRequired,
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
   navigation: { navigate }, trips, showTripLocation, userLocation, user, addFavorite
  } = this.props;
    return (
      <View style={styles.homeScreenView}>

        <ScrollView>
          <Trip
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
