import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Swiper from "react-native-swiper";
import { getUserRoutes, getUserSessions } from "../actions/getUserInfo-action";
import { getActiveTrip } from "../actions/activeTrip-action";
import UserInfo from "../components/profile-user-component";
import UserStats from "../components/profile-stats2-component";
import UserPhotos from "../components/profile-photos-components";
import UserRoutes from "../components/profile-routes-components";

class ProfileScreen2 extends Component {
  state = {

  }
  render() {
    return (
      <View style={styles.container}>
        <UserInfo />
        <TouchableOpacity style={styles.allContainers}>
          <UserPhotos />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Stats', {name: 'Lucy'})}
          style={styles.allContainers}
        >
          <UserStats />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.allContainers}
          onPress={() => this.props.navigation.navigate('Routes', {name: 'Lucy'})}
        >
          <UserRoutes />
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    routes: state.userRoutes.routes,
    sessions: state.userSessions.sessions,
  };
}

const mapDispatchToProps = dispatch => ({
  showTripLocation: (trip, cb) => {
    dispatch(getActiveTrip(trip, cb));
  },
  getUserSessions: (userId) => {
    dispatch(getUserSessions(userId));
  },
  getUserRoutes: (userId) => {
    dispatch(getUserRoutes(userId));
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray"
  },
  allContainers: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen2);
