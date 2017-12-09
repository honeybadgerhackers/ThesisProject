import { GET_USER_TRIPS, GET_USER_SESSIONS } from '../constants';

export const getUserRoutes = (userId) => ({
    type: GET_USER_TRIPS,
    payload: {
        userId,
    },
});

export const getUserSessions = (userId) => ({
   type: GET_USER_SESSIONS,
   payload: {
       userId,
   },
});
