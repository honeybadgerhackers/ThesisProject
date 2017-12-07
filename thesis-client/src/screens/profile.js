import React, { Component } from 'react';
import { View, Platform, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
// import { STATUS_BAR_HEIGHT } from '../constants';
import ProfileStats from '../components/profile-stats-component';
import ProfileRoutes from '../components/profile-routes-component';

class ProfileScreen extends Component {
  state = {
    sessions: [],
    routes: [],
  }

  componentWillMount() {
    this._getUserSessions();
    this._getUserTrips();
  }

  _getUserSessions = async (idUser) => {
    axios({
      method: 'get',
      url: `${SERVER_URI}/session`,
      headers: {filter: idUser}
    })
      .then((response) => {
        this.setState({sessions: response});
      })
  }

  _getUserTrips = async (idUser) => {
    axios({
      method: 'get',
      url: `${SERVER_URI}/route`,
      headers: {filter: idUser}
    })
      .then((response) => {
        this.setState({routes: response})
      })
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

