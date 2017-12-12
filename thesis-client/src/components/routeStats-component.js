import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import PropTypes from "prop-types";
import { MapView } from "expo";


const RouteStats = ( {secondCounter, minuteCounter} ) => {
  return (
    <View style={styles.statBox}>
      <Text style={styles.timeText}>{minuteCounter}:{secondCounter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statBox: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: "rgba(255,255,255,0.7)"
  },
  timeText: {
    marginTop: 15,
    fontSize: 40,
  },
});

export default RouteStats;
