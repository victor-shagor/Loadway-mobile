import axiosInstance from "./axiosClient";
import { getComplaints } from "@src/utils/APIRoutes";
import { ComplaintAPIProps } from "@src/models/messaging";

export const getAllComplaints = async () => {
  const response = await axiosInstance.get<{ data: ComplaintAPIProps }>(
    `${getComplaints}`
  );
  return response.data.data;
};

export const createComplaints = async (data: any) => {
  const response = await axiosInstance.post(`${getComplaints}`, data);
  return response.status;
};
