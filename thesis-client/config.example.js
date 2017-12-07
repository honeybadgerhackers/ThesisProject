export const FB_APP_ID = 'YOUR_APP_ID_HERE';
export function facebookAuthUri(appId, redirectUrl) {
  return 'https://www.facebook.com/v2.8/dialog/oauth?' +
    `&client_id=${appId}` +
    `&redirect_uri=${redirectUrl}` +
    '&scope=email,public_profile';
}
export function facebookUri(token) { 
  return `https://graph.facebook.com/me?access_token=${token}&fields=id,name,last_name,first_name,email,picture.type(large)`;
}

export const SERVER_URI = 'YOUR_SERVER_URI_HERE';
