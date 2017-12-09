export default function(state = {}, action) {
  switch (action.type) {
    case "TRIP_SELECTED":
      return action.payload;
    case "GET_ACTIVE_TRIP_SUCCESS":
      return action.payload;
    case "CLEAR_ACTIVE_TRIP":
      return {};
    default:
      return state;
  }
}
