import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationStackParamList } from "@/src/navigation/UserAuthentication";
import { useOnboarding } from "@/src/hooks/isFirstLaunch";



const ForgotPasswordBtn = ({
  bg_color,
  border_color,
  text_color,
  text,
  type,
  setModalVisible,
  action,
}: {
  bg_color: string;
  border_color: string;
  text_color: string;
  text: string;
  type: string;
  action: string;
  setModalVisible?: (value: boolean) => void;
}) => {

    const navigation =
    useNavigation<StackNavigationProp<AuthenticationStackParamList>>();
    const context = useOnboarding()!;
    const {setLogin} = context;

  const CancelBtnHandler = () => {
    if (type === "modal" && action === "cancelModal") {
      if (setModalVisible) {
        setModalVisible(false);
      }
    }else if(type === "modal" && action === "sendEmailToBackend"){
        navigation.navigate('forgotpassword');
    }else if(type === "forgotpassword" && action === "backToLogin"){
        navigation.navigate('login');
        //backToLogin
    }else if(type === "forgotpassword" && action === "resetpassword"){
        setLogin(true);
        //resetpassword
    }
  };
  return (
    <View className="relative">
      <View
        className={`ml-5 bg-[${bg_color}] h-[50px] rounded-lg w-[43vw]
         border-2 border-[${border_color}] `}
      >
        <TouchableOpacity
          activeOpacity={100}
          onPress={CancelBtnHandler}
        >
          <View
            className={`bg-[${bg_color}] h-full flex-row justify-center items-center rounded-lg `}
          >
            <Text className={`font-semibold text-center text-[${text_color}]`}>
              {text}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordBtn;
