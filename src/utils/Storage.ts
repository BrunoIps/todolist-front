import AsyncStorage from '@react-native-async-storage/async-storage';

type ItemName = 'token' | 'id';

export const setItem = async (name: ItemName, value: string) => {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (error) {
    console.log(error);
  }
};

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value;
  } catch (error) {
    console.log(error);
  }
};
