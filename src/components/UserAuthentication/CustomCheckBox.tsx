import { View, Text } from "react-native";
import React from "react";

const CustomCheckBox = ({text, width}:{text:string, width: number}) => {
  return (
    <View className={`flex-row gap-2 ml-5 bg-[#d4d4d470] w-[42vw] py-2 px-4 rounded-2xl mb-4`}>
      <View className="h-[11.21px] w-[11.21px] bg-black border-2 border-[#66635A] rounded-sm relative top-[-1px]"></View>
      <Text className=" text-[#66635A] font-medium relative top-[-4px] text-[10px]">{text}</Text>
    </View>
  );
};

export default CustomCheckBox;
