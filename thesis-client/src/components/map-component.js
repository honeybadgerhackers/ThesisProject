import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { MapView } from 'expo';


class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showsUserLocation: true,
      followsUserLocation: true,
      buttonStartStop: false,
  };
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider='google'
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
    width: 160
  },
  statBar: {
    backgroundColor: 'black',
  }
});

export default Map;
