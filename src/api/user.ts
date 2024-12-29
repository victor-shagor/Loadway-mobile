import axios from "./axiosClient";

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`/user/current`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateCurrentUser = async (data: any) => {
  const response = await axios.put(`/user/update`, data);
  return response.data.data;
};
