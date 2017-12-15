import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, Share } from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { getUserRoutes, getUserSessions } from "../actions/getUserInfo-action";
import { getActiveTrip } from "../actions/activeTrip-action";
import { appColors, appColorsTransparency } from '../constants';
import PhotoModal from "../components/enlargePhotoModal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColorsTransparency(0.8).navyBlue,
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
  back: {
    color: appColors.aquamarine,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  photoWrap: {
    margin: 0,
    height: 120,
    width: (Dimensions.get("window").width / 3),
    borderWidth: 1,
    borderColor: appColorsTransparency(1).navyBlue,
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

  state = {
    visibleModal: 0,
    photo: '',
  };

  componentWillMount() {}
  
  getPhoto = (photo) => {
    this.setState({ photo });
    this.setState({ visibleModal: 1});
  }

  organizePhotos = () => {
    console.log('in function')
    const { userPhotos } = this.props;
    return userPhotos.map((photo, index) => {
      if (photo.photo_url !== "") {
        return (
          <TouchableOpacity
            // eslint-disable-next-line
            key={`photo_${index}`}
            style={styles.photoWrap}
            onPress={() => this.getPhoto(photo.photo_url)}
          >
            <PhotoModal visibleModal={this.state.visibleModal} photo={this.state.photo} closeModal={this.closeModal} share={this.share} />
            <Image style={styles.photo} source={{ uri: photo.photo_url }} />
          </TouchableOpacity>
        );
      }
    });
  };

  share = () => {
    Share.share({
      message: "New Route on BIKE MAP NOLA!",
      title: "Check out this photo",
      url: this.state.photo,
    });
  };

  closeModal = () => {
    this.setState({
      visibleModal: 0,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.photoGrid}>{this.organizePhotos()}</View>
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
