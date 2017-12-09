import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import mapIcon from '../assets/mapIcon.png'; 

const ProfileRoutes = ({routes}) => {  
  // const goToMap = () => {
  //   navigate('Map');
  // };
  return routes.map((trip, i) => (
  // <TouchableOpacity
  //   key={trip.id_user_account}
  //   // onPress={() => showTripLocation(trip, goToMap)}
  // >
    <View style={styles.container} key={`trip${i}`}>
      <View style={{
         height: 100, borderWidth: 2, borderRadius: 6,
        }}
      >
        <Text>{trip.route_name}</Text>
        <Text>Current Rating: {trip.current_rating}</Text>
        <Text>12345 N.Starting Address</Text>
        <Text>Favorites: {trip.favorite_count}</Text>
        <Text style={styles.imageContainerText}>{trip.type}</Text>
        {/* <TouchableOpacity
          onPress={() => showTripLocation(trip, goToMap)}
          > */}
          <Image source={mapIcon}/>
        {/* </TouchableOpacity> */}
      </View>
    </View>
));
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
// alignItems: 'center',
}
});

export default ProfileRoutes;
