import React from "react";
import PassWordManagement from "@src/components/UserAuthentication/PassWordManagement";
import { SafeAreaView } from "@src/components/layout/safeAreaView";

const ForgotPassword = () => {
  return (
    <SafeAreaView>
      <PassWordManagement
        big_Text="Reset Password"
        small_text="Please enter the verification code sent to you."
        // small_text="Please enter the verification code sent to  davidloadways@gmail.com"
        btn_text="send"
        type="forgotpassword"
        actionForCancelBtn="backToLogin"
        actionForSendBtn="resetpassword"
      />
    </SafeAreaView>
  );
};

export default ForgotPassword;
