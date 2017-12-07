import React, { Component } from 'react';
import { View, ScrollView, Platform, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Expo from 'expo';
import getActiveTrip from '../actions/activeTrip-action';
import getTrips from '../actions/getTrip-action';
import { getUserLocation } from '../actions/getUserLocation-action';
import icon from '../assets/bikeIcon.png';
import { STATUS_BAR_HEIGHT } from '../constants';
import Trip from '../components/trip-component';

const cacheImages = images => images.map(image => {
    if (typeof image === 'string') { return Image.prefetch(image); }
    return Expo.Asset.fromModule(image).downloadAsync();
});

class HomeScreen extends Component {
  static navigationOptions = () => ({
    header: null
  });

  static propTypes = {
    getAllTrips: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    trips: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    showTripLocation: PropTypes.func.isRequired,
  };

  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this.props.getUserLocation();
    this._loadAssetsAsync();
    this.props.getAllTrips();    
  }

  _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([icon]);
    await Promise.all([...imageAssets]);
    this.setState({ appIsReady: true });
  }

  render() {
    const { navigation: { navigate }, trips, showTripLocation } = this.props;
    return (
      <View style={styles.homeScreenView}>
        <ScrollView>
          <Trip
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
    trips: state.trips.trips.slice(0, 10),
  };
}

const mapDispatchToProps = dispatch => ({
  showTripLocation: (trip, cb) => {
    dispatch(getActiveTrip(trip, cb));
  },
  getAllTrips: () => {
    dispatch(getTrips());
  },
  getUserLocation: () => {
    dispatch(getUserLocation());
  }
});

const styles = {
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
