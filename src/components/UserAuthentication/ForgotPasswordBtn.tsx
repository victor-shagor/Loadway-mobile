import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationStackParamList } from "@/src/navigation/UserAuthentication";
import { useOnboarding } from "@/src/hooks/isFirstLaunch";
import useOnboardingContext from "@/src/utils/Context";
import { ForgotPasswordBtnProps } from "@/src/utils/Types";



const ForgotPasswordBtn = ({
  bg_color,
  border_color,
  text_color,
  text,
  type,
  setModalVisible,
  action,
}:ForgotPasswordBtnProps ) => {

    const navigation =
    useNavigation<StackNavigationProp<AuthenticationStackParamList>>();

    const {setLogin} = useOnboardingContext();

  const CancelBtnHandler = () => {
    if (type === "modal" && action === "cancelModal") {
      if (setModalVisible) {
        // I perform other unique functions
        setModalVisible(false);
      }
    }else if(type === "modal" && action === "sendEmailToBackend"){
        if (setModalVisible) {
            // I perform other unique functions
            setModalVisible(false);
          }
        navigation.navigate('forgotpassword');
    }else if(type === "forgotpassword" && action === "backToLogin"){
        // I perform other unique functions
        navigation.navigate('login');
    }else if(type === "forgotpassword" && action === "resetpassword"){
        // I perform other unique functions
        setLogin(true);
    }else if(type === "updatepasword" && action === "backToLogin"){
        // I perform other unique functions
        navigation.navigate('login');
    }else if(type === "updatepasword" && action === "savepassword"){
        // I perform other unique functions
        navigation.navigate('login');
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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={CancelBtnHandler}
        >
          <View
            className={`h-full flex-row justify-center items-center rounded-lg `}
            style={{
                backgroundColor: bg_color,
            }}
          >
            <Text className={`font-semibold text-center`}
            style={{ color: text_color}}
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
