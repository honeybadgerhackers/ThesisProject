export default function (state = { coordsArray: [] }, action) {
  switch (action.type) {
    case 'UPDATE_ROUTE_COORDS':
      return { coordsArray: action.payload };
    // case 'CLEAR_MAP':
    //   return {coordsArray: []};
    default:
      return state;
  }
}
