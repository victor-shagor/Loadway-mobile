import { View, Text, Image } from "react-native";
import React from "react";
import VerifyEmailInput from "@src/components/UserAuthentication/VerifyEmailInput";
import VerifyEmailButton from "@src/components/UserAuthentication/VerifyEmailButton";
import { SafeAreaView } from "@src/components/layout/safeAreaView";
import images from "@src/constants/images";



const VerifyEmail = () => {
  return (
    <SafeAreaView>
      <View className=" p-5">
        <Image source={images.onboarding.verifyIcon} />
      </View>
      <View>
        <Text 
         className=" text-[#191508] text-[18px] font-medium 
         text-center mt-[3vh]
         ">
          Verify your Email
        </Text>
        <Text 
         className=" text-[#191508] text-[14px] font-normal 
         text-center mt-[3vh] leading-[21px]
         ">
          Please enter the verification code sent to {'\n'} davidloadways@gmail.com
        </Text>
      </View>
      <View>
        <VerifyEmailInput />
      </View>
      <View>
       <VerifyEmailButton />
      </View>
      <View className=" flex-row justify-center my-5">
        <Text className="font-semibold text-[14px]">Already have an account?</Text>
        <Text className=" text-[#F76141] font-semibold text-[14px]">Resend code</Text>
      </View>
    </SafeAreaView>
  );
};

export default VerifyEmail;
