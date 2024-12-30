import { useQuery } from "@tanstack/react-query";
import { getAllUserTransactions, getBills } from "@src/api/bills";

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

export { useGetBillsQuery, useGetTransactionsQuery };
