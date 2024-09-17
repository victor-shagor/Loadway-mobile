import { getUserDueBills, payUserBills } from "@src/utils/APIRoutes";
import axios from "./axiosClient";
import { HousingBillsProps } from "@src/components/bills/HousingBills";

export const getBills = async () => {
  const response = await axios.get<{
    data: HousingBillsProps[] | [];
  }>(`${getUserDueBills}`);
  return response.data.data;
};

export const payBills = async (data: any) => {
  const response = await axios.post(`${payUserBills}`, data);
  return response.status;
};
