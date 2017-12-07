export default function (state = { coordsArray: [] }, action) {
  switch (action.type) {
    case 'UPDATE_ROUTE_COORDS':
      return { coordsArray: action.payload };
    default:
      return state;
  }
}
