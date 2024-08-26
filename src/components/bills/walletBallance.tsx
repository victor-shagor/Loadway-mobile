import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "@src/constants/images";

const WalletBallance = () => {
  return (
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
        {/* -------------- */}
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
  );
};

export default WalletBallance;
