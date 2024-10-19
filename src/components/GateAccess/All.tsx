import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
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
      const pagination = `?page=${page}&limit=10`;
      console.log(pagination);
      const data = await getGateRequests(pagination);
      // setRequest(data.accessLogs);

      console.log(data.accessLogs);
      if (data.accessLogs.length > 0) {
        setRequest((prevData) => [...prevData, ...data.accessLogs]);
        setPageNumber(data.pagination.currentPage + 1);
        setTotalPages(data.pagination.totalPages);
      }

      if (data.pagination.currentPage >= data.pagination.totalPages) {
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
    // (async () => {
    //   const data = await getGateRequests();
    //   setRequest(data.accessLogs);
    // })();
  }, [refetch]);
  if (isLoading) return <ActivityIndicator size="large" color="#F6411B" />;

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator size="large" color="#66635A" />;
  };

  return (
    <View className="flex-1" >
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
        {
          requests.length > 0 && (
            <FlatList
              className=" p-5 mx-5  px-5 bg-white rounded-xl"
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
          )
          // requests.map((data) => {
          //   const { id, firstName, lastName, createdAt, accessCode, status } =
          //     data;
          //   return (
          //     <Constant
          //       key={id}
          //       firstName={firstName}
          //       lastName={lastName}
          //       status={status}
          //       createdAt={createdAt}
          //       code={accessCode}
          //     />
          //   );
          // })
        }
        <View className=" fixed bottom-[-30%]">
          <Button />
        </View>
      </View>
    </View>
  );
};

export default All;
