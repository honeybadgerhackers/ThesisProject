import React from "react";
import { Platform, View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { appColors, appColorsTransparency } from '../constants';

const RouteStats = ({secondCounter, minuteCounter, speed}) => {
  const minuteDisplay = minuteCounter < 10 ? `0${minuteCounter}` : `${minuteCounter}`;
  const secondDisplay = secondCounter < 10 ? `0${secondCounter}` : `${secondCounter}`;
  const splitSpeed = speed.toString().split('.');
  const decimals = splitSpeed[1] ? splitSpeed[1].padEnd(2, '00') : '00';
  return (
    <View style={styles.statBox}>
      <View style={styles.info}>
        <Text style={styles.timeText}>{minuteDisplay}:{secondDisplay}</Text>
        <Text style={styles.mph}>Time</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.timeText}>{splitSpeed[0]}.{decimals}</Text>
        <Text style={styles.mph}>MPH</Text>
      </View>
    </View>
  );
};

RouteStats.propTypes = {
  secondCounter: PropTypes.number.isRequired,
  minuteCounter: PropTypes.number.isRequired,
  speed: PropTypes.number,
};

RouteStats.defaultProps = {
  speed: 0,
};

const styles = StyleSheet.create({
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: appColorsTransparency(0.8).navyBlue,
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    marginTop: 15,
    marginBottom: 0,
    fontSize: 40,
    fontFamily: Platform.OS === 'ios' ? 'GurmukhiMN-Bold' : null,
    color: appColors.lightBlue,
  },
  mph: {
    color: appColors.citrine,
    marginTop: -10,
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'GurmukhiMN-Bold' : null,
  },
});

export default RouteStats;
