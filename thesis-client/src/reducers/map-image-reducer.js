import { RETRIEVED_MAP_IMAGE, CREATE_TRIP_CANCELLED } from '../constants';

export default (state = { image: null }, { payload, type }) => {
  switch (type) {
    case '@@redux/INIT':
      return { ...state };
    case RETRIEVED_MAP_IMAGE:
      return {
        ...state,
        image: payload,
       };
    case CREATE_TRIP_CANCELLED:
      return {
        ...state,
        image: null,
      };
    default:
      return { ...state };
  }
};
