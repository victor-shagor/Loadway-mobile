import useOnboardingContext from "@src/utils/Context";
import React, { useRef } from "react";
import { View, Text, Pressable } from "react-native";
import CustomModal from "../CustomModal";
import { Modalize } from "react-native-modalize";
import FundWalletModal from "@src/screens/modals/fundWallet";
import { formatMoney } from "@src/utils/helper";
import Pay from "@src/screens/modals/fundWallet/paystackWebView";

const Cards = () => {
  const { currentUser } = useOnboardingContext();
  const walletRef = useRef<Modalize>(null);
  const [paymentAmount, setPaymentAmount] = React.useState(0);
  const [ref, setRef] = React.useState("");

  const handlePay = (amount: number, ref: string) => {
    setPaymentAmount(amount);
    setRef(ref);
  };

  const handleCancel = () => {
    walletRef.current?.close();
    setPaymentAmount(0);
    setRef("");
  };

  if (paymentAmount > 0 && ref !== "") {
    return (
      <Pay
        close={handleCancel}
        amount={paymentAmount}
        payStackKey='sk_live_a6115d0b2a1fac26e17d15627d6fb0358deba238'
        reference={ref}
        onSuccess={handleCancel}
      />
    );
  }

  return (
    <View className='bg-[#050402] rounded-2xl overflow-hidden h-60'>
      <View className='flex-1 p-6 gap-3'>
        <Text className='text-white text-base font-medium'>Wallet balance</Text>
        <Text className='text-white text-[40px] leading-[52px] font-medium'>
          {formatMoney(Number(currentUser?.wallet?.balance || 0), "₦")}
        </Text>
        <View className='self-start'>
          <View>
            <Pressable
              className='self-start'
              onPress={() => walletRef.current?.open()}
            >
              {({ pressed }) => (
                <View
                  className={`${
                    pressed ? "opacity-50" : "opacity-100"
                  } h-12 w-36 rounded-full bg-[#F6411B] justify-center items-center`}
                >
                  <Text className='text-white text-xl font-medium'>
                    Fund Wallet
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </View>
      <View className='bg-[#310D05] h-10 justify-center items-center'>
        <Text className='text-white font-medium text-base'>
          Total due bills: {formatMoney(Number(currentUser?.duesSum || 0), "₦")}
        </Text>
      </View>
      <CustomModal
        modalizeRef={walletRef}
        modalContent={
          <FundWalletModal
            close={() => walletRef.current?.close()}
            type='wallet'
            handlePay={handlePay}
          />
        }
      />
    </View>
  );
};

export default Cards;
