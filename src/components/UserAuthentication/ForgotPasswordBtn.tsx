import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationStackParamList } from "@/src/navigation/UserAuthentication";
import { useOnboarding } from "@/src/hooks/isFirstLaunch";
import useOnboardingContext from "@/src/utils/Context";
import { ForgotPasswordBtnProps } from "@/src/utils/Types";
import axios from "axios";
import { BaseUrl } from "@/src/utils/Base_url";
import { requestPasswordChange, ChangePassword } from "@/src/utils/AuthRoutes";
import AuthInputs from "@/src/utils/AuthInputValues";


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
    

  const { setLogin } = useOnboardingContext();
  const inputValue = AuthInputs();

  const CancelBtnHandler = async () => {
    if (type === "modal" && action === "cancelModal") {
      if (setModalVisible) {
        setModalVisible(false);
      }
    } else if (type === "modal" && action === "sendEmailToBackend") {
      try {
        const url = `${BaseUrl}${requestPasswordChange}`;
        const payload = inputValue.changePasswordDetails;
        const sendEmailToBackend = await axios.post(url, payload);
        if (setModalVisible) {
          setModalVisible(false);
        };
        const successmessage = sendEmailToBackend.data.success ;
        if (successmessage) {
          navigation.navigate("forgotpassword");
        } else console.log("An error occurred");
      } catch (error) {
        console.log(error);
      }
    } else if (type === "forgotpassword" && action === "backToLogin") {
      // I perform other unique functions
      navigation.navigate("login");
    } else if (type === "forgotpassword" && action === "resetpassword") {
      try {
        const url = `${BaseUrl}${ChangePassword}`;
        const payload = inputValue.resetPassword;
        console.log(payload)
        const resetPassword = await axios.patch(url, payload);
        console.log(resetPassword.data.success)
        if (resetPassword) {
          setLogin(true);
        } else console.log("An error occurred");
      } catch (error) {
        console.log(error);
      }
    } else if (type === "updatepasword" && action === "backToLogin") {
      // I perform other unique functions
      navigation.navigate("login");
    } else if (type === "updatepasword" && action === "savepassword") {
      // I perform other unique functions
      navigation.navigate("login");
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
