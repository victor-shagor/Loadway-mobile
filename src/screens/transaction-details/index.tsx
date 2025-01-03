import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatMoney, timestampDisplay } from "@src/utils/helper";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

type Props = {};

const TransactionDetails = (props: Props) => {
  const [transaction, setTransaction] = useState<any>({});

  useEffect(() => {
    (async () => {
      const transactionDetails = await AsyncStorage.getItem(
        "transactionDetails"
      );
      setTransaction(JSON.parse(transactionDetails || ""));
    })();
  }, []);

  return (
    <ScrollView>
      <View className='flex-1 px-[5vw]' style={{ gap: 24 }}>
        <View className='flex-row bg-white rounded-xl p-6' style={{ gap: 12 }}>
          <View
            className={`${
              transaction?.type === "DEBIT"
                ? "bg-[#FFC7C4] -rotate-[135deg]"
                : "bg-[#D5FFC4] rotate-45"
            } h-14 w-14 rounded-full justify-center items-center`}
          >
            <Feather
              name='arrow-down'
              size={24}
              color={transaction?.type === "DEBIT" ? "#CF1919" : "#264C1C"}
            />
          </View>
          <View className='flex-1'>
            <Text className='text-black/80 text-sm'>
              {transaction?.metadata?.dueBillName}
            </Text>
            <Text className='text-black font-medium text-2xl'>{`${
              transaction?.type === "DEBIT" ? "-" : "+"
            }${formatMoney(transaction?.amount || 0, "₦")}`}</Text>
          </View>
          <View className='bg-black rounded-full px-2 shrink-1 h-8 justify-center'>
            <Text className='text-white text-xs'>{transaction?.type}</Text>
          </View>
        </View>
        <View style={{ gap: 8 }}>
          <Text className='text-black/80 text-base font-medium'>OTHER DETAILS</Text>
          <View className='flex-1 bg-white rounded-xl p-6' style={{ gap: 16 }}>
            <View className='flex-row'>
              <View className='flex-1'>
                <Text className='text-black/80 text-sm'>AMOUNT</Text>
                <Text className='text-black font-medium text-lg'>
                  {formatMoney(transaction?.amount || 0, "₦")}
                </Text>
              </View>
              <View className='flex-1'>
                <Text className='text-black/80 text-sm'>Reference</Text>
                <Text className='text-black font-medium text-lg'>
                  {transaction?.reference}
                </Text>
              </View>
            </View>
            <View className='flex-row'>
              <View className='flex-1'>
                <Text className='text-black/80 text-sm'>AMOUNT</Text>
                <Text className='text-black font-medium text-lg'>
                  {formatMoney(transaction?.amount || 0, "₦")}
                </Text>
              </View>
              <View className='flex-1'>
                <Text className='text-black/80 text-sm'>REFERENCE</Text>
                <Text className='text-black font-medium text-lg'>
                  {transaction?.reference}
                </Text>
              </View>
            </View>
            <View className='flex-row'>
              <View className='flex-1'>
                <Text className='text-black/80 text-sm'>PAID</Text>
                <Text className='text-black font-medium text-lg'>
                  {timestampDisplay(transaction?.updatedAt).formattedDate}
                </Text>
              </View>
              <View className='flex-1'>
                <Text className='text-black/80 text-sm'>TIME</Text>
                <Text className='text-black font-medium text-lg'>
                  {timestampDisplay(transaction?.updatedAt).formattedTime}
                </Text>
              </View>
            </View>
            <View className='flex-row'>
              <View className='flex-1'>
                <Text className='text-black/80 text-sm'>DUE</Text>
                <Text className='text-black font-medium text-lg'>
                  {timestampDisplay(transaction?.createdAt).formattedDate}
                </Text>
              </View>
              <View className='flex-1'>
                <Text className='text-black/80 text-sm'>TIME</Text>
                <Text className='text-black font-medium text-lg'>
                  {timestampDisplay(transaction?.createdAt).formattedTime}
                </Text>
              </View>
            </View>
            <View className='flex-row' style={{ gap: 12 }}>
              <View className='flex-1'>
                <Text className='text-black/80 text-sm'>ID</Text>
                <Text className='text-black font-medium text-lg'>
                  {transaction?.id}
                </Text>
              </View>
              <View className='flex-1'>
                <Text className='text-black/80 text-sm'>STATUS</Text>
                <Text className='text-black font-medium text-lg'>
                  {transaction?.status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TransactionDetails;

