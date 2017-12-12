import { GET_TRIPS } from '../constants';

export default ({latitude, longitude}, distance = 0.07) => {
  return ({
    type: GET_TRIPS,
    payload: {
      lat: latitude,
      lng: longitude,
      distance,
    },
  });
};
