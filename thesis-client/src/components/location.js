import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, Text, View, StyleSheet, Button, Alert } from 'react-native';
import { MapView, Constants, Location } from 'expo';
import PropTypes from 'prop-types';
import Polyline from "@mapbox/polyline";
// import { join } from 'redux-saga/effects';
import getDirections from '../actions/getDirections-action';
import createTrip from '../actions/create-trip-action';
import { juliaToSoniat } from '../testing/long-route';

class WayPoint extends Component {
  static propTypes = {
    getDirectionsSaga: PropTypes.func.isRequired,
    createTripDispatch: PropTypes.func.isRequired,
    mapRegion: PropTypes.shape({}).isRequired,
    userId: PropTypes.number.isRequired,
    // eslint-disable-next-line
    routeCoords: PropTypes.array,
  }

  static defaultProps = {
    routeCoords: [],
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
    speedCounter: 0,
    topSpeed: 0,
    avgSpeed: 0,
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
    this._stopTrackLocation();
  }

  processTrip = () => {
    let tripWayPoints = this.state.wayPoints.slice().map(wayPoint => [wayPoint.lat, wayPoint.lng]);
    // const tripSpeed = {
    //   topSpeed: this.state.topSpeed,
    //   avgSpeed: this.state.avgSpeed,
    // };
    const origin = tripWayPoints.splice(0, 1).join(',');
    const destination = tripWayPoints.splice(tripWayPoints.length - 1, 1).join(',');
    if (tripWayPoints.length > 23) {
      const interval = Math.floor(tripWayPoints.length / 23);
      const indicesToSave = Array(23).fill(interval);

      for (let i = 1; i < indicesToSave.length; i++) {
        indicesToSave[i] = indicesToSave[i - 1] + indicesToSave[i];
      }

      tripWayPoints = tripWayPoints.filter((wayPoint, index) => {
        if (indicesToSave.indexOf(index) > - 1) {
          return true;
        }
        return false;
      });
    }
    const joinedWaypoints = Polyline.encode(tripWayPoints);

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
      this._handlePositionChange
    );
  };

  _handleSpeedChange = async (speed) => {
    const { state: {topSpeed, avgSpeed, speedCounter }} = this;
    const currentSpeed = speed < 0 ? 0 : Math.round(speed * 100) / 100;
    this.setState({ speedCounter: speedCounter + 1 });
    this.setState({
      topSpeed: speed > topSpeed ? speed : topSpeed,
      avgSpeed: Math.round((avgSpeed * (speedCounter - 1) + currentSpeed) / speedCounter),
    });
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

    // ? location.coords.speed is maybe meters/second, apparently multiplying
    // ? by 2.2369 will conver to miles per hour. We'll see?
    this.setState({ speed: location.coords.speed * 2.2369 });
    // ! Re-enable 
    // wayPoints.push(wayPoint);
    this.setState({
      wayPoints, localUserLocation: location,
    });
  };

  _stopTrackLocation = () => {
    if (this.track) {
      this.track.remove();
      this.setState({ disableButton: false, followUserLocation: false });
    }
    this._getDirections();
    Alert.alert(
      'Save',
      'Would you like to save this trip to your routes?',
      [
        { text: 'No', onPress: () => console.log('pressed no', this.props.userId)},
        {
          text: 'Yes',
          onPress: () => this.props.createTripDispatch(this.state.wayPoints, this.props.userId),
        },
      ]
    );
  };

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
  };
}
const mapDispatchToProps = (dispatch) => ({
  getDirectionsSaga: (origin, destination, joinedWaypoints) => {
    dispatch(getDirections(origin, destination, joinedWaypoints));
  },
  createTripDispatch: (origin, destination, waypoints, userId) => {
    dispatch(createTrip(origin, destination, waypoints, userId));
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
