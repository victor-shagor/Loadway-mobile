import { View, Text, Platform, TouchableOpacity } from "react-native";
import React from "react";
import { HousingBillData } from "@src/constants/data";
import { appColors } from "@src/constants/colors";

const HouseBill = () => {
  return (
    <View className=" mt-[10%] h-[80vh]">
      {HousingBillData.map((data, index) => {
        return (
          <View key={index} className="mb-[10%] flex-row justify-between px-5
           relative ">
            <View className=" flex-row gap-2">
              <View
                className={`w-[3vw] h-[60vh] rounded-full relative
                ${Platform.OS === "ios" ? "h-[1.5vh]" : "h-[1.7vh]"}
                ${Platform.OS === "ios" ? "top-0" : "top-[6.8%]"}
                `}
                style={{ backgroundColor: data.color }}
              ></View>
              <Text className="text-[#191508] font-medium text-[16px]">
                {data.name}
              </Text>
            </View>
            <View>
              <Text className="text-[#3F3C31] font-medium text-[13px]">
                {data.price}
              </Text>
            </View>
          </View>
        );
      })};
      
      <View className=" absolute bottom-0">
        <View className=" flex-row gap-2 px-[24.7] mb-3">
          <Text className="text-[#3F3C31] font-medium text-[15px]">
            Current Wallet Balance:
          </Text>
          <Text className=" text-[#612A3F] font-extrabold text-[16px]">
            N30,000.00:
          </Text>
        </View>
        <TouchableOpacity
          className="w-[90vw] mx-5 rounded-xl"
          style={{ backgroundColor: appColors.orange }}
        >
          <Text
            className="text-white font-semibold text-[16px] py-[2vh] 
        text-center"
          >
            Fund Wallet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HouseBill;
