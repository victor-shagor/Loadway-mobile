import { useQuery } from "@tanstack/react-query";
import {
  getAllUserTransactions,
  getBills,
  getElectricityHistory,
  getElectricityToken,
} from "@src/api/bills";

const useGetBillsQuery = () => {
  const queryInfo = useQuery({
    queryKey: ["bills"],
    queryFn: async () => await getBills(),
  });
  return queryInfo;
};

const useGetTransactionsQuery = (page?: number, limit?: number) => {
  const queryInfo = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => await getAllUserTransactions(page, limit),
  });
  return queryInfo;
};

const useGetElectricityHistoryQuery = (page?: number, limit?: number) => {
  const queryInfo = useQuery({
    queryKey: ["electricityHistory"],
    queryFn: async () => await getElectricityHistory(page, limit),
  });
  return queryInfo;
};

const useGetElectricityTokenQuery = (requestId: string) => {
  const queryInfo = useQuery({
    queryKey: ["electricityToken"],
    queryFn: async () => await getElectricityToken(requestId),
  });
  return queryInfo;
};

export {
  useGetBillsQuery,
  useGetTransactionsQuery,
  useGetElectricityHistoryQuery,
  useGetElectricityTokenQuery,
};
