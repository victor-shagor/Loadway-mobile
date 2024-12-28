import { Pressable, Text, View } from "react-native";
import React from "react";
import { formatMoney, timestampDisplay } from "@src/utils/helper";

export type BillCardProps = {
  item: any;
  handlePress: () => void;
};

const BillCard = ({ item, handlePress }: BillCardProps) => {
  return (
    <View className='bg-white rounded-2xl p-4'>
      <View style={{ gap: 8 }}>
        <View>
          <View className='flex-row justify-between items-center'>
            <Text className='text-[#050402]/50 font-medium text-sm'>
              {timestampDisplay(item.date).formattedDate} at{" "}
              {timestampDisplay(item.date).formattedTime}
            </Text>
            <Text className='text-[#050402] font-medium text-sm'>
              {formatMoney(Number(item.amount), "₦")}
            </Text>
          </View>
          <Text className='text-[#050402] font-medium text-lg'>
            {item.code}
          </Text>
        </View>
        <View>
          <View className='flex-row justify-between items-center'>
            <Text>METER NO: {item.meterNumber}</Text>
            <View
              className={`py-2.5 px-3 rounded-full ${
                item.status === "PENDING"
                  ? "bg-[#EFDCBA] text-[#4C3A1C]"
                  : item.status === "SUCCESS"
                  ? "bg-[#BAEFBC] text-[#264C1C]"
                  : "bg-[#FFC7C4] text-[#CF1919]"
              }`}
            >
              <Text className='text-xs'>{item.status}</Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={handlePress}
          children={({ pressed }) => (
            <View
              className={`${
                pressed ? "opacity-50" : ""
              } rounded-full h-14 justify-center items-center border-2 border-black`}
            >
              <Text className='text-center font-medium text-base'>
                VIEW DETAILS
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default BillCard;
