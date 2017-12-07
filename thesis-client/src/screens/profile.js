import React, { Component } from 'react';
import { View, Platform, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
// import { STATUS_BAR_HEIGHT } from '../constants';
import ProfileStats from '../components/profile-stats-component';
import ProfileRoutes from '../components/profile-routes-component';
import { getUserSession, getUserTrip } from '../actions/getUser-action';

class ProfileScreen extends Component {
  state = {
    sessions: [],
    routes: [],
  }

  componentWillMount() {
    this.props.getUserTrips();
    this.props.getUserInfo();
  }

  _getSessions = async (id_user) => {
    axios.get
  }

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
           <ScrollView>
             <ProfileRoutes />
           </ScrollView>
         </View>
      </Swiper>
    );
  }
}


// style={styles.container}
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


export default connect(mapDispatchToProps)(ProfileScreen);

