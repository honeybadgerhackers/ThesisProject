import React, { Component } from 'react';
import { View, Platform, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
// import { STATUS_BAR_HEIGHT } from '../constants';
import ProfileStats from '../components/profile-stats-component';

class ProfileScreen extends Component {

  render() {
    return (
      <Swiper
      style={styles.wrapper}
      loop={false}
      >
        <View>
          <Text style={styles.title}>
            Your Stats
          </Text>
          <View style={styles.container}>
            <ProfileStats />
          </View>
        </View>
        <View>
          <Text style={styles.title}>
            Your Routes
          </Text>
        </View>
      </Swiper>
    );
  }

}

// style={styles.homeStatsScreenView}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: 'lightblue',
    borderWidth: 2
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});


export default connect()(ProfileScreen);
