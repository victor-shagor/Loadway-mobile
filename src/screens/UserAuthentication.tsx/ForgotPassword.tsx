import { View, Text, Image } from "react-native";
import React from "react";
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
