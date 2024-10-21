import axios from "./axiosClient";

export const getCurrentUser = async () => {
  const response = await axios.get(`/user/current`);
  return response.data.data;
};

export const updateCurrentUser = async (data: any) => {
  const response = await axios.put(`/user/update`, data);
  return response.data.data;
};
