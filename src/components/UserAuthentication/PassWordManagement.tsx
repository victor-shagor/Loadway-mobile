import { View, Text, Image } from "react-native";
import React from "react";
import LoadWayLogoDarkWordmark from "@/src/components/UserAuthentication/LoadWayLogoDarkWordmark";
import CustomText from "@/src/components/UserAuthentication/CustomText";
import { PasswordInput } from "@/src/components/UserAuthentication/Inputs";
import CustomCheckBox from "@/src/components/UserAuthentication/CustomCheckBox";
import ForgotPasswordBtn from "@/src/components/UserAuthentication/ForgotPasswordBtn";
import { PassWordManagementProps } from "@/src/utils/Types";



const PassWordManagement = ({
  big_Text,
  small_text,
  btn_text,
  type,
  actionForCancelBtn,
  actionForSendBtn
}: PassWordManagementProps) => {

    console.log(actionForCancelBtn,actionForSendBtn)
  return (
    <View>
      <LoadWayLogoDarkWordmark />
      <CustomText
        heading={big_Text}
        sub_heading={small_text}
      />
      <View className=" my-6">
        <PasswordInput />
      </View>
      <View className="">
        <View className=" flex-row">
          <CustomCheckBox text="Atleast 8 characters" width={45} />
          <CustomCheckBox text="Upper case" width={45} />
        </View>
        <View className=" flex-row">
          <CustomCheckBox text="Atleast 1 number" width={45} />
          <CustomCheckBox text="Lowercase" width={45} />
        </View>
      </View>
      <View className=" my-2">
        <PasswordInput />
      </View>
      <View className=" flex-row absolute bottom-[-37vh]">
        <ForgotPasswordBtn
          bg_color="#F6411B1A"
          border_color="#CD361633"
          text_color="#CD3616"
          text="Cancel"
          type={type}
          action={actionForCancelBtn}
        />
        <ForgotPasswordBtn
          bg_color="#F6411B"
          border_color="#F6411B"
          text_color="#FFFFFF"
          text={btn_text}
          type={type}
          action={actionForSendBtn}
        />
      </View>
    </View>
  );
};

export default PassWordManagement;
