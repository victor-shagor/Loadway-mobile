import { View, Text } from "react-native";
import React from "react";
import PassWordManagement from "@src/components/UserAuthentication/PassWordManagement";
import { SafeAreaView } from "@src/components/layout/safeAreaView";

const UpdatePassword = () => {
  return (
    <SafeAreaView>
      <PassWordManagement
        big_Text="Update Password"
        small_text="Please update you password"
        btn_text="Save"
        type="updatepasword"
        actionForCancelBtn="backToLogin"
        actionForSendBtn="savepassword"
      />
    </SafeAreaView>
  );
};

export default UpdatePassword;
