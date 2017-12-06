import { AsyncStorage } from 'react-native';

// eslint-disable-next-line
export async function storeItem(item, selectedValue) {
  try {
    await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {
    console.log(`AsyncStorage error: ${error.message}`);
  }
}
