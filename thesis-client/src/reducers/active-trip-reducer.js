export default function(state = {}, action) {
  switch (action.type) {
    case 'TRIP_SELECTED':
      return action.payload;
    case 'GET_ACTIVE_TRIP_SUCCESS':
      return {...state};
    default:
        return state;
  }
}
