import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileStats = ({sessions}) => {

  const total = sessions.reduce((prev, current, i, a) => {
    prev.total_time = (prev.total_time || 0) + current.time;
    prev.total_distance = (prev.total_distance || 0) + current.distance;
    prev.total_calories = (prev.total_calories || 0) + current.calories;
    if (i === a.length - 1) {
      prev.total_sessions = a.length;
      prev.average_time = prev.total_time / a.length;
      prev.average_distance = prev.total_distance / a.length;
      prev.average_calories = prev.total_calories / a.length;
    }
    return prev;
  }, {});

  return  (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
      <View style={styles.title}>
        <Text style={styles.textBox}>
          Total Distance: {total.total_distance}
        </Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.textBox}>
        Total Time: {total.total_time || 0}
        </Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.textBox}>
        Total calories: {total.total_calories || 0}
        </Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.textBox}>
        Average Distance: {total.average_distance || 0}
        </Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.textBox}>
        Average Time: {total.average_time || 0}
        </Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.textBox}>
        Average Calories: {total.average_calories || 0}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    width: 125,
    height: 125,
    backgroundColor: 'lightblue',
    borderRadius: 50,
    borderWidth: 2,
    // flex: 1,
    flexDirection: 'row',
  },
  textBox: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default ProfileStats;
