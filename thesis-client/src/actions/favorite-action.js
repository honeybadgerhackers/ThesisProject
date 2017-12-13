import { POST_FAVORITE, REMOVE_FAVORITE } from '../constants';

export const postFavorite = (userId, routeId) => ({
  type: POST_FAVORITE,
  payload: {
    userId,
    routeId,
  },
});

export const removeFavorite = (userId, routeId) => ({
  type: REMOVE_FAVORITE,
  payload: {
    userId,
    routeId,
  },
});
