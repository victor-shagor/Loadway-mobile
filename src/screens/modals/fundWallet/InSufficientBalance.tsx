import { Image, Pressable, Text, View } from "react-native";
import React from "react";
import images from "@src/constants/images";
import { formatMoney } from "@src/utils/helper";
import useOnboardingContext from "@src/utils/Context";

type InSufficientBalanceProps = {
  handleAddFunds: () => void;
  handleBuy: () => void;
  deficit: number;
  isExternalDeficit?: boolean;
};

const InSufficientBalance = ({
  handleAddFunds,
  handleBuy,
  deficit,
  isExternalDeficit,
}: InSufficientBalanceProps) => {
  const { currentUser } = useOnboardingContext();

  return (
    <View style={{ gap: 20 }}>
      <View className='w-14 h-14 justify-center items-center self-center'>
        <Image
          source={
            isExternalDeficit
              ? images.bills.filledWalletIcon
              : images.quickLInks.electricity
          }
          className="h-full w-full"
        />
        <View className='absolute justify-center items-center -top-3 -right-3 w-10 h-10 rounded-full bg-[#FFC7C4]'>
          <Text className='items-center justify-center text-[#CF1919] font-medium text-4xl'>
            !
          </Text>
        </View>
      </View>
      <View>
        <Text className='text-black text-2xl font-medium pb-1.5 text-center'>
          INSUFFICIENT BALANCE
        </Text>
        <Text className='font-medium text-center text-lg text-[#050402]/50'>
          Your wallet balance is insufficient for the top up amount. Choose an
          option to proceed
        </Text>
      </View>
      <View style={{ gap: 16 }}>
        <Pressable
          onPress={handleAddFunds}
          children={({ pressed }) => (
            <View
              className={`${
                pressed ? "opacity-50" : ""
              } rounded-full h-16 justify-center items-center border-2 border-black bg-[#FFF6F4]`}
            >
              <Text className='text-center font-medium text-base text-[#E85637]'>
                {`Add ${formatMoney(deficit, "₦")} to wallet`}
              </Text>
            </View>
          )}
        />
        <Pressable
          onPress={handleBuy}
          disabled={currentUser?.wallet?.balance === 0}
          children={({ pressed }) => (
            <View
              className={`${
                currentUser?.wallet?.balance === 0
                  ? "opacity-50"
                  : pressed
                  ? "opacity-50"
                  : ""
              } rounded-full h-16 justify-center items-center border-2 border-black bg-[#FFF6F4]`}
            >
              <Text className='text-center font-medium text-base text-[#E85637]'>
                {`${isExternalDeficit ? 'Pay' : 'Buy'} ${formatMoney(
                  Number(currentUser?.wallet.balance || 0),
                  "₦"
                )} instead`}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default InSufficientBalance;