import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import { connect } from "react-redux";
import { getUserRoutes, getUserSessions } from "../actions/getUserInfo-action";
import { getActiveTrip } from "../actions/activeTrip-action";
import { appColors } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 38,
    // padding: 10,
    // paddingTop: 25,
    backgroundColor: appColors.navyBlue,
  },
  headerText: {
    paddingBottom: 6,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: appColors.midLightBlue,
  },
  back: {
    color: appColors.aquamarine,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  photoWrap: {
    margin: 2,
    height: 120,
    width: (Dimensions.get("window").width / 2) - 4,
  },
  photo: {
    flex: 1,
    width: null,
    alignSelf: "stretch",
  },
});

class ProfilePhotosScreen extends Component {
  static navigationOptions = {
    title: "Photos",
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerBackTitleStyle: styles.back,
  };

  componentWillMount() {
  }

  organizePhotos = () => {
    const { userPhotos } = this.props;
    return userPhotos.map((photo, index) => {

      if (photo.photo_url !== '') {
        return (
          <View
          // eslint-disable-next-line
            key={`photo_${index}`}
            style={styles.photoWrap}
          >
            <Image
              style={styles.photo}
              source={{uri: photo.photo_url}}
            />
          </View>
        );
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.photoGrid}>
            {this.organizePhotos()}     
          </View>     
        </ScrollView>
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
  getUserSessions: userId => {
    dispatch(getUserSessions(userId));
  },
  getUserRoutes: userId => {
    dispatch(getUserRoutes(userId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePhotosScreen);
