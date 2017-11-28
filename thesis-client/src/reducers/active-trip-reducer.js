export default function (state = null, action) {
  switch (action.type) {
    case 'TRIP_SELECTED':
      return action.payload;
  }
  return state;
}
