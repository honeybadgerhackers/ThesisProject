export default function (state = {}, action) {
  switch (action.type) {
    case 'GET_USER_LOCATION_FAILED':
      return action.payload;
    case 'GET_USER_LOCATION_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}
