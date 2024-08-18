import { BaseUrl } from "@src/utils/Base_url";
import axios from "./axiosClient";

export const getCurrentUser = async (token: string) => {
  console.log("token", token);
  const response = await axios.get(`${BaseUrl}/user/current`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};
