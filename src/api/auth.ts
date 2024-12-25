import axios from "./axiosClient";
import { BaseUrl } from "@src/utils/Base_url";

export const login = async (payload: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/auth/login`, payload);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const sendResetPasswordCode = async (payload: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/auth/forgot-password`, payload);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const resetPassword = async (payload: any) => {
  try {
    const response = await axios.patch(`${BaseUrl}/auth/change-password`, payload);
    return response;
  } catch (error: any) {
    throw error;
  }
};
