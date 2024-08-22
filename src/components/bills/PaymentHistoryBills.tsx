import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { transactionData } from "@src/constants/data";
import { transactionProps } from "@src/constants/data";
import { renderIcon } from "../common/renderIcon";
import { appColors } from "@src/constants/colors";
import { paymentHistoryData } from "@src/constants/data";



const Item = ({
    item,
  }: {
    item:  transactionProps;
  }) => {
    const color = item.price.startsWith("-")
      ? appColors.orange
      : item.price.startsWith("+")
      ? appColors.green
      : appColors.green;
  
    const icon = item.price.startsWith("-")
      ? "arrowup"
      : item.price.startsWith("+")
      ? "arrowdown"
      : "arrowdown";
  
    return (
      <View className=" flex-row justify-between py-5">
        <View
          className=" rotate-45 p-3  rounded-2xl h-[8vh]"
          style={{ backgroundColor: "rgba( 212, 212, 212, 0.16)" }}
        >
          {renderIcon(icon, "AntDesign", 24, color)}
        </View>
        <View className=" pl-5  w-[40vw]">
          <Text className=" text-[#191508] text-[16px] font-semibold pb-1">
            {item.name}
          </Text>
            <Text className=" text-[#66635A] text-[12px] font-medium">
              {item.code}
            </Text>
            <Text 
             className=" text-[#66635A] text-[10px] font-medium 
              leading-4 tracking-widest
             ">
              {item.time}
            </Text>
        </View>
        <View>
          <Text className="" style={{ color }}>
            {item.price}
          </Text>
        </View>
      </View>
    );
  };



const PaymentHistoryBills = () => {
    return (
      <View
        className=" p-5 mx-5  px-5 bg-white rounded-xl 
       divide-y divide-slate-500 mt-5"
      >
        {paymentHistoryData.map((item, index) => {
          return (
            <View
              key={index}
              
            >
              <Item item={item}  />
            </View>
          );
        })}
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
  
  export default PaymentHistoryBills;
  