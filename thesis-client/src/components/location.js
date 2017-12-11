import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, Text, View, StyleSheet, Button, TouchableOpacity, StatusBar } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { join } from 'redux-saga/effects';
import Polyline from "@mapbox/polyline";
import { getDirections } from '../actions/getDirections-action';
import Stats from '../components/routeStats-component';

class WayPoint extends Component {
  constructor(props) {
    super(props);
  this.state = {
    // localUserLocation: null,
    speed: null,
    // errorMessage: null,
    followUserLocation: false,
    showsUserLocation: true,
    wayPoints: [],
    buttonStart: true,
  };
}
  componentWillMount() {
    // if (Platform.OS === "android" && !Constants.isDevice) {
    //   this.setState({
    //     errorMessage:
    //       "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
    //   });
    // }
  }
  componentWillUnmount() {
    this._stopTrackLocation();
  }
  _getDirections = async (origin, destination, joinedWaypoints) => {
    if (!origin) {
      const wayPointsObjects = this.state.wayPoints;
      const wayPoints = wayPointsObjects.map((wayPoint) =>
        Object.values(wayPoint).join());
      origin = wayPoints.splice(0, 1);
      destination = wayPoints.splice(wayPoints.length - 1, 1);
      joinedWaypoints = wayPoints.join("|");
    }
    this.props.getDirectionsSaga(origin, destination, joinedWaypoints);
  };
  _trackLocationAsync = async () => {
    this.setState({
      buttonStart: !this.state.buttonStart,
      followUserLocation: true,
    });
    this.track = await Location.watchPositionAsync(
      { distanceInterval: 5, timeInterval: 30000, enableHighAccuracy: true },
      this._handlePositionChange
    );
  };
  _handlePositionChange = location => {
    const wayPoint = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
    const wayPoints = this.state.wayPoints.slice();
    this.setState({ speed: location.coords.speed });
    wayPoints.push(wayPoint);
    console.log(wayPoint, this.state.speed);
    this.setState({
      wayPoints,
    });
  };
  _stopTrackLocation = () => {
    if (this.track) {
      this.track.remove();
      this.setState({
        buttonStart: !this.state.buttonStart,
        followUserLocation: false,
      });
    }
    this._getDirections();
  };
  goToHomeScreen() {
    this.props.clearActiveTrip();
    this.props.navigate("Home");
  }
  customTripStartOrEnd = () => {
    if (this.state.buttonStart) {
      this._trackLocationAsync();
      // this.setState({ buttonStartStop: !this.state.buttonStartStop });
    } else {
      this._stopTrackLocation();
      // this.setState({ buttonStartStop: !this.state.buttonStartStop });
    }
  }
  render() {
    if (this.props.activeTrip.route_name === undefined) {
      console.log(this.props.routeCoords);
      return (
        <View style={styles.container}>
          <MapView
            provider='google'
            style={styles.map}
            region={this.props.mapRegion}
            showsUserLocation={this.state.showsUserLocation}
            followsUserLocation={this.state.followUserLocation}
          >
            {this.props.activeTrip.coords !== undefined && (
            <MapView.Polyline
              coordinates={this.props.routeCoords}
              strokeWidth={3}
              strokeColor="red"
            />
            )}
          </MapView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.customTripStartOrEnd()
              }
            >
              <Text>{this.state.buttonStart ? "Start" : "End"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <MapView
            provider="google"
            style={styles.map}
            region={this.props.mapRegion}
            showsUserLocation={this.state.showsUserLocation}
            followsUserLocation={this.state.followUserLocation}
          >
            {this.props.activeTrip.coords !== undefined && (
              <MapView.Polyline
                coordinates={this.props.activeTrip.coords}
                strokeWidth={3}
                strokeColor="red"
              />            
            )}
          </MapView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.setState({
                  // buttonStartStop: !this.state.buttonStartStop,
                })
              }
            >
              <Text>{this.state.buttonStartStop ? "End" : "Start"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.goToHomeScreen()
              }
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

// function mapStateToProps(state) {
//   return {
//     userLocation: state.userLocation,
//     mapRegion: state.mapRegion,
//     routeCoords: state.routeCoords.coordsArray
//   };
// }
// const mapDispatchToProps = (dispatch) => ({
//   getDirectionsSaga: (origin, destination, joinedWaypoints) => {
//     dispatch(getDirections(origin, destination, joinedWaypoints));
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center"
  },
  buttonContainer: {
    marginVertical: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 12,
    width: 160,
    marginBottom: 5,
  },
  statBar: {
    backgroundColor: "black"
  }
});

// export default connect(mapStateToProps, mapDispatchToProps)(WayPoint);
export default WayPoint;