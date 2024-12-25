import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "@src/api/notifications";

const useGetAllNotificationsQuery = (
  category?: string,
  page?: number,
  limit?: number,
) => {
  const queryInfo = useQuery({
    queryKey: ["gateAccess", page, limit, category],
    queryFn: async () => await getAllNotifications({category, page, limit}),
  });
  return queryInfo;
};

export { useGetAllNotificationsQuery };
