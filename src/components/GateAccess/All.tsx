import { View, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Constant from "./Constant";
import Button from "./Button";
import { getGateRequests } from "@src/api/gateRequest";
import { useRequestContext } from "@src/context/gateRequest";

interface AccessLog {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  accessCode: string;
  location: string;
  accessType: string;
  security: string | null;
  frequentVisitor: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}
const All = () => {
  const [requests, setRequest] = useState<AccessLog[]>([]);

  const { refetch } = useRequestContext();

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getAccess_logs = async (page: number) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const pagination = `?page=${page}&limit=6`;
      const data = await getGateRequests(pagination);
      // const data: transactionDataProps[] = response.data.data.data;
      // setUserTransaction(data);

      if (data.length > 0) {
        setRequest((prevData)=> [...prevData, ...data.accessLogs]);
        setPageNumber(data.pagination.currentPage + 1);
        setTotalPages(data.pagination.totalPages);
      }

      if (data.data.data.currentPage >= data.pagination.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      // Alert.alert(
      //   "An Error ocurred. Failed to fetch user transaction." + error
      // );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAccess_logs(pageNumber);
  }, [refetch]);
;

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="relative h-screen flex-1">
      {!requests.length && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: "700" }}>No requests yet</Text>
          </View>
        )}
        {requests.length > 0 && requests.map((data) => {
          const { id, firstName, lastName, createdAt, accessCode, status } = data;
          return (
            <Constant
              key={id}
              firstName={firstName}
              lastName={lastName}
              status={status}
              createdAt={createdAt}
              code={accessCode}
            />
          );
        })}
        <Button />
      </View>
    </ScrollView>
  );
};

export default All;
