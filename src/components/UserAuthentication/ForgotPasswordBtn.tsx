import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationStackParamList } from "@src/navigation/UserAuthentication";
import useOnboardingContext from "@src/utils/Context";
import { ForgotPasswordBtnProps } from "@src/utils/Types";
import axios from "axios";
import { BaseUrl } from "@src/utils/Base_url";
import { requestPasswordChange, ChangePassword } from "@src/utils/APIRoutes";
import AuthInputs from "@src/utils/AuthInputValues";
import Toast from "react-native-toast-message";

const ForgotPasswordBtn = ({
  bg_color,
  border_color,
  text_color,
  text,
  type,
  setModalVisible,
  action,
}: ForgotPasswordBtnProps) => {
  const navigation =
    useNavigation<StackNavigationProp<AuthenticationStackParamList>>();
  const { currentUser } = useOnboardingContext();

  const { setLogin } = useOnboardingContext();
  const inputValue = AuthInputs();

  const closeModal = () => {
    if (setModalVisible) {
      setModalVisible(false);
    }
  };

  const navigateTo = (route: "login" | "forgotpassword" | "updatepassword") => {
    navigation.navigate(route);
  };

  const handleSendEmail = async () => {
    try {
      if (!inputValue.changePasswordDetails.email) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: "Enter email",
        });
      }
      const url = `${BaseUrl}${requestPasswordChange}`;
      const payload = inputValue.changePasswordDetails;
      const response = await axios.post(url, payload);
      if (response.data.success) {
        closeModal();
        navigateTo("forgotpassword");
      } else {
        console.log("An error occurred");
      }
    } catch (error) {
      console.log(inputValue.changePasswordDetails.email)
      console.error("Error sending email:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occured, please try again.",
      });
    } finally {
      closeModal();
    }
  };

  const handleResetPassword = async (initialLogin = false) => {
    try {
      const url = `${BaseUrl}${ChangePassword}`;
      const payload = inputValue.resetPassword;
      console.log(payload)
      const response = await axios.patch(url, {
        ...payload,
        email: currentUser?.email,
        initialLogin,
      });
      if (response.data.success) {
        setLogin(true);
      } else {
        console.log("An error occurred");
      }
    } catch (error: any) {
      console.log(inputValue.resetPassword)
      console.error("Error resetting password:", error.response);
    }
  };

  const CancelBtnHandler = async () => {
    if (type === "modal" && action === "cancelModal") {
      closeModal();
    } else if (type === "modal" && action === "sendEmailToBackend") {
      await handleSendEmail();
    } else if (type === "forgotpassword" && action === "backToLogin") {
      navigateTo("login");
    } else if (type === "forgotpassword" && action === "resetpassword") {
      await handleResetPassword(false);
    } else if (type === "updatepasword" && action === "backToLogin") {
      navigateTo("login");
    } else if (type === "updatepasword" && action === "savepassword") {
      handleResetPassword(true);
    }
  };

  return (
    <View className="relative">
      <View
        className={`ml-5 h-[50px] rounded-lg w-[43vw]
         border-2 `}
        style={{
          backgroundColor: bg_color,
          borderColor: border_color,
        }}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={CancelBtnHandler}>
          <View
            className={`h-full flex-row justify-center items-center rounded-lg `}
            style={{
              backgroundColor: bg_color,
            }}
          >
            <Text
              className={`font-semibold text-center`}
              style={{ color: text_color }}
            >
              {text}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordBtn;
