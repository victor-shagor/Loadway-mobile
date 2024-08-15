import { View, Text } from "react-native";
import React from "react";
import PassWordManagement from "@/src/components/UserAuthentication/PassWordManagement";

const UpdatePassword = () => {
  return (
    <View>
      <PassWordManagement
        big_Text="Update Password"
        small_text="Please enter the verification code sent to  davidloadways@gmail.com"
        btn_text="Save"
        type="updatepasword"
        actionForCancelBtn="backToLogin"
        actionForSendBtn="savepassword"
      />
    </View>
  );
};

export default UpdatePassword;
