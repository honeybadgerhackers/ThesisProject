import React, { Component } from 'react';
import { View, ScrollView, Platform, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import Expo from 'expo';
import { selectTrip } from '../actions/activeTrip-action';
import { getTrips } from '../actions/getTrip-action';
import icon from '../assets/bikeIcon.png';
import { STATUS_BAR_HEIGHT } from '../constants';
import Trip from '../components/trip-component';


const cacheImages = images => images.map(image => {
    if (typeof image === 'string') return Image.prefetch(image);
    return Expo.Asset.fromModule(image).downloadAsync();
});


class HomeScreen extends Component {
  static navigationOptions = () => ({
    header: null
  });

  state = {
    appIsReady: false
  };

  componentWillMount() {
    this._loadAssetsAsync();
    this.props.getAllTrips();
  }

  async _loadAssetsAsync() {
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
    trips: state.trips.trips.slice(0, 10) 
  };
}

const mapDispatchToProps = (dispatch) => ({
    showTripLocation: (trip, cb) => {
      dispatch(selectTrip(trip, cb)); 
    },
    getAllTrips: () => {
      dispatch(getTrips());
    }
  });

const styles = {
  imageStyle: {
    // marginTop: 5,
    marginLeft: 10,
    width: 40,
    height: 40
  },
  imageStyle2: {
    // marginTop: 5,
    marginRight: 10,
    width: 40,
    height: 40
  },
  homeScreenView: {
    flex: 1
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
