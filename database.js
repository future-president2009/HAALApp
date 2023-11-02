import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving data", e);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.error("Error reading data", e);
  }
};

export const countMoodFrequencies = (entries) => {
    const frequencies = {};
    entries.forEach((entry) => {
      const mood = entry.mood;
      frequencies[mood] = frequencies[mood] + 1 || 1;
    });
    return frequencies;
  };
  