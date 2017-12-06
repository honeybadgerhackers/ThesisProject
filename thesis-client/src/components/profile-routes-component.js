import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import mapIcon from '../assets/mapIcon.png'; 

const ProfileRoutes = () => {  
  // const goToMap = () => {
  //   navigate('Map');
  // };

 const routes = [
  { "route_name":"Multi-tiered multimedia workforce","type":"leisure","id_user_account":1,"current_rating":3.2,"favorite_count":500},
  { "route_name":"Customer-focused zero administration adapter","type":"commute","id_user_account":2,"current_rating":1.2,"favorite_count":388},
  { "route_name":"Persevering directional interface","type":"commute","id_user_account":3,"current_rating":3.7,"favorite_count":94},
  { "route_name":"Mandatory stable model","type":"commute","id_user_account":4,"current_rating":2.3,"favorite_count":104},
  { "route_name":"Mandatory system-worthy synergy","type":"leisure","id_user_account":5,"current_rating":3.6,"favorite_count":240},
  { "route_name":"Right-sized 6th generation collaboration","type":"leisure","id_user_account":6,"current_rating":4.5,"favorite_count":132},
  { "route_name":"Quality-focused asynchronous installation","type":"commute","id_user_account":7,"current_rating":2.3,"favorite_count":409},
  { "route_name":"Assimilated high-level throughput","type":"commute","id_user_account":8,"current_rating":1.4,"favorite_count":69},
  { "route_name":"Customizable regional customer loyalty","type":"commute","id_user_account":9,"current_rating":2.5,"favorite_count":72},
  { "route_name":"User-friendly zero administration info-mediaries","type":"leisure","id_user_account":10,"current_rating":1.2,"favorite_count":34},
  { "route_name":"Diverse incremental emulation","type":"commute","id_user_account":11,"current_rating":4.3,"favorite_count":231},
  { "route_name":"Reactive logistical data-warehouse","type":"leisure","id_user_account":12,"current_rating":3.1,"favorite_count":375},
  { "route_name":"Centralized client-server conglomeration","type":"commute","id_user_account":13,"current_rating":2.7,"favorite_count":213}]
const createTrip = () => routes.map(trip => (
  // <TouchableOpacity
  //   key={trip.id_user_account}
  //   // onPress={() => showTripLocation(trip, goToMap)}
  // >

  <View style={styles.container} key={trip.id_user_account}>
    <View style={{width: 325, height: 100, borderWidth: 2, borderRadius: 6}}>
      <Text>{trip.route_name}</Text>
      <Text>Current Rating: {trip.current_rating}</Text>
      <Text>12345 N.Starting Address</Text>
      <Text>Favorites: {trip.favorite_count}</Text>
      <Text>{trip.type}</Text>
      
      <TouchableOpacity
      onPress={() => showTripLocation(trip, goToMap)}
      >
      <Image source={mapIcon}/>
      </TouchableOpacity>
    </View>
  </View>
    //   <View style={styles.imageContainer}>
    //   </View>
  // </TouchableOpacity>
    // <Text
    // key={trip.id_user_account}
    // >
    //   hello
    // </Text>
));

return <View>{createTrip()}</View>;  
};

const styles = StyleSheet.create({
container: {
  marginTop: 50,
flex: 1,
alignItems: 'flex-end',
justifyContent: 'flex-end',
// backgroundColor: 'grey',
height: 60,
// borderWidth: 2,
flexDirection: 'column',
// justifyContent: 'space-between',
alignItems: 'center',
},
textContainer: {
flex: 3,
backgroundColor: 'grey',
height: 148
},
title: {
fontSize: 20,
fontWeight: 'bold',
color: 'black',
textAlign: 'center',
marginTop: 30
},
subtitle: {
marginTop: 10,
fontSize: 15,
color: 'white',
textAlign: 'center'
},
imageContainer: {
flex: 1,
backgroundColor: 'grey',
height: 148,
width: 50
},
imageContainerText: {
textAlign: 'center',
fontSize: 15,
fontWeight: 'bold',
color: 'white',
marginTop: 30
},
imageStyle: {
alignSelf: 'center',
marginTop: 5,
height: 75,
width: 75
},
favoriteCount: {
marginTop: 2,
fontSize: 10,
color: 'white',
textAlign: 'center',
fontWeight: 'bold'
},
startingAddress: {
marginTop: 10,
fontSize: 15,
color: 'white',
textAlign: 'center'
}
});

export default ProfileRoutes;
