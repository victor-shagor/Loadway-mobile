import { View, Text, Alert, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import AllTransactions from "@src/components/bills/AllTransactions";
import { transactionDataProps } from "@src/components/bills/Recent_Transactions";
import { getAllTransactions } from "@src/utils/APIRoutes";
import { getAccessToken } from "@src/utils/RetrieveAccessToken";
import axiosInstance from "@src/api/axiosClient";
import { Item } from "@src/components/bills/AllTransactions";

const PaymentHistory = () => {
  const [userTransaction, setUserTransaction] = useState<
    transactionDataProps[] | []
  >([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getUserTransactions = async (page: number) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const pagination = `?page=${page}&limit=6`;
      const userAccessToken = await getAccessToken();
      const url = `${getAllTransactions}${pagination}`;
      const response = await axiosInstance.get<{
        data: {
          data: transactionDataProps[] | [];
          totalPages: number;
          currentPage: number;
        };
      }>(url);
      const transactions: transactionDataProps[] = response.data.data.data;
      // setUserTransaction(transactions);

      if (transactions.length > 0) {
        setUserTransaction((prevTransactions) => [
          ...prevTransactions,
          ...transactions,
        ]);
        setPageNumber(response.data.data.currentPage + 1);
        setTotalPages(response.data.data.totalPages);
      }

      if (response.data.data.currentPage >= response.data.data.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      Alert.alert(
        "An Error ocurred. Failed to fetch user transaction." + error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserTransactions(pageNumber);
  }, []);

  if (isLoading) return <ActivityIndicator size="large" color="#F6411B" />;

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator size="large" color="#66635A" />;
  };

  return (
    <View className="bg-white h-[100vh] pb-[15vh]">
      <View
        className="w-[90vw] mx-[4%] mt-5 rounded-lg"
        style={{ backgroundColor: "rgba(178, 177, 173, 0.15)" }}
      >
        <Text className=" text-left pl-5 text-[#3F3C31] py-4 font-bold text-[14px]">
          30.02.2023
        </Text>
      </View>
      {/* <AllTransactions data={userTransaction} /> */}
      <FlatList
        className=" p-5 mx-5  px-5 bg-white rounded-xl"
        data={userTransaction}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => {
          if (pageNumber <= totalPages) {
            getUserTransactions(pageNumber);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default PaymentHistory;
