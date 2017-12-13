import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

const RouteStats = ( {secondCounter, minuteCounter, speed} ) => {
  const minuteDisplay = minuteCounter < 10 ? `0${minuteCounter}` : `${minuteCounter}`;
  const secondDisplay = secondCounter < 10 ? `0${secondCounter}` : `${secondCounter}`;
  return (
    <View style={styles.statBox}>
      <Text style={styles.timeText}>{minuteDisplay}:{secondDisplay}</Text>
      <Text>{speed}</Text>
    </View>
  );
};

RouteStats.propTypes = {
  secondCounter: PropTypes.number.isRequired,
  minuteCounter: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
  statBox: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  timeText: {
    marginTop: 15,
    fontSize: 40,
  },
});

export default RouteStats;
