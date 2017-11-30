export default function (state = {}, action) {
  switch (action.type) {
    case 'TRIP_SELECTED':
      return action.payload;
    default:
        return state;
  }
}
