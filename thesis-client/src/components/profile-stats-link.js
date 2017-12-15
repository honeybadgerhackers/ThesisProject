import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { appColors, appColorsTransparency } from '../constants';

export default class UserStats extends Component {
  state = {

  }
  render() {
    return (
      <ImageBackground
        style={styles.imageBackground}
        source={require('../assets/images/stats.jpg')}
      >
        <Text style={styles.text}>Stats</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 104,
  },
  text: {
    paddingTop: 36,
    paddingLeft: 20,
    paddingBottom: 36,
    fontSize: 30,
    color: "#fff",
    backgroundColor: appColorsTransparency(0.4).navyBlue,
    fontWeight: "bold",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: appColors.midLightBlue,
    borderRadius: 2,
  },
});
