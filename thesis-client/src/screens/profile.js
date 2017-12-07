import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
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
    this._getUserSessions(5);
    this._getUserTrips(5);
  }

  _getUserSessions = async (idUser) => {
    axios({
      method: 'GET',
      url: `http://18.216.220.101:8091/session`,
      headers: {
        filter: '{"id_user_account": 5}',
      },
    })
      .then((response) => {
        this.setState({sessions: response.data});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  _getUserTrips = async (idUser) => {
    axios({
      method: 'GET',
      url: `http://18.216.220.101:8091/route`,
      headers: {
        filter: '{"id_user_account": 5}',
      },
    })
      .then((response) => {
        this.setState({routes: response.data});
      })
      .catch((err) => {
        console.error(err);
      });
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
            <ProfileStats sessions={this.state.sessions} />
          </View>
        </View>
        <View>
          <Text style={styles.title}>
            Your Routes
          </Text>
          <ScrollView>
            <ProfileRoutes routes={this.state.routes} />
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
    borderWidth: 2,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});


export default connect()(ProfileScreen);

