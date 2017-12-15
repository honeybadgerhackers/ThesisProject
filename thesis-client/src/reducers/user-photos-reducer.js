export default (state = {userPhotos: []}, action) => {
  switch (action.type) {
    case 'GET_USER_PHOTOS_SUCCESS':
      return {userPhotos: action.payload};
    default:
      return state;
  }
};
