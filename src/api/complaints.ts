import axiosInstance from "./axiosClient";
import { getComplaints } from "@src/utils/APIRoutes";
import { ComplaintAPIProps } from "@src/models/messaging";

export const getAllComplaints = async (search?: string) => {
  try {
    const response = await axiosInstance.get<{ data: ComplaintAPIProps }>(
      `${getComplaints}?search=${search}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createComplaints = async (data: any) => {
  try {
    const response = await axiosInstance.post(`${getComplaints}`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
