import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ProfileStats = () => stats.map((e, i, a) => (
  <View
  key={e}
  style={styles.title}
  >
    <Text style={styles.textBox}>
      {e}
      {a[e]}
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
