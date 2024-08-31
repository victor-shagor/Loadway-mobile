import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { renderIcon } from "../common/renderIcon";
import { appColors } from "@src/constants/colors";
import Empty_bills_or_transaction from "./Empty_bills_or_transaction";
import { BaseUrl } from "@src/utils/Base_url";
import { getCurrentUser } from "@src/utils/APIRoutes";
import axios from "axios";
import SectionTitle from "./SectionTitle";

export type forWhatProps = "payment_history" | "recent_transaction";
export type transactionDataProps = {
  id: string;
  userId: string;
  reference: string;
  amount: number;
  chargeBack: number;
  type: string;
  category: string;
  narration: string;
  status: string;
  metadata: {};
  createdAt: string;
  updatedAt: string;
};

const Item = ({ item }: { item: transactionDataProps }) => {
  const color =
    item.type === "DEBIT"
      ? appColors.orange
      : item.type === "CREDIT"
      ? appColors.green
      : appColors.green;

  const icon =
    item.type === "DEBIT"
      ? "arrowup"
      : item.type === "CREDIT"
      ? "arrowdown"
      : "arrowdown";

  const dateString = item.updatedAt;
  const date = new Date(dateString);

  // ISO String representation (already formatted)
  const isoString = date.toISOString(); // 2024-08-28T11:06:01.143Z

  // Custom formatted date and time
  const formattedDate = date.toISOString().split("T")[0];
  const formattedTime = date.toISOString().split("T")[1].split(".")[0];
  const NewDate = `${formattedDate}, ${formattedTime}`;

  console.log(`Formatted Date: ${formattedDate}`);
  console.log(`Formatted Time: ${formattedTime}`);

  return (
    <View className=" flex-row justify-between py-5">
      <View
        className=" rotate-45 p-3 rounded-2xl"
        style={{ backgroundColor: "rgba( 212, 212, 212, 0.16)" }}
      >
        {renderIcon(icon, "AntDesign", 24, color)}
      </View>
      <View>
        <Text className=" text-[#191508] text-[16px] font-semibold pb-1">
          {item.narration}
        </Text>
        <Text className=" text-[#66635A] text-[10px] font-medium">
          {NewDate}
        </Text>
      </View>
      <View>
        <Text className="" style={{ color }}>
          &#8358;{item.amount.toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

const Recent_Transactions = () => {
  const [userTransaction, setUserTransaction] = useState<
    transactionDataProps[] | []
  >([]);

  useEffect(() => {
    const getUserTransactions = async () => {
      try {
        const url = `${BaseUrl}${getCurrentUser}`;
        const response = await axios.get<{
          data: { transactions: transactionDataProps[] | [] };
        }>(url);
        const transactions: transactionDataProps[] =
          response.data.data.transactions;
        setUserTransaction(transactions);
      } catch (error) {
        Alert.alert("An Error ocurred. Failed to fetch user transaction.");
        console.log("An error occured." + error);
      }
    };
    getUserTransactions();
  }, []);
  const color = userTransaction.length > 0 ? "#CD3617" : "#D1D0CE";

  return (
    <View className=" mt-[5%]">
      <SectionTitle title="Recent Transactions" payAllColor={color} />
      {userTransaction.length > 0 ? (
        <View
          className=" p-5 mx-5  px-5 bg-white rounded-xl 
     divide-y divide-slate-200 mt-5 mb-[10%]"
        >
          {userTransaction.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.itemContainer,
                  index === userTransaction.length - 1 && styles.lastItem,
                ]}
              >
                <Item item={item} />
              </View>
            );
          })}
        </View>
      ) : (
        <Empty_bills_or_transaction text="No recent transactions yet" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 0.1,
    borderColor: "rgba(165, 162, 156, 0.5)",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
});

export default Recent_Transactions;
