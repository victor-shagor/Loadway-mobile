import { notifiaction } from "@src/utils/APIRoutes";
import axiosInstance from "./axiosClient";

export const getAllNotifications = async ({ category, page, limit }: any) => {
  try {
    const response = await axiosInstance.get(
      `${notifiaction}/mine?category=${category}&page=${page}&limit=${limit}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateNotifications = async (id: any) => {
  try {
    const response = await axiosInstance.put(`${notifiaction}/update/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
