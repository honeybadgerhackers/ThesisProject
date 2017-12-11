import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import PropTypes from "prop-types";
import { MapView } from "expo";

var { width, height } = Dimensions.get("window");

const RouteStats = () => (
  <View style={[styles.overlay, { height: 360}]}>
    <Text>Stats</Text>
  </View>
);

RouteStats.propTypes = {
};

var styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "black",
    width,
  }
});

export default RouteStats;
