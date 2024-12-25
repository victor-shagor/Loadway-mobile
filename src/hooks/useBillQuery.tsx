import { useQuery } from "@tanstack/react-query";
import { getBills } from "@src/api/bills";

const useGetBillsQuery = () => {
  const queryInfo = useQuery({
    queryKey: ["bills"],
    queryFn: async () => await getBills(),
  });
  return queryInfo;
};

export { useGetBillsQuery };
