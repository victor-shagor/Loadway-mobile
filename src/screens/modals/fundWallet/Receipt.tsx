import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { formatMoney } from "@src/utils/helper";

type Props = {
  onClose: () => void;
  data: any;
};

const Receipt = ({ onClose, data }: Props) => {
  return (
    <View className='px-[10vw] py-10' style={{ gap: 24 }}>
      <View className='self-center w-16 h-16 rounded-full items-center justify-center bg-[#D5FFC4]'>
        <Feather name='check' size={24} color='black' onPress={onClose} />
      </View>
      <Text className='text-black text-2xl font-medium pb-1.5 text-center'>
        Bill Paid
      </Text>
      <View className='flex-row justify-between' style={{ gap: 16 }}>
        <View className='flex-1'>
          <Text className='text-black/80 text-sm'>AMOUNT</Text>
          <Text className='text-black font-medium text-lg'>
            {formatMoney(data?.amount || 0, "₦")}
          </Text>
        </View>
        <View className='flex-1'>
          <Text className='text-black/80 text-sm'>WALLET BALANCE</Text>
          <Text className='text-black font-medium text-lg'>
            {formatMoney(data?.walletBalance || 0, "₦")}
          </Text>
        </View>
      </View>
      <View className='flex-row justify-between' style={{ gap: 16 }}>
        <View className='flex-1'>
          <Text className='text-black/80 text-sm'>PAID</Text>
          <Text className='text-black font-medium text-lg'>
            {data?.date || "--"}
          </Text>
        </View>
        <View className='flex-1'>
          <Text className='text-black/80 text-sm'>TIME</Text>
          <Text className='text-black font-medium text-lg'>
            {data?.time || "--"}
          </Text>
        </View>
      </View>
      <View className='flex-row justify-between' style={{ gap: 16 }}>
        <View className='flex-1'>
          <Text className='text-black/80 text-sm'>STATUS</Text>
          <Text className='text-black font-medium text-lg'>
            {data?.status || "--"}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onClose}
        children={({ pressed }) => (
          <View
            className={`${
              pressed ? "opacity-50" : ""
            } rounded-full h-16 justify-center items-center border-2 border-black`}
          >
            <Text className='text-center font-medium text-base text-black'>
              Close
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Receipt;

const styles = StyleSheet.create({});
