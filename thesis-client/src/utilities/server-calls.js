import { AsyncStorage } from 'react-native';
import { STORAGE_KEY } from '../constants';
import { SERVER_URI } from '../../config';

export async function dbSecureGET(endpoint, filter) {
  const ACCESS_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
  if (endpoint[0] !== '/') { endpoint = `/${endpoint}`; }
  return fetch(`${SERVER_URI}${endpoint}`, {
    method: 'GET',
    headers: {
      'Authorization': `BEARER ${ACCESS_TOKEN}`,
      filter,
    },
  });
}

export async function dbSecurePOST(endpoint, data) {
  const ACCESS_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
  if (endpoint[0] !== '/') { endpoint = `/${endpoint}`; }
  return fetch(`${SERVER_URI}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `BEARER ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data),
  });
}

export async function dbPOST(endpoint, data) {
  if (endpoint[0] !== '/') { endpoint = `/${endpoint}`; }
  const responseData = await fetch(`${SERVER_URI}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data),
  });
  const parsed = await responseData.json();
  return parsed;
}
