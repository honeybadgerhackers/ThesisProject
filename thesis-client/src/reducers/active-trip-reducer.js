export default function (state = 
  {
  location: {       
      latitude: 37.78825,
      longitude: -122.4324, 
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
  } 
}
, action) {
  switch (action.type) {
    case 'TRIP_SELECTED':
      return action.payload;
  }
  return state;
}
