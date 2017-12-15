import React, { Component } from "react";
import { View, Text, StyleSheet} from "react-native";

export default class UserStats extends Component {
  state = {};
  render() {
    return (
      <View>
        <Text style={styles.text}>Routes</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  }
});
