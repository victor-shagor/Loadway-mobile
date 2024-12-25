import { getUserDueBills, payUserBills } from "@src/utils/APIRoutes";
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
  const response = await axios.post(`${payUserBills}`, data);
  return response.status;
};
