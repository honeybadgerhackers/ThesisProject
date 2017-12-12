export default function (state = 
  { 
    latitude: 0, 
    longitude: 0, 
    latitudeDelta: 0.05, 
    longitudeDelta: 0.05 
  }, action) {
  switch (action.type) {
    case "UPDATE_MAP_REGION":
      return action.payload;
    case "CLEAR_ACTIVE_TRIP":
      return {...state};
    default:
      return state;
  }
}
