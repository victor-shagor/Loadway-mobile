import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import images from "@src/constants/images";
import Button from "../home/Button";
import useOnboardingContext from "@src/utils/Context";
import CustomModal from "../CustomModal";
import FundWalletModal from "@src/screens/modals/fundWallet";
import { Modalize } from "react-native-modalize";



const WalletBallance = () => {
  const walletRef = useRef<Modalize>(null);
  const { currentUser } = useOnboardingContext();

  return (
    <>
    <View className="bg-[#050402] rounded-2xl m-[3%] h-[21vh] relative mt-0">
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
          &#8358;{currentUser?.wallet?.balance.toLocaleString("en-US") ?? 0}
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
        {/* <Button text="Pay Bills" /> */}
      </View>
    </View>
  </>
  );
};

export default WalletBallance;



<View
className="m-5 h-[20vh] rounded-2xl relative mt-0"
style={{ overflow: "hidden", backgroundColor: "rgba(65, 0,25, 0.9)" }}
>
<View className=" flex-row justify-between p-5">
  <View>
    <Text className="font-semibold text-md text-[#D9CCD1]">
      Wallet Balance
    </Text>
    <Text className="text-white font-extrabold text-2xl">
      N10,000.00
    </Text>
  </View>
  <View>
    <Image
      source={images.wallet.bitcoin}
      className=" absolute top-[-35] right-10"
    />
    <TouchableOpacity className=" bg-black px-3 py-2 rounded-3xl">
      <Text className=" text-white font-semibold text-[12px]">
        View Bills
      </Text>
    </TouchableOpacity>
  </View>
</View>

<View className=" flex-row justify-between px-5 ">
  <View
    className=" mb-5 py-2 px-4 rounded-lg"
    style={{
      backgroundColor: "rgba(192, 170,178, 0.1)",
      height: "83%",
    }}
  >
    <Text className="font-medium text-md text-[#D9CCD1]">
      Due Bills
    </Text>
    <Text className="text-white font-bold text-md">N200,000</Text>
  </View>
  <View>
    <Image
      source={images.wallet.walletIcon}
      className=" absolute top-[1.7vh] right-[-4vw]"
    />
  </View>
</View>
</View>
