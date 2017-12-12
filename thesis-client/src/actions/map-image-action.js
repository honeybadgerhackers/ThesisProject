import { RETRIEVED_MAP_IMAGE } from '../constants';

export default (image) => {
  return {
    type: RETRIEVED_MAP_IMAGE,
    payload: {
      image,
    },
  };
};

