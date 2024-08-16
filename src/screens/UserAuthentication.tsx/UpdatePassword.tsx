import { View, Text } from "react-native";
import React from "react";
import PassWordManagement from "@/src/components/UserAuthentication/PassWordManagement";

const UpdatePassword = () => {
  return (
    <View>
      <PassWordManagement
        big_Text="Update Password"
        small_text="Please update you password"
        btn_text="Save"
        type="updatepasword"
        actionForCancelBtn="backToLogin"
        actionForSendBtn="savepassword"
      />
    </View>
  );
};

export default UpdatePassword;
