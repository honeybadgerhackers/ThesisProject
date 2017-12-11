import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { MapView } from 'expo';


class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showsUserLocation: true,
      followUserLocation: true,
      buttonStartStop: false,
      // coords: [
      //   {latitude: 29.939993, longitude: -90.074832},
      //   {latitude: 29.942806, longitude: -90.072644},
      //   {latitude: 29.943273, longitude: -90.071143},
      //   {latitude: 29.945508, longitude: -90.070486},
      // ],
    };
  }
  
  componentWillMount() {
  }
  
  goToHomeScreen() {
    this.props.clearActiveTrip();
    this.props.navigate('Home');
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider="google"
          style={styles.map}
          region={this.props.mapRegion}
          showsUserLocation={this.state.showsUserLocation}
          followsUserLocation={this.state.followUserLocation}
        >
          {this.props.activeTrip.coords != undefined && <MapView.Polyline
            coordinates={this.props.activeTrip.coords}
            strokeWidth={10}
            strokeColor="red"
          /> }

        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.setState({
                buttonStartStop: !this.state.buttonStartStop,
              })
            }
          >
            <Text>{this.state.buttonStartStop ? "End" : "Start"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.goToHomeScreen()
            }
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Map.propTypes = {
  activeTrip: PropTypes.shape({}).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
    marginBottom: 5,
  },
  statBar: {
    backgroundColor: 'black',
  },
});

export default Map;
