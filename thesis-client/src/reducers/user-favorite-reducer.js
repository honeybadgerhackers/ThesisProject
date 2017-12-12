import { GET_USER_FAVORITES_SUCCESS, GET_USER_FAVORITES } from '../constants';

export default (state = {favorites: []}, action) => {
    switch (action.type) {
      case GET_USER_FAVORITES:
        return state;
      case GET_USER_FAVORITES_SUCCESS:
        return {favorites: action.payload};
      default:
        return state;
    }
};
