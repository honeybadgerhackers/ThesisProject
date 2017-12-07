import { AsyncStorage } from 'react-native';

export async function storeItem(item, selectedValue) {
  try {
    await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {
    console.log(`AsyncStorage error: ${error.message}`);
  }
}

export async function getItem(item) {
  try {
    return await AsyncStorage.getItem(item);
  } catch (error) {
    console.log(`AsyncStorage error: ${error.message}`);
  }
}
