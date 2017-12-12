import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, Text, View, StyleSheet, Button, TouchableOpacity, StatusBar, Alert} from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import PropTypes from 'prop-types';
import { join } from 'redux-saga/effects';
import Polyline from "@mapbox/polyline";
import { getDirections } from '../actions/getDirections-action';
import createTrip from '../actions/create-trip-action';
import Stats from '../components/routeStats-component';

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
        // errorMessage: null,
        followUserLocation: false,
        showsUserLocation: true,
        wayPoints: [],
        buttonStart: true,
        secondCounter: 0,
        minuteCounter: 0,
      }
  
  // componentWillMount() {
    //   // if (Platform.OS === "android" && !Constants.isDevice) {
  //   //   this.setState({
  //   //     errorMessage:
  //   //       "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
  //   //   });
  //   // }
  //   wayPoints: [
  //     // { lat: 29.935865, lng: -90.077473, speed: 5.36448 },
  //     // { lat: 29.932741, lng: -90.082687, speed: 5.36448 },
  //     // { lat: 29.935330, lng: -90.084586, speed: 5.36448 },
  //     // { lat: 29.935646, lng: -90.083974, speed: 5.36448 },
  //   ],
  //   speedCounter: 0,
  //   topSpeed: 0,
  //   avgSpeed: 0,
  // };


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

  handleSpeedChange = (speed) => {
    const { state: {topSpeed, avgSpeed, speedCounter }} = this;
    const currentSpeed = speed < 0 ? 0 : Math.round(speed * 100) / 100;
    this.setState({ speedCounter: speedCounter + 1 });
    this.setState({
      topSpeed: speed > topSpeed ? speed : topSpeed,
      avgSpeed: Math.round((avgSpeed * (speedCounter - 1) + currentSpeed) / speedCounter),
    });
  }

  _handlePositionChange = (location) => {
    const wayPoint = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      speed: location.coords.speed,
      timestamp: location.timestamp,
    };
    const wayPoints = this.state.wayPoints.slice();

    // ? location.coords.speed is maybe meters/second, apparently multiplying
    // ? by 2.2369 will conver to miles per hour. We'll see?
    this.setState({ speed: location.coords.speed * 2.2369 });
    wayPoints.push(wayPoint);
    console.log(wayPoint, this.state.speed);
    this.setState({
      wayPoints, localUserLocation: location,
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
  };
  customTripStartOrEnd = () => {
      if (this.state.buttonStart) {
        this._trackLocationAsync();
        this.startTimer();
        // this.setState({ buttonStartStop: !this.state.buttonStartStop });
      } else {
      this._stopTrackLocation();
      this.stopTimer();
        // this.setState({ buttonStartStop: !this.state.buttonStartStop });
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
    }
  };
  startTimer = () => {
    setInterval(() => {
      this.setState({secondCounter: this.state.secondCounter + 1});
      if (this.state.secondCounter % 60 === 0) {
        this.setState({minuteCounter: this.state.minuteCounter + 1});
        this.setState({secondCounter: 0});
      }
    }, 1000);    
  }

  stopTimer = () => {
    this.setState({secondCounter: 0});
  }

  // render() {
  //   let text = 'Waiting..';
  //   if (this.state.errorMessage) {
  //     text = this.state.errorMessage;
  //   } else if (this.state.localUserLocation) {
  //     text = JSON.stringify(this.state.localUserLocation);
  //   }
  // }
  render() {
    const {secondCounter, minuteCounter} = this.state;

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
          <Stats style={styles.statBar} secondCounter={secondCounter} minuteCounter={minuteCounter} />

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
          <Stats style={styles.statBar} secondCounter={secondCounter} minuteCounter={minuteCounter} />

          <View style={styles.cancelButtonContainer}>
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
  createTripDispatch: (waypoints, userId) => {
    dispatch(createTrip(waypoints, userId));
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center"
  },
  cancelButtonContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 12,
    width: 160,
    marginBottom: 5
  },
  statBar: {
    // justifyContent: "space-between",
    // alignItems: "center"
  }
});

// export default connect(mapStateToProps, mapDispatchToProps)(WayPoint);
export default WayPoint;