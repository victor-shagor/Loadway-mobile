import React, { useRef, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { useGetBillsQuery } from "@src/hooks/useBillQuery";
import BillCard from "./BillCard";
import { Feather } from "@expo/vector-icons";
import CustomModal from "@src/components/CustomModal";
import FundWalletModal from "../modals/fundWallet";
import ViewBillModal from "./ViewBillModal";

const ElectricityVending = () => {
  const { data, isLoading, isFetched, refetch } = useGetBillsQuery();
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
      <FlatList
        data={tempData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <BillCard item={item} handlePress={() => openBillInfo(item)} />
        )}
        contentContainerStyle={{ gap: 16 }}
      />

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
            type="bill"
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