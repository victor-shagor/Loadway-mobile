import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import {
  useGetElectricityHistoryQuery,
} from "@src/hooks/useBillQuery";
import BillCard from "./BillCard";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomModal from "@src/components/CustomModal";
import FundWalletModal from "../modals/fundWallet";
import ViewBillModal from "./ViewBillModal";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import images from "@src/constants/images";

const ElectricityVending = () => {
  const { data, isLoading, isFetching, refetch } =
    useGetElectricityHistoryQuery();

  const [openViewBillModal, setOpenViewBillModal] = useState(false);
  const topupModalRef = useRef<any>(null);
  const [selectedBill, setSelectedBill] = useState<any>({});

  const tempData = [
    {
      date: "2024-12-24T11:49:20.972Z",
      amount: 50000,
      code: "2312 2131 1232 2312",
      meterNumber: "1234567890",
      status: "PENDING",
      fee: 100,
      tariff: "350/kwh",
      units: 148.5,
      reference: "1234567890",
    },
    {
      date: "2024-12-24T11:49:20.972Z",
      amount: 50000,
      code: "2312 2131 1232 2312",
      meterNumber: "1234567890",
      status: "SUCCESS",
      fee: 100,
      tariff: "350/kwh",
      units: 148.5,
      reference: "1234567890",
    },
    {
      date: "2024-12-24T11:49:20.972Z",
      amount: 50000,
      code: "2312 2131 1232 2312",
      meterNumber: "1234567890",
      status: "FAILED",
      fee: 100,
      tariff: "350/kwh",
      units: 148.5,
      reference: "1234567890",
    },
  ];

  const openBillInfo = (item: any) => {
    setSelectedBill(item);
    setOpenViewBillModal(true);
  };

  return (
    <View className='flex-1 px-[5vw]'>
      <StatusBar style='dark' />

      {isLoading || isFetching ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color='#F6411B' />
        </View>
      ) : (
        <FlatList
          data={data?.data || []}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <BillCard item={item} handlePress={() => openBillInfo(item)} />
          )}
          contentContainerStyle={{ gap: 16, paddingBottom: 30 }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
              colors={["#F6411B"]}
              tintColor={"#F6411B"}
            />
          }
          ListEmptyComponent={() => (
            <View className='flex-1 items-center justify-center pt-32 px-14 gap-4'>
              <View className='items-center'>
                <MaterialCommunityIcons
                  name='home-lightning-bolt'
                  size={100}
                  color='#a1a1a1'
                />
              </View>
              <View>
                <Text className='text-center font-medium text-lg text-[#050402]'>
                  You electricity top up history will show up here
                </Text>
              </View>
            </View>
          )}
        />
      )}

      <Pressable onPressIn={() => topupModalRef.current?.open()}>
        {({ pressed }) => (
          <View
            className={`${
              pressed ? "opacity-50" : ""
            } absolute bottom-16 right-[5vw] rounded-full w-[72px] h-[72px] flex justify-center items-center bg-[#F6411B]`}
          >
            <Feather name='plus' size={24} color='#fff' />
          </View>
        )}
      </Pressable>
      <CustomModal
        modalizeRef={topupModalRef}
        modalContent={
          <FundWalletModal
            close={() => {
              topupModalRef.current?.close();
            }}
            type='bill'
          />
          // <PayBillModal close={() => topupModalRef.current?.close()} />
        }
      />
      <ViewBillModal
        closeModal={() => setOpenViewBillModal(false)}
        modalVisible={openViewBillModal}
        item={selectedBill}
      />
    </View>
  );
};

export default ElectricityVending;
