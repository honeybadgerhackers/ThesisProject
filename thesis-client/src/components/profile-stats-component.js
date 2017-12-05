import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const stats = {
speed: 56,
distance: 543,
calories: 2455,
total_time: 1231234,
};

const ProfileStats = () => Object.keys(stats).map(e => (
  <View
  key={e}
  style={styles.title}
  >
       <Text style={styles.textBox}>
         {e}
         {stats[e]}
       </Text>
   </View>
));
    
const styles = StyleSheet.create({
  title: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 50,
    borderWidth: 2
    
  },
  textBox: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  }
});

export default ProfileStats;
