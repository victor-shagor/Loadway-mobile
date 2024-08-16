import {
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import LoadWayLogoDarkWordmark from "@/src/components/UserAuthentication/LoadWayLogoDarkWordmark";
import CustomText from "@/src/components/UserAuthentication/CustomText";
import {
  PasswordInput,
  EmailInput,
} from "@/src/components/UserAuthentication/Inputs";
import CustomCheckBox from "@/src/components/UserAuthentication/CustomCheckBox";
import ForgotPasswordBtn from "@/src/components/UserAuthentication/ForgotPasswordBtn";
import { PassWordManagementProps } from "@/src/utils/Types";
import AuthInputs from "@/src/utils/AuthInputValues";

const PassWordManagement = ({
  big_Text,
  small_text,
  btn_text,
  type,
  actionForCancelBtn,
  actionForSendBtn,
}: PassWordManagementProps) => {
  const inputValue = AuthInputs();
  const setCodeValue = (value: string) => {
    {
      const NewRestPasswordDetails = {
        ...inputValue.resetPassword,
        code: value,
      };
      inputValue.setResetPassword(NewRestPasswordDetails);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 0.1 }}>
        <View className=" h-screen ">
          <LoadWayLogoDarkWordmark />
          <CustomText heading={big_Text} sub_heading={small_text} />
          {type === "forgotpassword" && (
            <View className="mt-2">
              <TextInput
                placeholder="Enter Verfication code"
                placeholderTextColor={"black"}
                inputMode="numeric"
                enterKeyHint="enter"
                autoComplete="tel"
                className=" border-2 border-[#52514E4D] mx-[5vw] h-[43px] px-[5vw]
         rounded-lg
        "
                onChangeText={(value) => setCodeValue(value)}
              />
            </View>
          )}
          <View className=" my-6">
            <EmailInput action="resetpassword" />
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
            <PasswordInput action="resetpassword" />
          </View>
          <View className=" flex-row absolute bottom-[6%]">
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PassWordManagement;
