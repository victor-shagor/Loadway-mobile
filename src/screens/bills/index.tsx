import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import { formatMoney, isDateInPast, timestampDisplay } from "@src/utils/helper";
import FundWalletModal from "../modals/fundWallet";
import CustomModal from "@src/components/CustomModal";
import {
  useGetBillsQuery,
  useGetTransactionsQuery,
} from "@src/hooks/useBillQuery";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useGetCurrentUserQuery } from "@src/hooks/useUserQuery";
import PaymentModal from "../modals/fundWallet/payment";
import { set } from "date-fns";
import { queryClient } from "@src/providers/get-query-client";

const Bills = () => {
  const { navigate } = useNavigation<any>();
  const [currentTab, setCurrentTab] = useState("pending");
  const fundWalletModalRef = useRef<any>(null);
  const paymentModalRef = useRef<any>(null);
  const [isExternalDeficit, setIsExternalDeficit] = useState(false);
  const [externalDeficit, setExternalDeficit] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [totalDue, setTotalDue] = useState(0);

  const { data, isLoading, isFetching, refetch } = useGetBillsQuery();
  const { data: historyData, refetch: transRefetch } = useGetTransactionsQuery();
  const {
    data: currentUser,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    refetch: userRefetch,
  } = useGetCurrentUserQuery();

  const tabs = [
    {
      name: "pending",
      label: "PENDING",
    },
    {
      name: "history",
      label: "HISTORY",
    },
  ];

  const handleTabPress = (tabName: string) => {
    setCurrentTab(tabName);
  };

  const handlePayNow = () => {
    setIsExternalDeficit(
      Number(currentUser?.duesSum) > Number(currentUser?.wallet.balance)
    );
    setExternalDeficit(
      Number(currentUser?.duesSum) - Number(currentUser?.wallet.balance)
    );

    setPaymentAmount(Number(currentUser?.wallet.balance));

    setTotalDue(Number(currentUser?.duesSum));
    paymentModalRef.current?.open();
  };

  const handleAddMoney = () => {
    fundWalletModalRef.current?.open();
  };

  const refeshData =  () => {
    refetch();
    transRefetch();
    userRefetch();
  }

  const gotoDetails = async (item: any) => {
    await AsyncStorage.setItem("transactionDetails", JSON.stringify(item));
    navigate("TransactionDetails");
  };

  if (isUserLoading || isUserFetching) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' color='#F6411B' />
      </View>
    );
  }

  return (
    <View className='flex-1 h-screen px-[5vw]' style={{ gap: 24 }}>
      <StatusBar style='dark' />
      <View className='rounded-xl bg-[#310D05] p-5' style={{ gap: 10 }}>
        <View className='flex-row justify-between items-center'>
          <View className='flex-row items-center' style={{ gap: 8 }}>
            <Text className='text-white/50 font-medium text-base'>Wallet</Text>
            <Text className='text-white font-medium text-base'>
              {formatMoney(Number(currentUser?.wallet?.balance), "₦")}
            </Text>
          </View>
          <Pressable
            onPress={handleAddMoney}
            children={({ pressed }) => (
              <View className={`${pressed ? "opacity-50" : ""}`}>
                <Text className='text-center font-medium text-base text-[#E85637]'>
                  + Add money
                </Text>
              </View>
            )}
          />
        </View>
        <View className='bg-[#050402] p-6 px-1 rounded-2xl justify-center items-center'>
          <Text className='text-white font-medium text-4xl'>
            {formatMoney(Number(currentUser?.duesSum), "₦")}
          </Text>
          <Text className='text-white font-medium text-lg'>Pending bills</Text>
        </View>
      </View>
      <View className='flex-row items-center self-center' style={{ gap: 12 }}>
        {tabs.map((tab) => (
          <Pressable key={tab.name} onPress={() => handleTabPress(tab.name)}>
            {({ pressed }) => (
              <View
                className={`${pressed ? "opacity-50" : ""} ${
                  currentTab === tab.name ? "bg-white" : null
                } rounded-full p-2.5 px-3`}
              >
                <Text
                  className={`${
                    currentTab === tab.name ? "font-bold" : "text-black"
                  } text-base`}
                >
                  {tab.label}
                </Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      {isLoading || isFetching ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color='#F6411B' />
        </View>
      ) : (
        <FlatList
          data={currentTab === "pending" ? data : historyData.data}
          className='bg-white rounded-xl p-5 max-h-64'
          contentContainerStyle={{ gap: 16 }}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={() => (
            <View className='flex-1 items-center justify-center gap-4 pt-10'>
              <View>
                <Feather name='credit-card' size={40} color='#a1a1a1' />
              </View>
              <View>
                <Text className='text-center font-medium text-base text-[#050402]'>
                  Your pending bills will show up here
                </Text>
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isFetching || isLoading}
              onRefresh={refetch}
              colors={["#F6411B"]}
              tintColor={"#F6411B"}
            />
          }
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  if (currentTab !== "pending") {
                    gotoDetails(item);
                  }
                }}
                children={({ pressed }) => (
                  <View
                    className={`${
                      pressed ? "opacity-50" : ""
                    } flex-row justify-between items-center`}
                    style={{ gap: 12 }}
                  >
                    <View
                      className={`${
                        currentTab === "pending"
                          ? "bg-[#FFC7C4]"
                          : item.type === "DEBIT"
                          ? "bg-[#FFC7C4]"
                          : "bg-[#D5FFC4]"
                      } w-14 h-14 items-center justify-center rounded-full shrink-0`}
                    >
                      {currentTab === "pending" ? (
                        <Text className='text-[#CF1919] font-semibold text-2xl'>
                          !
                        </Text>
                      ) : (
                        <View
                          className={`${
                            item.type === "DEBIT"
                              ? "-rotate-[135deg]"
                              : "rotate-45"
                          }`}
                        >
                          <Feather
                            name='arrow-down'
                            size={24}
                            color={
                              item.type === "DEBIT" ? "#CF1919" : "#264C1C"
                            }
                          />
                        </View>
                      )}
                    </View>
                    <View className='flex-1'>
                      <Text className='text-[#050402]/50 font-medium text-sm'>
                      {!isDateInPast(item.dueDate) ? 'Since' : 'Due by'}{' '}
                        {
                          timestampDisplay(
                            currentTab === "pending"
                              ? item.dueDate
                              : item.updatedAt
                          ).formattedDate
                        }
                      </Text>
                      <Text className='text-[#050402] font-medium text-base'>
                        {currentTab === "pending"
                          ? item.billName
                          : item.narration}
                      </Text>
                    </View>
                    <View style={{justifyContent: 'flex-end', alignItems:'flex-end'}}>
                    <Text className='text-[#000] font-medium text-sm shrink-0'>
                      {currentTab !== "pending"
                        ? item.type === "DEBIT"
                          ? "-"
                          : "+"
                        : ""}
                      {""}
                      {formatMoney(
                        Number(
                          currentTab === "pending"
                            ? item.amountDue || 0
                            : item.amount || 0
                        ),
                        "₦"
                      )}
                    </Text>
                    <Text className='text-[#000] font-small text-sm shrink-0' style={{fontSize: 11}}>
                      Paid: {formatMoney(item.amount - item.amountDue || 0, "₦")}
                    </Text>
                    </View>
                  </View>
                )}
              />
            );
          }}
        />
      )}

      {currentTab === "pending" && Number(currentUser?.duesSum) > 0 && (
        <Pressable
          onPress={handlePayNow}
          children={({ pressed }) => (
            <View
              className={`${
                pressed ? "opacity-50" : ""
              } rounded-full h-14 justify-center items-center border-2 border-black bg-[#FFF6F4]`}
            >
              <Text className='text-center font-medium text-base text-[#050402]'>
                Pay all now
              </Text>
            </View>
          )}
        />
      )}

      <CustomModal
        modalizeRef={fundWalletModalRef}
        modalContent={
          <FundWalletModal
            close={() => fundWalletModalRef.current?.close()}
            type="wallet"
          />
        }
      />

      <CustomModal
        modalizeRef={paymentModalRef}
        onClose={() => {
          queryClient.invalidateQueries({ queryKey: ["bills"] });
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] })
        }}
        modalContent={
          <PaymentModal
            amount={paymentAmount}
            totalDue={totalDue}
            refeshData={refeshData}
            isExternalDeficit={isExternalDeficit}
            externalDeficit={externalDeficit}
            close={() => paymentModalRef.current?.close()}
            type="bill"

          />
        }
      />
    </View>
  );
};

export default Bills;
