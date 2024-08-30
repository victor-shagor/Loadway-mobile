import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { renderIcon } from "../common/renderIcon";
import { appColors } from "@src/constants/colors";
import { transactionDataProps } from "./Recent_Transactions";

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
    <View className=" flex-row justify-between py-5">
      <View
        className=" rotate-45 p-3  rounded-2xl h-[7vh]"
        style={{ backgroundColor: "rgba( 212, 212, 212, 0.16)" }}
      >
        {renderIcon(icon, "AntDesign", 24, color)}
      </View>
      <View className=" pl-5  w-[40vw]">
        <Text className=" text-[#191508] text-[16px] font-semibold pb-1">
          {item.narration}
        </Text>
        <Text className=" text-[#66635A] text-[12px] font-medium">
          {item.reference}
        </Text>
        <Text
          className=" text-[#66635A] text-[10px] font-medium 
              leading-4 tracking-widest
             "
        >
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

const AllTransactions = ({ data }: { data: transactionDataProps[] }) => {
  return (
    <ScrollView>
      <View
        className=" p-5 mx-5  px-5 bg-white rounded-xl 
       "
      >
        {data.map((item, index) => {
          return (
            <View key={index}>
              <Item item={item} />
            </View>
          );
        })}
      </View>
    </ScrollView>
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

export default AllTransactions;
