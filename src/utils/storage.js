import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error('Failed to load user from local storage', e);
    return null;
  }
};

export const setUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user to local storage', e);
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e) {
    console.error('Failed to remove user from local storage', e);
  }
};
