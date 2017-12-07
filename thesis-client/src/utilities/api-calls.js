import { AuthSession } from 'expo';
import { FB_APP_ID, facebookAuthUri } from '../../config';

export const getRedirectUrl = AuthSession.getRedirectUrl();

export const facebookAuth = (redirectUrl) => (
  AuthSession.startAsync({
    authUrl: facebookAuthUri(FB_APP_ID, encodeURIComponent(redirectUrl)),
  })
);
