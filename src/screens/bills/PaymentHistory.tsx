import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AllTransactions from "@src/components/bills/AllTransactions";
import { transactionDataProps } from "@src/components/bills/Recent_Transactions";
import { BaseUrl } from "@src/utils/Base_url";
import { getAllTransactions } from "@src/utils/APIRoutes";
import axios from "axios";
import { getAccessToken } from "@src/utils/RetrieveAccessToken";


const PaymentHistory = () => {
  const [userTransaction, setUserTransaction] = useState<
    transactionDataProps[] | []
  >([]);



  useEffect(() => {
    const getUserTransactions = async () => {
      try {
        const pagination = "?page=1&limit=2000";
        const userAccessToken = await  getAccessToken();
        const headers = {
          Authorization:
            userAccessToken
        };
        const url = `${BaseUrl}${getAllTransactions}${pagination}`;
        console.log(url);
        const response = await axios.get<{
            data: { data: transactionDataProps[] | [] };
        }>(url, { headers });
        const transactions: transactionDataProps[] =
          response.data.data.data;
        setUserTransaction(transactions);
      } catch (error) {
        Alert.alert(
          "An Error ocurred. Failed to fetch user transaction." + error
        );
        console.log("An error occured." + error);
      }
    };
    getUserTransactions();
  }, []);

  return (
    <View className="bg-white h-[100vh]">
      <View
        className="w-[90vw] mx-[4%] mt-5 rounded-lg"
        style={{ backgroundColor: "rgba(178, 177, 173, 0.15)" }}
      >
        <Text className=" text-left pl-5 text-[#3F3C31] py-4 font-bold text-[14px]">
          30.02.2023
        </Text>
      </View>
      <AllTransactions data={userTransaction} />
    </View>
  );
};

export default PaymentHistory;
