import useOnboardingContext from "@src/utils/Context";
import React, { useRef } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Button from "./Button";
import CustomModal from "../CustomModal";
import { Modalize } from "react-native-modalize";
import FundWalletModal from "@src/screens/modals/fundWallet";
import PayBillModal from "../bills/PayBillModal";


const { width: screenWidth } = Dimensions.get("window");

const Cards = () => {
  const { currentUser } = useOnboardingContext();
  const walletRef = useRef<Modalize>(null);
  const billRef = useRef<Modalize>(null);
  return (
    <>
      <View className="bg-[#050402] rounded-2xl">
        <View>
          <Text
            className=" font-normal text-[16px] text-white 
           px-[6%] pt-[5%]"
          >
            Wallet Balance
          </Text>
        </View>
        <View>
          <Text
            className=" font-semibold text-[28px] text-white
            px-[6%] pt-[4%] mb-[10%]"
          >
            &#8358;{currentUser?.wallet?.balance.toLocaleString() ?? 0}
          </Text>
        </View>
        <View className=" flex-row gap-5 px-[9%] pt-[2%]">
        <CustomModal
            modalTitle="Fund Wallet"
            modalizeRef={walletRef}
              triggerItem={
                <Button text="Fund Wallet" />
              }
              modalContent={<FundWalletModal close={()=>walletRef.current?.close()}/>}
            />
            <CustomModal
            modalTitle="Pay Bills"
            modalizeRef={billRef}
              triggerItem={
                <Button text="Pay Bills" />
              }
              modalContent={<PayBillModal close={()=>billRef.current?.close()}/>}
            />
        </View>
        <View className=" bg-[#310D05] mt-[5%] rounded-b-2xl">
          <Text
            className=" font-normal text-[14px] text-white text-center
            py-2
           "
          >
            Total amount of Due Bills: &#8358;{currentUser?.duesSum.toLocaleString() ?? 0}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Cards;