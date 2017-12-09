import { AuthSession } from 'expo';
import axios from 'axios';
import { FB_APP_ID, facebookAuthUri } from '../../config';

const axiosGet = (url) => (
  axios.get(url)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log('error', err);
      throw new Error(err);
      // const test = err.response.data
      // throw new Error('UnauthorizedError: No authorization token was found');
      // throw new Error('Request could not complete');
    })
);

export const getRedirectUrl = AuthSession.getRedirectUrl();

export const facebookAuth = (redirectUrl) => (
  AuthSession.startAsync({
    authUrl: facebookAuthUri(FB_APP_ID, encodeURIComponent(redirectUrl)),
  })
);

export const googleDirectionsCall = async (url) => (
  axiosGet(url)
);
