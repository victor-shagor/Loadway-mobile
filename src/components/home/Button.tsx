import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useOnboardingContext from "@src/utils/Context";

const Button = ({text}:{text: 'Fund Wallet' | 'Pay Bills'}) => {

  const { setPayBillModal } = useOnboardingContext();

  const buttonHandler = ()=>{
    if (text === 'Pay Bills') {
      setPayBillModal(true);
    };
  };
  return (
    <View className=" w-[30vw] mx-[2%] rounded-3xl bg-white py-[2%]">
      <TouchableOpacity className="" onPress={buttonHandler}>
        <Text 
         className=" text-[#050402] text-center 
         font-semibold text-[16px]">
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
