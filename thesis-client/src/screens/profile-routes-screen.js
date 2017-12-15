import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getUserRoutes, getUserSessions } from "../actions/getUserInfo-action";
import { getActiveTrip } from "../actions/activeTrip-action";
// import { STATUS_BAR_HEIGHT } from '../constants';
import ProfileRoutes from "../components/profile-routes-component";

class ProfileRoutesScreen extends Component {
  static propTypes = {
    showTripLocation: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    getUserRoutes: PropTypes.func.isRequired,
    //eslint-disable-next-line
    user: PropTypes.object.isRequired,
    // eslint-disable-next-line
    sessions: PropTypes.array.isRequired,
    // eslint-disable-next-line
    routes: PropTypes.array.isRequired
  };

  static navigationOptions = {
    title: "Routes",
  };

  componentWillMount() {
    this.props.getUserRoutes(this.props.user.id);
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>Your Routes</Text>
        <ScrollView>
          <ProfileRoutes
            routes={this.props.routes}
            navigate={this.props.navigation.navigate}
            showTripLocation={this.props.showTripLocation}
          />
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    routes: state.userRoutes.routes,
    sessions: state.userSessions.sessions
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

const styles = StyleSheet.create({
  wrapper: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: 10,
    backgroundColor: "lightblue",
    borderWidth: 2
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileRoutesScreen);
