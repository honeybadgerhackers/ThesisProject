import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Swiper from "react-native-swiper";
import { getUserRoutes, getUserSessions } from "../actions/getUserInfo-action";
import { getActiveTrip } from "../actions/activeTrip-action";
import UserInfo from "../components/profile-user-component";
import UserStats from "../components/profile-stats-link";
import UserPhotos from "../components/profile-photos-link";
import UserRoutes from "../components/profile-routes-link";
import { appColors } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.navyBlue,
  },
  header: {
    height: 38,
    backgroundColor: appColors.navyBlue,
  },
  headerText: {
    paddingBottom: 6,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: appColors.midLightBlue,
  },
  allContainers: {
    flex: 1,
    alignSelf: "stretch",
  },
});

class ProfileScreen2 extends Component {
  static navigationOptions = {
    title: "Profile",
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
  };
  render() {
    const {userPhotos, user} = this.props;
    const backgroundPhoto = userPhotos.filter(({photo_url}) => photo_url !== '');
    return (
      <View style={styles.container}>
        <UserInfo 
          user={user}
        />
        <TouchableOpacity 
          style={styles.allContainers}
          onPress={() => this.props.navigation.navigate('Photos', {name: 'Lucy'})}
        >
          <UserPhotos background={backgroundPhoto[0] ? backgroundPhoto[0].photo_url : null} />
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
    userPhotos: state.userPhotos.userPhotos,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen2);
