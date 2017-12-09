import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, Text, View, StyleSheet, Button, TouchableOpacity, StatusBar } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { join } from 'redux-saga/effects';
import Polyline from "@mapbox/polyline";
import { getDirections } from '../actions/getDirections-action';
import Stats from '../components/routeStats-component';

class WayPoint extends Component {
  state = {
    localUserLocation: null,
    speed: null,
    errorMessage: null,
    disableButton: false,
    followUserLocation: false,
    showsUserLocation: true,
    wayPoints: [],
    buttonStartStop: false,
  };
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    }
  }
  componentWillUnmount() {
    this._stopTrackLocation();
  }
  _getDirections = async (origin, destination, joinedWaypoints) => {
  if (!origin) {
    const wayPointsObjects = this.state.wayPoints;
    const wayPoints = wayPointsObjects.map(wayPoint => Object.values(wayPoint).join());
    origin = wayPoints.splice(0, 1);
    destination = wayPoints.splice(wayPoints.length - 1, 1);
    joinedWaypoints = wayPoints.join('|');
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
  _handlePositionChange = location => {
    const wayPoint = {
      lat: location.coords.latitude,
      lng: location.coords.longitude
    };
    const wayPoints = this.state.wayPoints.slice();
    this.setState({ speed: location.coords.speed });
    wayPoints.push(wayPoint);
    this.setState({
      wayPoints, localUserLocation: location
    });
  };
  _stopTrackLocation = () => {
    if (this.track) {
      this.track.remove();
      this.setState({ disableButton: false, followUserLocation: false });
    }
    this._getDirections();
    this.setState({ coords: this.props.routeCoords });
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
          style={styles.map}
          initialRegion={this.props.mapRegion}
          showsUserLocation={this.state.showsUserLocation}
          followsUserLocation={this.state.followUserLocation}
        >
          <MapView.Polyline
            coordinates={this.props.routeCoords}
            strokeWidth={10}
            strokeColor="red"
          />          
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({
              buttonStartStop: !this.state.buttonStartStop
            })}
          >
            <Text>{this.state.buttonStartStop ? 'End' : 'Start'}</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ flex: 3 }}>
          <Button
            disabled={this.state.disableButton}
            title="Watch Location"
            onPress={this._trackLocationAsync}
          />
          <Button title="Stop Watching" onPress={this._stopTrackLocation} />
          <Text style={styles.paragraph}>Speed: {this.state.speed}</Text>
          <Text style={styles.paragraph}>{text}</Text>
        </View> */}
      </View>
      );
  }
}

function mapStateToProps(state) {
  return {
    userLocation: state.userLocation,
    mapRegion: state.mapRegion,
    routeCoords: state.routeCoords.coordsArray
  };
}
const mapDispatchToProps = (dispatch) => ({
  getDirectionsSaga: (origin, destination, joinedWaypoints) => {
    dispatch(getDirections(origin, destination, joinedWaypoints));
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 12,
    width: 160,
  },
  statBar: {
    backgroundColor: 'black',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WayPoint);
