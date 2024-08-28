import axios from "./axiosClient";

export const getCurrentUser = async () => {
  const response = await axios.get(`/user/current`);
  return response.data.data;
};
