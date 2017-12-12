import { POST_FAVORITE } from '../constants';

export default (userId, routeId) => ({
  type: POST_FAVORITE,
  payload: {
    userId,
    routeId,
  },
});

