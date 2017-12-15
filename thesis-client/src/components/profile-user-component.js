import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { appColors, appColorsTransparency } from '../constants';

const ProfileUser = ({ user: { first_name, last_name, picture } }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.profilePicWrap}>
          <Image
            style={styles.profilePic} 
            source={picture ? { uri: picture } : require('../assets/images/default_user.png')}
          />
        </View>
        <Text style={styles.name}>{first_name} {last_name}</Text>
      </View>
    </View>
  );
};

ProfileUser.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    picture: PropTypes.string,
  }).isRequired,
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 3,
    width: null,
    alignSelf: 'stretch',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: appColorsTransparency(0.6).logoBlue,
  },
  profilePicWrap: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderColor: appColorsTransparency(0.7).navyBlue,
    borderWidth: 16,
  },
  profilePic: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 90,
    borderColor: appColors.aquamarine,
    borderWidth: 4,
  },
  name: {
    marginTop: 20,
    fontSize: 30,
    color: appColors.lightBlue,
    fontWeight: 'bold',
  },

});

export default ProfileUser;
