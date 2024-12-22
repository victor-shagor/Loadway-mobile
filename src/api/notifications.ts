import { notifiaction } from "@src/utils/APIRoutes";
import axiosInstance from "./axiosClient";

export const getAllNotifications = async ({ category, page }: any) => {
  const response = await axiosInstance.get(
    `${notifiaction}/mine?category=${category}&page=${page}`
  );
  return response.data.data;
};
