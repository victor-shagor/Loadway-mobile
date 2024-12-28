import { getCurrentUser } from "@src/api/user";
import { useQuery } from "@tanstack/react-query";

const useGetCurrentUserQuery = () => {
  const queryInfo = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => await getCurrentUser(),
  });
  return queryInfo;
};

export { useGetCurrentUserQuery };
