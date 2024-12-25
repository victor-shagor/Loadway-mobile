import { useQuery } from "@tanstack/react-query";
import { getFrequentVisitors, getGateRequests } from "@src/api/gateRequest";

const useGateRequestQuery = (
  page?: number,
  pageSize?: number,
  status?: string,
) => {
  const pagination = `?page=${page}&limit=${pageSize}`;
  const queryInfo = useQuery({
    queryKey: ["gateAccess", page, pageSize, status],
    queryFn: async () => await getGateRequests(pagination, status),
  });
  return queryInfo;
};

const useGetFrequentVisitors = () => {
  const queryInfo = useQuery({
    queryKey: ["frequentVisitors"],
    queryFn: async () => await getFrequentVisitors(),
  });
  return queryInfo;
};

export { useGateRequestQuery, useGetFrequentVisitors };
