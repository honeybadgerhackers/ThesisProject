import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image } from 'react-native';
import { appColors } from "../constants"


const ProfileStats = ({ sessions }) => {

  const total = sessions.reduce((prev, current, i, a) => {
    prev.total_time = (prev.total_time || 0) + current.time;
    prev.total_distance = (prev.total_distance || 0) + current.distance;
    prev.total_calories = (prev.total_calories || 0) + current.distance * 40;
    if (i === a.length - 1) {
      prev.total_sessions = a.length;
      prev.average_time = prev.total_time / a.length;
      prev.average_distance = prev.total_distance / a.length;
      prev.average_calories = prev.total_calories / a.length;
    }
    return prev;
  }, {});

  return  (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTextLeft}>Total</Text>
        <Text style={styles.headerTextRight}>Average</Text>
      </View>
      <View style={styles.allStatsContainer}>
        <View style={styles.statsContainer}>
          <Text style={styles.textBox}>
            {total.total_distance || 0}
          </Text>
          <View style={styles.profilePicWrap}>
            <Image 
              style={styles.profilePic} 
              source={require("../assets/stats-icons/totaldistance.png")} 
            />
          </View>
          <Text style={styles.textBox}>
            {total.average_distance || 0}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.textBox}>
            {total.total_calories || 0}
          </Text>
          <View style={styles.profilePicWrap}>
            <Image
              style={styles.profilePic} 
              source={require("../assets/stats-icons/totalcalories.png")} 
            />
          </View>
          <Text style={styles.textBox}>
            {total.average_calories || 0}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.textBox}>
            {total.total_time || 0}
          </Text>
          <View style={styles.profilePicWrap}>
            <Image 
              style={styles.profilePic} 
              source={require("../assets/stats-icons/totaltime.png")} 
            />
          </View>
          <Text style={styles.textBox}>
            {total.average_time || 0}
          </Text>
        </View>
      </View>
    </View>
    // <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
    //   <View style={styles.title}>
    //     <Text style={styles.textBox}>
    //       Total Distance: {total.total_distance || 0}
    //     </Text>
    //   </View>
    //   <View style={styles.title}>
    //     <Text style={styles.textBox}>
    //     Total Time: {total.total_time || 0}
    //     </Text>
    //   </View>
    //   <View style={styles.title}>
    //     <Text style={styles.textBox}>
    //     Total calories: {total.total_calories || 0}
    //     </Text>
    //   </View>
    //   <View style={styles.title}>
    //     <Text style={styles.textBox}>
    //     Average Distance: {total.average_distance || 0}
    //     </Text>
    //   </View>
    //   <View style={styles.title}>
    //     <Text style={styles.textBox}>
    //     Average Time: {total.average_time || 0}
    //     </Text>
    //   </View>
    //   <View style={styles.title}>
    //     <Text style={styles.textBox}>
    //     Average Calories: {total.average_calories || 0}
    //     </Text>
    //   </View>
    // </View>
  );
};

 const styles = StyleSheet.create({
   profilePicWrap: {
     width: 110,
     height: 110,
     borderRadius: 50,
     borderColor: "rgba(0,0,0,0.4)",
     borderWidth: 16
   },
   profilePic: {
     flex: 1,
     width: null,
     alignSelf: "stretch",
     borderRadius: 35,
     borderColor: "#fff",
     borderWidth: 4
   },
   allStatsContainer: {
     flex: 9,
     alignItems: "stretch",
     justifyContent: "center"
   },
   header: {
     flex: 1,
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "space-between",
     borderBottomWidth: StyleSheet.hairlineWidth,
     borderBottomColor: "white",
   },
   headerTextLeft: {
     marginLeft: 30,
     fontSize: 35,
     fontWeight: "bold",
     color: "white"
   },
   headerTextRight: {
     marginRight: 10,
     fontSize: 35,
     fontWeight: "bold",
     color: "white"
   },
   mainContainer: {
     flex: 1,
     backgroundColor: appColors.navyBlue
   },
   statsContainer: {
     flex: 1,
     flexDirection: 'row',
     borderColor: "white",
     //  borderWidth: 2,
     alignItems: "center",
     justifyContent: "space-around",
     borderBottomWidth: StyleSheet.hairlineWidth,
     borderBottomColor: "white"
   },
   textBox: {
     fontSize: 16,
     fontWeight: "bold",
     color: "white",
   }
 });

ProfileStats.propTypes = {
  //eslint-disable-next-line
  sessions: PropTypes.array.isRequired,
};

export default ProfileStats;
