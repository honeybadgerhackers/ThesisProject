import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { MapView, Location } from 'expo';
import PropTypes from 'prop-types';
import CreateTripModal from './create-trip-modal';
import SaveSessionModal from './save-session-modal';
import Stats from '../components/routeStats-component';
import getDirections from '../actions/getDirections-action';
import { createTrip, createTripSave, cancelCreateTrip } from '../actions/create-trip-action';
import { saveSession, cancelSaveSession } from '../actions/save-session-action';
import { createPolyline } from '../utilities/processors';
import { appColors } from '../constants';
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
    saveSessionDispatch: PropTypes.func.isRequired,
    cancelSessionDispatch: PropTypes.func.isRequired,
    clearActiveTrip: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    activeTrip: PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      route_name: PropTypes.string,
      coords: PropTypes.array,
      distance: PropTypes.number,
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
    speed: null,
    followUserLocation: true,
    showsUserLocation: true,
    wayPoints: juliaToSoniat,
    speedCounter: 1,
    topSpeed: 0,
    avgSpeed: 0,
    visibleModal: 0,
    rating: 0,
    buttonStart: true,
    timer: null,
    secondCounter: 0,
    minuteCounter: 0,
    imageBase64: '',
  };

  componentDidMount = () => {
    this.setState({ followUserLocation: false });
  }

  componentWillUnmount() {
    if (this.track) {
      this.track.remove();
      // this.trackInaccurate.remove();
      this.setState({ followUserLocation: false });
    }
  }
  //* Get Image *//
    getImage = (imageBase64) => {
    this.setState({
      imageBase64,
    });
  }

  //*  Modals  *//

  setRating = (selectedRating) => {
    this.setState({ rating: selectedRating });
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

  // *  Event Handlers  *//

  goToHomeScreen() {
    this.props.clearActiveTrip();
    this.props.navigate("Home");
  }

  _handleSpeedChange = (speedMetersPerSecond) => {
    const { topSpeed, avgSpeed, speedCounter } = this.state;
    const speed = speedMetersPerSecond * 2.2369;
    const currentSpeed = speed < 0 ? 0 : Math.round(speed * 100) / 100;
    this.setState({
      topSpeed: currentSpeed > topSpeed ? currentSpeed : topSpeed,
      avgSpeed: Math.round(((avgSpeed * (speedCounter - 1) + currentSpeed) / speedCounter) * 100) / 100,
      speedCounter: speedCounter + 1,
      speed: currentSpeed,
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
      // wayPoints,
    });
    // console.log(this.state.wayPoints);
  };

  _trackLocationAsync = async () => {
    this.setState({
      buttonStart: !this.state.buttonStart,
      followUserLocation: true,
    });
    this.track = await Location.watchPositionAsync(
      { distanceInterval: 5, timeInterval: 3000, enableHighAccuracy: true },
      this._handlePositionChange,
    );
    // this.trackHeading = await Location.watchHeadingAsync((heading) => {
    //   console.log(heading);
    // });
  };

  //*  Custom Trips  *//

  customTripStartOrEnd = () => {
      if (this.state.buttonStart) {
        this._trackLocationAsync();
        this.startTimer();
      } else {
      this._stopTrackLocation();
    }
  };

  _processTrip = () => {
    const tripWayPoints = this.state.wayPoints.slice().map(wayPoint => [wayPoint.lat, wayPoint.lng]);
    const origin = tripWayPoints.splice(0, 1).join(',');
    const destination = tripWayPoints.splice(tripWayPoints.length - 1, 1).join(',');
    const joinedWayPoints = createPolyline(tripWayPoints);

    this.props.createTripDispatch(origin, destination, joinedWayPoints, this.props.userId);
  }

  _stopTrackLocation = () => {
    if (this.track) {
      this.track.remove();
      this.setState({
        buttonStart: !this.state.buttonStart,
        followUserLocation: false,
      });
    }
    clearInterval(this.state.timer);
    if (this.state.wayPoints.length > 1) { this._processTrip(); } else { Alert.alert('Cancelled'); }
    this.setState({
      visibleModal: 1,
    });
  };

  //*  Sessions  *//

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

  sessionStartOrEnd = () => {
      if (this.state.buttonStart) {
        this._trackLocationAsync();
        this.startTimer();
      } else {
      this._stopSessionTrackLocation();
    }
  };

  _stopSessionTrackLocation = () => {
    if (this.track) {
      this.track.remove();
      this.setState({
        buttonStart: !this.state.buttonStart,
        followUserLocation: false,
      });
    }
    const tripWayPoints = this.state.wayPoints.slice().map(wayPoint => [wayPoint.lat, wayPoint.lng]);
    const origin = tripWayPoints.splice(0, 1).join(',');
    const destination = tripWayPoints.splice(tripWayPoints.length - 1, 1).join(',');
    const joinedWayPoints = createPolyline(tripWayPoints);
    clearInterval(this.state.timer);
    this.setState({
      visibleModal: 1,
      joinedWayPoints,
      origin,
      destination,
    });
  };

  //*  Stats  *//

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
  render() {
    const {secondCounter, minuteCounter} = this.state;
    if (this.props.activeTrip.route_name === undefined) {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            ref={ref => { this.map = ref; }}
            // initialRegion={this.props.mapRegion}
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
          <Stats speed={this.state.speed} style={styles.statBar} secondCounter={secondCounter} minuteCounter={minuteCounter} />
          <CreateTripModal
            visibleModal={this.state.visibleModal}
            saveTrip={this.props.saveTripDispatch}
            cancelTrip={this.props.cancelTripDispatch}
            googleMapImage={this.props.mapImage}
            tripData={this.props.newTripData}
            speedCounter={this.state.speedCounter}
            avgSpeed={this.state.avgSpeed}
            rating={this.state.rating}
            closeModal={this.closeModal}
            openRatingModal={this.openRatingModal}
            setRating={this.setRating}
            starIcons={starIcons}
            getImage={this.getImage}
            imageBase64={this.state.imageBase64}
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
      const {
        activeTrip: {
          id,
          route_name,
          type,
          distance,
        },
        userId,
      } = this.props;
      const {
        origin,
        destination,
        joinedWayPoints,
      } = this.state;
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={this.props.mapRegion}
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
          <Stats style={styles.statBar} speed={this.state.speed} secondCounter={secondCounter} minuteCounter={minuteCounter} />
          <SaveSessionModal
            visibleModal={this.state.visibleModal}
            saveSession={this.props.saveSessionDispatch}
            cancelSaveSession={this.props.cancelSessionDispatch}
            tripName={this.props.routeTitle}
            tripData={{
              id,
              route_name,
              type,
              userId,
            }}
            speedCounter={this.state.speedCounter}
            avgSpeed={this.state.avgSpeed}
            time={this.state.minuteCounter + (this.state.secondCounter / 100)}
            origin={origin}
            destination={destination}
            wayPoints={joinedWayPoints}
            rating={this.state.rating}
            closeModal={this.closeModal}
            openRatingModal={this.openRatingModal}
            setRating={this.setRating}
            starIcons={starIcons}
            getImage={this.getImage}
            imageBase64={this.state.imageBase64}
          />
          <View style={styles.cancelButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.sessionStartOrEnd()
              }
            >
              <Text>{this.state.buttonStart ? "Start" : "End"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              disabled={!this.state.buttonStart}
              onPress={() => this.goToHomeScreen()
              }
            >
              <Text style={this.state.buttonStart ? null : styles.buttonDisabled}>Cancel</Text>
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
  cancelSessionDispatch: () => {
    dispatch(cancelSaveSession());
  },
  saveSessionDispatch: (tripStats, tripData) => {
    dispatch(saveSession(tripStats, tripData));
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
  buttonDisabled: {
    color: appColors.logoBlue,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WayPoint);
