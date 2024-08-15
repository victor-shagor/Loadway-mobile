import { View, Text, Image } from "react-native";
import React from "react";
import LoadWayLogoDarkWordmark from "@/src/components/UserAuthentication/LoadWayLogoDarkWordmark";
import CustomText from "@/src/components/UserAuthentication/CustomText";
import { PasswordInput } from "@/src/components/UserAuthentication/Inputs";
import CustomCheckBox from "@/src/components/UserAuthentication/CustomCheckBox";
import ForgotPasswordBtn from "@/src/components/UserAuthentication/ForgotPasswordBtn";
import PassWordManagement from "@/src/components/UserAuthentication/PassWordManagement";

const icon = require("@/src/assets/icons/LoadWayLogoDarkWordmark.png");
const ForgotPassword = () => {
  return (
    <View>
      <PassWordManagement
        big_Text="Reset Password"
        small_text="Please enter the verification code sent to  davidloadways@gmail.com"
        btn_text="send"
        type="forgotpassword"
        actionForCancelBtn="backToLogin"
        actionForSendBtn="resetpassword"
      />
    </View>
  );
};

export default ForgotPassword;
