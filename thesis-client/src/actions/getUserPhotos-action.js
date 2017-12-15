export default (userId) => {
  return {
    type: "GET_USER_PHOTOS",
    payload: userId,
  };
};
