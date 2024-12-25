import axios from "./axiosClient";

export enum GateAccessStatus {
  "PENDING" = "PENDING",
  "CONFIRMED" = "CONFIRMED",
  "REJECTED" = "REJECTED",
}

export const getGateRequests = async (
  pagination: string = "?page=1&limit=6",
  status?: string
) => {
  try {
    const url = status
      ? `/gate/access-logs?status=${status}`
      : `/gate/access-logs${pagination}`;
    const response = await axios.get(url);
    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const getFrequentVisitors = async () => {
  try {
    const response = await axios.get(`/gate/frequent-visitors`);
    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const addToFrequentList = async (data: any) => {
  try {
    const response = await axios.post(`/gate/frequency/list`, data);
    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const createGateAccess = async (data: any) => {
  try {
    const response = await axios.post(`/gate/create-access`, data);
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || "error creating access";
    throw message;
  }
};

export const revokeGateAccess = async (id: any) => {
  try {
    const response = await axios.delete(`/gate/access-revoke?accessId=${id}`);
    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};
