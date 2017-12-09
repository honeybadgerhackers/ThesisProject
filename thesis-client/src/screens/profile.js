import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { getUserRoutes, getUserSessions } from '../actions/getUserInfo-action';
// import { STATUS_BAR_HEIGHT } from '../constants';
import ProfileStats from '../components/profile-stats-component';
import ProfileRoutes from '../components/profile-routes-component';

class ProfileScreen extends Component {
  // state = {
  //   sessions: [],
  //   routes: [],
  // }

  componentWillMount() {
    // this.props.getUserSessions(7);
    this.props.getUserRoutes(7);
    // this._getUserTrips(5);
  }


  render() {
    console.log(this.props.routes);
    debugger;
    return (
      // <Swiper
      //   style={styles.wrapper}
      //   loop={false}
      // >
        // <View>
        //   <Text style={styles.title}>
        //     Your Stats
        //   </Text>
          /* <View>
            <ProfileStats sessions={this.state.sessions} />
          </View> */
        /* </View> */
        <View>
          <Text style={styles.title}>
            Your Routes
          </Text>
          <ScrollView>
            <ProfileRoutes routes={this.props.routes} />
          </ScrollView>
        </View>
      // </Swiper>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    routes: state.userRoutes.routes,
    // sessions: state.userSessions,
  };  
};

const mapDispatchToProps = dispatch => ({
  // getUserSessions: (userId) => {
  //   dispatch(getUserSessions(userId));
  // },
  getUserRoutes: (userId) => {
    dispatch(getUserRoutes(userId));
  },
});


 const styles = StyleSheet.create({
  wrapper: {
  },
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


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

