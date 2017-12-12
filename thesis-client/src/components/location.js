import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { MapView, Location } from 'expo';
import PropTypes from 'prop-types';
import CreateTripModal from './create-trip-modal';
import Stats from '../components/routeStats-component';
import getDirections from '../actions/getDirections-action';
import { createTrip, createTripSave, cancelCreateTrip } from '../actions/create-trip-action';
import { createPolyline } from '../utilities/processors';

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
    clearActiveTrip: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    activeTrip: PropTypes.shape({
      route_name: PropTypes.string,
      coords: PropTypes.string,
    }),
    mapRegion: PropTypes.shape({}).isRequired,
    userId: PropTypes.number.isRequired,
    // eslint-disable-next-line
    routeCoords: PropTypes.array,
    mapImage: PropTypes.string,
    routeTitle: PropTypes.string,
    newTripData: PropTypes.shape({}),
  }
  static defaultProps = {
    activeTrip: {},
    routeCoords: [],
    mapImage: null,
    routeTitle: null,
    newTripData: null,
  }

  state = {
    localUserLocation: null,
    speed: null,
    disableButton: false,
    followUserLocation: true,
    showsUserLocation: true,
    wayPoints: [],
    speedCounter: 1,
    topSpeed: 0,
    avgSpeed: 0,
    visibleModal: 0,
    rating: 0,
    buttonStart: true,
    timer: null,
    secondCounter: 0,
    minuteCounter: 0,
  };

  componentDidMount = () => {
    this.setState({ followUserLocation: false })
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
      speedCounter: speedCounter + 1,
      speed,
    });
  }

  _handlePositionChange = async (location) => {
    const wayPoint = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        speed: location.coords.speed,
        timestamp: location.timestamp,
      };

    this._handleSpeedChange(location.coords.speed);
    const wayPoints = this.state.wayPoints.slice();
    wayPoints.push(wayPoint);
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
    clearInterval(this.state.timer);
    this._processTrip();
    this.setState({
      visibleModal: 1,
    });
  };

  goToHomeScreen() {
    this.props.clearActiveTrip();
    this.props.navigate("Home");
  }

  customTripStartOrEnd = () => {
      if (this.state.buttonStart) {
        this._trackLocationAsync();
        this.startTimer();
      } else {
      this._stopTrackLocation();
    }
  };

  startTimer = () => {
    const timer = setInterval(() => {
        this.setState({secondCounter: this.state.secondCounter + 1});
        if (this.state.secondCounter % 60 === 0) {
          this.setState({minuteCounter: this.state.minuteCounter + 1});
          this.setState({secondCounter: 0});
        }
      }, 1000);
    this.setState({timer});
  }

  openRatingModal = () => {
    this.setState({ visibleModal: 2 });
  }

  closeModal = () => {
    this.setState({
      visibleModal: 0,
      secondCounter: 0,
      minuteCounter: 0,
    });
  }

  render() {
    const {secondCounter, minuteCounter} = this.state;

    if (this.props.activeTrip.route_name === undefined) {
      return (
        <View style={styles.container}>
          <MapView
<<<<<<< HEAD
            followsUserLocation={this.state.followUserLocation}
            region={this.props.mapRegion}
            provider="google"
            style={styles.map}
=======
            // provider="google"
            style={styles.map}
            // initialRegion={this.props.mapRegion}
>>>>>>> fcacac9bbc2e5e0498f2d9dd9d91bf02a8c321f7
            showsUserLocation={this.state.showsUserLocation}
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
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
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
    marginBottom: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 12,
    width: 160,
    marginBottom: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WayPoint);
