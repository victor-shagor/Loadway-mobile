import { useQuery } from "@tanstack/react-query";
import { getAllComplaints } from "@src/api/complaints";

const useGetComplaintsQuery = (search?: string) => {
  const queryInfo = useQuery({
    queryKey: ["complaints", search],
    queryFn: async () => await getAllComplaints(search),
  });
  return queryInfo;
};

export { useGetComplaintsQuery };
