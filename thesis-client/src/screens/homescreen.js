import React, { Component } from 'react';
import { View, ScrollView, Platform, Image } from 'react-native';
import { connect } from 'react-redux';
import Expo from 'expo';
import { selectTrip } from '../actions/trip-actions';
import icon from '../assets/bikeIcon.png';
import { STATUS_BAR_HEIGHT } from '../constants';
import Trip from '../components/trip-component';


const cacheImages = images => images.map(image => {
    if (typeof image === 'string') return Image.prefetch(image);
    return Expo.Asset.fromModule(image).downloadAsync();
});


class HomeScreen extends Component {
  static navigationOptions = () => ({
    headerStyle: {
      height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
      backgroundColor: '#2196F3'
    },
    headerTitleStyle: {
      marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
      color: 'white'
    },
    headerLeft: <Image source={icon} style={styles.imageStyle} />
  });

  state = {
    appIsReady: false
  };

  componentWillMount() {
    this._loadAssetsAsync();
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
          <Trip navigate={navigate} trips={trips} showTripLocation={showTripLocation} />
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    trips: state.trips
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    showTripLocation: (trip, cb) => {
      dispatch(selectTrip(trip, cb)); 
    }
  };
};

const styles = {
  imageStyle: {
    marginTop: 20,
    marginLeft: 10,
    width: 40,
    height: 40
  },
  testing: {
    marginTop: 100
  },
  homeScreenView: {
    flex: 1,
    backgroundColor: '#ddd'
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
