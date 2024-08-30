import AsyncStorage from "@react-native-async-storage/async-storage";



export const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        const accessToken  = token;
        return accessToken;
      }
      return null;
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  };