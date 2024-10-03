import { getUserDueBills, payUserBills } from "@src/utils/APIRoutes";
import axios from "./axiosClient";
import { HousingBillsProps } from "@src/components/bills/HousingBills";
import { Chats } from "@src/models/messaging";

export const getChats = async () => {
  const response = await axios.get<{
    data: any;
  }>('/chat');
  return response.data.data;
};

export const getMessages = async (chatId: string) => {
    const response = await axios.get<{
        data: any;
      }>(`chat/messages/${chatId}`);
      return response.data.data;
};

export const updateMessages = async (chatId: string) => {
  const response = await axios.put<{
      data: any;
    }>(`chat/update/${chatId}`);
    return response.data.data;
};
