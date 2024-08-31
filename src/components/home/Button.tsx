import { View, Text } from "react-native";
import React from "react";

const Button = ({text}:{text: 'Fund Wallet' | 'Pay Bills'}) => {

  return (
    <View className=" w-[30vw] mx-[2%] rounded-3xl bg-white p-2">
        <Text 
         className=" text-[#050402] text-center 
         font-semibold text-[16px]">
          {text}
        </Text>
    </View>
  );
};

export default Button;
