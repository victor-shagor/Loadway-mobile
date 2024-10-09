import { notifiaction } from "@src/utils/APIRoutes";
import axiosInstance from "./axiosClient";

export const getAllNotifications = async ({ category }: any) => {
  const response = await axiosInstance.get(
    `${notifiaction}/mine?category=${category}`
  );
  return response.data.data;
};
