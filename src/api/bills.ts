import {
  getAllTransactions,
  getUserDueBills,
  payUserBills,
} from "@src/utils/APIRoutes";
import axios from "./axiosClient";
import { HousingBillsProps } from "@src/components/bills/HousingBills";

export const getBills = async () => {
  try {
    const response = await axios.get<{
      data: Array<HousingBillsProps | any>;
    }>(`${getUserDueBills}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const payBills = async (data: any) => {
  try {
    const response = await axios.post(`${payUserBills}`, data);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const getAllUserTransactions = async (
  page: number = 1,
  limit: number = 1000
) => {
  try {
    const pagination = `?page=${page}&limit=${limit}`;
    const response = await axios.get<{
      data: any;
    }>(`${getAllTransactions}${pagination}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const buyElectricity = async (
  data: any,
) => {
  try {
    const response = await axios.post(`/user/electricity/buy`, data);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const getElectricityHistory = async (page: number = 1, limit: number = 1000) => {
  try {
    const pagination = `?page=${page}&limit=${limit}`;
    const response = await axios.get<{
      data: any;
    }>(`/user/electricity/history${pagination}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectricityToken = async (requestId: string) => {
  try {
    const response = await axios.get<{
      data: any;
    }>(`/user/electricity/token/${requestId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
