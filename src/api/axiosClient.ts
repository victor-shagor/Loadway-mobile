import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { InternalAxiosRequestConfig } from "axios";
import { BaseUrl } from "@src/utils/Base_url";

axios.defaults.baseURL = BaseUrl;

axios.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.error("Error fetching token from AsyncStorage", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
