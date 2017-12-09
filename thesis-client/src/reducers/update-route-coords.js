import { UPDATE_ROUTE_COORDS } from '../constants';

export default (state = { coordsArray: [] }, action) => {
  switch (action.type) {
    case UPDATE_ROUTE_COORDS:
      return { coordsArray: action.payload };
    default:
      return state;
  }
}
