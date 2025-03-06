import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'notification_settings';


export const getNotificationSettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading notification settings:', error);
    return null;
  }
};

export const saveNotificationSettings = async (settings) => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving notification settings:', error);
  }
};
