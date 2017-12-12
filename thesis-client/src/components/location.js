import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, Text, View, StyleSheet, Button, Alert } from 'react-native';
import { MapView, Constants, Location } from 'expo';
import PropTypes from 'prop-types';
import Polyline from "@mapbox/polyline";
// import { join } from 'redux-saga/effects';
import CreateTripModal from './create-trip-modal';
import getDirections from '../actions/getDirections-action';
import { createTrip, createTripSave, cancelCreateTrip } from '../actions/create-trip-action';
import { createPolyline } from '../utilities/processors';
import { juliaToSoniat } from '../testing/long-route';


const starIcons = {
  filled: require('../assets/icons/star_filled.png'),
  unfilled: require('../assets/icons/star_unfilled.png'),
};

class WayPoint extends Component {
  static propTypes = {
    getDirectionsSaga: PropTypes.func.isRequired,
    createTripDispatch: PropTypes.func.isRequired,
    saveTripDispatch: PropTypes.func.isRequired,
    cancelTripDispatch: PropTypes.func.isRequired,
    mapRegion: PropTypes.shape({}).isRequired,
    userId: PropTypes.number.isRequired,
    // eslint-disable-next-line
    routeCoords: PropTypes.array,
    mapImage: PropTypes.string,
    routeTitle: PropTypes.string,
    newTripData: PropTypes.shape({}),
  }

  static defaultProps = {
    routeCoords: [],
    mapImage: null,
    routeTitle: null,
    newTripData: null,
  }

  state = {
    localUserLocation: null,
    speed: null,
    errorMessage: null,
    disableButton: false,
    followUserLocation: false,
    showsUserLocation: true,
    // ! Switch back to array 
    wayPoints: juliaToSoniat,
    // [
      // { lat: 29.935865, lng: -90.077473, speed: 5.36448 },
      // { lat: 29.932741, lng: -90.082687, speed: 5.36448 },
      // { lat: 29.935330, lng: -90.084586, speed: 5.36448 },
      // { lat: 29.935646, lng: -90.083974, speed: 5.36448 },
    // ],
    speedCounter: 1,
    topSpeed: 0,
    avgSpeed: 0,
    visibleModal: 0,
    rating: 0,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    }
  }

  componentWillUnmount() {
    if (this.track) {
      this.track.remove();
      this.setState({ disableButton: false, followUserLocation: false });
    }
  }

  setRating = (selectedRating) => {
    this.setState({ rating: selectedRating });
  }

  _processTrip = () => {
    const tripWayPoints = this.state.wayPoints.slice().map(wayPoint => [wayPoint.lat, wayPoint.lng]);
    const origin = tripWayPoints.splice(0, 1).join(',');
    const destination = tripWayPoints.splice(tripWayPoints.length - 1, 1).join(',');
    const joinedWayPoints = createPolyline(tripWayPoints);

    this.props.createTripDispatch(origin, destination, joinedWayPoints, this.props.userId);
  }

  _getDirections = async (origin, destination, joinedWaypoints) => {
  if (!origin) {
    let filteredWayPoints;
    const wayPointsObjects = this.state.wayPoints;
    const wayPoints = wayPointsObjects.map(wayPoint => [wayPoint.lat, wayPoint.lng]);

    origin = wayPoints.splice(0, 1).join(',');
    destination = wayPoints.splice(wayPoints.length - 1, 1).join(',');
    if (wayPoints.length > 23) {
      const interval = Math.floor(wayPoints.length / 23);
      const indicesToSave = Array(23).fill(interval);

      for (let i = 1; i < indicesToSave.length; i++) {
        indicesToSave[i] = indicesToSave[i - 1] + indicesToSave[i];
      }

      filteredWayPoints = wayPoints.filter((wayPoint, index) => {
        if (indicesToSave.indexOf(index) > - 1) {
          return true;
        }
        return false;
      });
    }

    joinedWaypoints = filteredWayPoints ? Polyline.encode(filteredWayPoints) : Polyline.encode(wayPoints);
  }
    this.props.getDirectionsSaga(origin, destination, joinedWaypoints);
  };

  _trackLocationAsync = async () => {
    this.setState({ disableButton: true, followUserLocation: true });
    this.track = await Location.watchPositionAsync(
      { distanceInterval: 5, timeInterval: 30000, enableHighAccuracy: true },
      this._handlePositionChange,
    );
  };

  _handleSpeedChange = (speedMetersPerSecond) => {
    const { topSpeed, avgSpeed, speedCounter } = this.state;
    const speed = speedMetersPerSecond * 2.2369;
    const currentSpeed = speed < 0 ? 0 : Math.round(speed * 100) / 100;
    this.setState({
      topSpeed: speed > topSpeed ? speed : topSpeed,
      avgSpeed: Math.round(((avgSpeed * (speedCounter - 1) + currentSpeed) / speedCounter) * 100) / 100,
    });
    this.setState({ speedCounter: speedCounter + 1 });
  }

  _handlePositionChange = async (location) => {
    // ! Re-enable 
    // const wayPoint = {
      //   lat: location.coords.latitude,
      //   lng: location.coords.longitude,
      //   speed: location.coords.speed,
      //   timestamp: location.timestamp,
      // };

    // this._handleSpeedChange(speed);
    const wayPoints = this.state.wayPoints.slice();

    // ! Re-enable 
    // wayPoints.push(wayPoint);
    this.setState({
      wayPoints, localUserLocation: location,
    });
    this.setState({ speed: location.coords.speed });
  };

  _stopTrackLocation = () => {
    if (this.track) {
      this.track.remove();
      this.setState({ disableButton: false, followUserLocation: false });
    }
    this._processTrip();
    this.setState({ visibleModal: 1 });
  };

  openRatingModal = () => {
    this.setState({ visibleModal: 2 });
  }

  closeModal = () => {
    this.setState({ visibleModal: 0 });
  }

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.localUserLocation) {
      text = JSON.stringify(this.state.localUserLocation);
    }
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 7 }}
          initialRegion={this.props.mapRegion}
          showsUserLocation={this.state.showsUserLocation}
          followsUserLocation={this.state.followUserLocation}
        >
          <MapView.Polyline
            coordinates={this.props.routeCoords}
            strokeWidth={2}
            strokeColor="red"
          />
        </MapView>
        <View style={{ flex: 3 }}>
          <Button
            disabled={this.state.disableButton}
            title="Watch Location"
            onPress={this._trackLocationAsync}
          />
          <Button title="Stop Watching" onPress={this._stopTrackLocation} />
          <Text style={styles.paragraph}>Speed: {this.state.speed}</Text>
          <Text style={styles.paragraph}>{text}</Text>
        </View>
        <CreateTripModal
          visibleModal={this.state.visibleModal}
          saveTrip={this.props.saveTripDispatch}
          cancelTrip={this.props.cancelTripDispatch}
          googleMapImage={this.props.mapImage}
          tripName={this.props.routeTitle}
          tripData={this.props.newTripData}
          speedCounter={this.state.speedCounter}
          avgSpeed={this.state.avgSpeed}
          rating={this.state.rating}
          closeModal={this.closeModal}
          openRatingModal={this.openRatingModal}
          setRating={this.setRating}
          starIcons={starIcons}
        />
      </View>
      );
  }
}

function mapStateToProps(state) {
  return {
    userLocation: state.userLocation,
    mapRegion: state.mapRegion,
    routeCoords: state.routeCoords.coordsArray,
    userId: state.user.id,
    mapImage: state.mapImage.image,
    routeTitle: state.mapImage.routeTitle,
    newTripData: state.createTrip.data,
  };
}
const mapDispatchToProps = (dispatch) => ({
  getDirectionsSaga: (origin, destination, joinedWaypoints) => {
    dispatch(getDirections(origin, destination, joinedWaypoints));
  },
  createTripDispatch: (origin, destination, waypoints, userId) => {
    dispatch(createTrip(origin, destination, waypoints, userId));
  },
  cancelTripDispatch: () => {
    dispatch(cancelCreateTrip());
  },
  saveTripDispatch: (tripStats, tripData) => {
    dispatch(createTripSave(tripStats, tripData));
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WayPoint);
