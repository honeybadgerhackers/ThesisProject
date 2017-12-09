export const getUserRoutes = (userId) => ({
    type: 'GET_USER_TRIPS',
    payload: {
        userId,
    },
});

export const getUserSessions = (userId) => ({
   type: 'GET_USER_SESSIONS',
   payload: {
       userId,
   },
});
