import { View, Text } from "react-native";
import React from "react";
import Transaction from "@src/components/bills/Transaction";
import PaymentHistoryBills from "@src/components/bills/PaymentHistoryBills";


const PaymentHistory = () => {
  return (
    <View className="bg-white h-[100vh]">
      <View className="w-[90vw] mx-[4%] mt-5 rounded-lg"
       style={{ backgroundColor: "rgba(178, 177, 173, 0.15)" }}
      >
        <Text 
         className=" text-left pl-5 text-[#3F3C31] py-4 font-bold text-[14px]"
         >30.02.2023</Text>
      </View>
      <PaymentHistoryBills />
    </View>
  );
};

export default PaymentHistory;
