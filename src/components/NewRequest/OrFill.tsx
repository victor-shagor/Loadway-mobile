import { View, Text } from "react-native";
import React from "react";

const OrFill = () => {
  return (
    <View className=" relative mb-7 mt-2">
      <View className=" w-[92vw] bg-[#00000080] h-[0.2vh] mx-4"></View>
      <View 
       className="bg-[#FAFAFA] p-2 w-[20vw] rounded-2xl
        absolute top-[-2vh] left-[40%]">
        <Text className=" text-center">Or fill</Text>
      </View>
    </View>
  );
};

export default OrFill;
