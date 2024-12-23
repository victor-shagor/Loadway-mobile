import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { renderIcon } from "../common/renderIcon";
import { appColors } from "@src/constants/colors";
import Empty_bills_or_transaction from "./Empty_bills_or_transaction";
import { BaseUrl } from "@src/utils/Base_url";
import { getCurrentUser } from "@src/utils/APIRoutes";
import SectionTitle from "./SectionTitle";
import axiosInstance from "@src/api/axiosClient";
import useOnboardingContext from "@src/utils/Context";
import { formatNarration } from "@src/utils/helper";
import { ThemedText } from "../ThemedText";
import { transactionDataProps } from "@src/models/transactions";

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

  return (
    <View style={styles.itemContentContainer}>
      <View
        className=" rotate-45 p-3 rounded-2xl"
        style={{ backgroundColor: "rgba( 212, 212, 212, 0.16)" }}
      >
        {renderIcon(icon, "AntDesign", 24, color)}
      </View>
      <View style={{ gap: 2 }}>
        <ThemedText
          type="default"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ width: 150 }}
        >
          {formatNarration(item.narration)}
        </ThemedText>

        <ThemedText type="small" className="text-[#66635A]">
          {NewDate}
        </ThemedText>
      </View>
      <View>
        <Text className="" style={{ color }}>
          &#8358;{item.amount.toLocaleString("en-US")}
        </Text>
      </View>
    </View>
  );
};

const Recent_Transactions = () => {
  const [userTransaction, setUserTransaction] = useState<
    transactionDataProps[] | []
  >([]);

  const { bills, currentUser } = useOnboardingContext();

  useEffect(() => {
    const getUserTransactions = async () => {
      try {
        const response = await axiosInstance.get<{
          data: { transactions: transactionDataProps[] | [] };
        }>(`${getCurrentUser}`);
        const transactions: transactionDataProps[] =
          response.data.data.transactions;
        setUserTransaction(transactions);
      } catch (error) {
        Alert.alert("An Error ocurred. Failed to fetch user transaction.");
      }
    };
    getUserTransactions();
  }, [bills, currentUser?.wallet.balance]);
  const color = userTransaction.length > 0 ? "#CD3617" : "#D1D0CE";

  return (
    <View className="mt-[5%] mb-10">
      <SectionTitle title="Recent Transactions" payAllColor={color} />
      {userTransaction.length > 0 ? (
        <View
          className=" mx-5 px-5 bg-white rounded-xl 
     divide-y divide-slate-200 mt-5 mb-[20%]"
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
        <View style={{ marginBottom: 10 }}>
          <Empty_bills_or_transaction text="No recent transactions yet" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 0.1,
    borderColor: "rgba(165, 162, 156, 0.5)",
  },
  itemContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 80,
    paddingVertical: 10,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
});

export default Recent_Transactions;
