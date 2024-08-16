import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationStackParamList } from "@/src/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useOnboardingContext from "@/src/utils/Context";
import axios from "axios";
import { BaseUrl } from "@/src/utils/Base_url";
import { LoginUser } from "@/src/utils/AuthRoutes";






const LoginButton = () => {
  const navigation =
    useNavigation<StackNavigationProp<AuthenticationStackParamList>>();
  const [updatePasswordStatus, setUpdatePasswordStatus] =
    useState<keyof AuthenticationStackParamList>("updatepassword");

    const { loginDetails } = useOnboardingContext();

   

  const getData = async () => await AsyncStorage.getItem('');
  console.log(getData());
  
  const { setLogin } = useOnboardingContext();
 
  const clickBtn = async () => {
    try {
      if (!loginDetails.email && !loginDetails.password ) {
         return console.log('Show error screen');
         
      }
      const url = `${BaseUrl}${LoginUser}`
      const payload = loginDetails;
      console.log(url);
      const response = await axios.post(url , payload);
      const validateLogin = response.data.data.firstLogin;
      if (validateLogin) {
        navigation.navigate('updatepassword');
      }else{
        setLogin(true);
      }
      console.log(response.data.data.firstLogin)
    } catch (error) {
      console.log(`An error occured: ${error}`)
    }
  };

  return (
    <View className=" mx-5 bg-[#F6411B] h-[50px] rounded-lg">
      <TouchableOpacity onPress={clickBtn}>
        <View className="bg-[#F6411B] h-full flex-row justify-center items-center rounded-lg">
          <Text className=" font-semibold text-center text-white">Sign in</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoginButton;
