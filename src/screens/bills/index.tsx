import {} from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import useOnboardingContext from "@src/utils/Context";
import { formatMoney } from "@src/utils/helper";
import { Image } from "expo-image";
import images from "@src/constants/images";
import FundWalletModal from "../modals/fundWallet";
import CustomModal from "@src/components/CustomModal";

const Bills = () => {
  const { currentUser } = useOnboardingContext();
  const [currentTab, setCurrentTab] = React.useState("pending");
  const fundWalletModalRef = React.useRef<any>(null);
  const [isExternalDeficit, setIsExternalDeficit] = React.useState(false);

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

  const pendingData = [
    {
      name: "HOUSE RENT",
      date: "2024-12-24",
      amount: 900000,
    },
    {
      name: "HOUSE RENT",
      date: "2024-12-24",
      amount: 900000,
    },
    {
      name: "HOUSE RENT",
      date: "2024-12-24",
      amount: 900000,
    },
    {
      name: "HOUSE RENT",
      date: "2024-12-24",
      amount: 900000,
    },
  ];

  const handlePayNow = () => {
    setIsExternalDeficit(true);
    fundWalletModalRef.current?.open();
  };

  const handleAddMoney = () => {
    setIsExternalDeficit(false);
    fundWalletModalRef.current?.open();
  };

  return (
    <View className='flex-1 h-screen px-[5vw]' style={{ gap: 24 }}>
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
      <FlatList
        data={pendingData}
        className='bg-white rounded-xl p-5 max-h-64'
        contentContainerStyle={{ gap: 16 }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View
              className='flex-row justify-between items-center'
              style={{ gap: 12 }}
            >
              <View
                className={`${
                  currentTab === "pending" ? "bg-[#FFC7C4]" : "bg-[#D5FFC4]"
                } w-14 h-14 items-center justify-center rounded-full shrink-0`}
              >
                {currentTab === "pending" ? (
                  <Text className='text-[#CF1919] font-semibold text-2xl'>
                    !
                  </Text>
                ) : (
                  <Image
                    source={images.bills.walletIcon}
                    className='w-10 h-10'
                  />
                )}
              </View>
              <View className='flex-1'>
                <Text className='text-[#050402]/50 font-medium text-sm'>
                  {item.date}
                </Text>
                <Text className='text-[#050402] font-medium text-base'>
                  {item.name}
                </Text>
              </View>
              <Text className='text-[#000] font-medium text-sm shrink-0'>
                {formatMoney(Number(item.amount), "₦")}
              </Text>
            </View>
          );
        }}
      />

      {currentTab === "pending" && (
        <Pressable
          onPress={handlePayNow}
          children={({ pressed }) => (
            <View
              className={`${
                pressed ? "opacity-50" : ""
              } rounded-full h-14 justify-center items-center border border-black bg-[#FFF6F4]`}
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
            isExternalDeficit={isExternalDeficit}
            externalDeficit={currentUser?.duesSum}
            close={() => fundWalletModalRef.current?.close()}
            type={isExternalDeficit ? "bill" : "wallet"}
          />
        }
      />
    </View>
  );
};

export default Bills;
