import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { appColors, appColorsTransparency } from '../constants';

export default class UserStats extends Component {
  state = {};
  render() {
    const { background } = this.props;
    return (
      <ImageBackground
        style={styles.imageBackground}
        source={background ? {uri: background} : require('../assets/images/default_photo.jpg')}
      >
        <Text style={styles.text}>Photos</Text>
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
    backgroundColor: appColorsTransparency(0.3).navyBlue,
    fontWeight: "bold",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: appColors.midLightBlue,
    borderRadius: 2,
  },
});
