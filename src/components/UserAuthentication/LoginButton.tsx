import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationStackParamList } from "@src/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useOnboardingContext from "@src/utils/Context";
import axios from "axios";
import Toast from "react-native-toast-message";
import { BaseUrl } from "@src/utils/Base_url";
import { LoginUser } from "@src/utils/APIRoutes";
import { getCurrentUser } from "@src/api/user";

const LoginButton = () => {
  const navigation =
    useNavigation<StackNavigationProp<AuthenticationStackParamList>>();
  const [updatePasswordStatus, setUpdatePasswordStatus] =
    useState<keyof AuthenticationStackParamList>("updatepassword");

  const [loading, setLoading] = useState(false);
  const { loginDetails, setCurrentUser, setLogin } = useOnboardingContext();

  const getData = async () => await AsyncStorage.getItem("");

  const clickBtn = async () => {
    try {
      setLoading(true);
      if (!loginDetails.email && !loginDetails.password) {
        return console.log("Show error screen");
      }
      const url = `${BaseUrl}${LoginUser}`;
      const payload = loginDetails;
      console.log(payload)
      const response = await axios.post(url, payload);
      await AsyncStorage.setItem(
        "accessToken",
        response.data?.data?.accessToken
      );
      const validateLogin = response.data?.data?.firstLogin;
      const currentUser = await getCurrentUser();
      setCurrentUser(currentUser);
      if (validateLogin) {
        setLoading(false);
        navigation.navigate("updatepassword");
      } else {
        setLoading(false);
        setLogin(true);
      }
      // console.log(response.data.data.firstLogin);
    } catch (error: any) {
      console.log("Error", error.response);
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Incorrect email or password",
      });
    }
  };


  return (
    <View className=" mx-5 bg-[#F6411B] h-[50px] rounded-lg">
      <TouchableOpacity onPress={clickBtn} disabled={loading}>
        <View className="bg-[#F6411B] h-full flex-row justify-center items-center rounded-lg">
          <Text className=" font-semibold text-center text-white">Sign in</Text>
          {loading && (
            <ActivityIndicator
              size="small"
              color="#fff"
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoginButton;
