import { View, ScrollView, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Constant from "./Constant";
import Button from "./Button";
import { getGateRequests } from "@src/api/gateRequest";
import { useRequestContext } from "@src/context/gateRequest";
import { AccessLog } from "./All";

const Upcoming = () => {
  const [requests, setRequest] = useState<AccessLog[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { refetch, setRefetch } = useRequestContext()

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator size="large" color="#66635A" />;
  };

  const getAccess_logs = async (page: number) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const pagination = `?page=${page}&limit=6`;
      const data = await getGateRequests(pagination, "PENDING");
    // setRequest(data.accessLogs);
    if (data.accessLogs.length > 0) {
      setRequest((prevData) => [...prevData, ...data.accessLogs]);
      setPageNumber(data.pagination.currentPage + 1);
      setTotalPages(data.pagination.totalPages);
    }

    if (data.pagination.currentPage >= data.pagination.totalPages) {
      setHasMore(false);
    }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getAccess_logs(pageNumber);
    if(refetch){
      setRequest([]);
      setPageNumber(1);
      setHasMore(true);
      getAccess_logs(1);
      setRefetch(false);
    }
  }, [refetch]);

  return (
    <View className="flex-1">
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
        {requests.length > 0 &&
           <FlatList
           className="p-3 mb-10"
           data={requests}
           renderItem={({ item }) => (
             <Constant
               key={item.id}
               firstName={item.firstName}
               lastName={item.lastName}
               status={item.status}
               createdAt={item.createdAt}
               code={item.accessCode}
             />
           )}
           keyExtractor={(item, index) => index.toString()}
           onEndReached={() => {
             if (pageNumber <= totalPages) {
               getAccess_logs(pageNumber);
             }
           }}
           onEndReachedThreshold={0.5}
           ListFooterComponent={renderFooter}
         />
          }
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            flex: 1,
            position: "absolute",
            top: "100%",
            right: 0,
            padding: 10,
          }}
        >
          <Button />
        </View>
      </View>
    </View>
  );
};

export default Upcoming;
