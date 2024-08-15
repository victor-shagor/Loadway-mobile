import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationStackParamList } from "@/src/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useOnboardingContext from "@/src/utils/Context";


const LoginButton = () => {
  const navigation =
    useNavigation<StackNavigationProp<AuthenticationStackParamList>>();
  const [updatePasswordStatus, setUpdatePasswordStatus] =
    useState<keyof AuthenticationStackParamList>("updatepassword");

  const [userHasUpdatedPassword, setUserHasUpdatedPassword] = useState(false);
   

  const getData = async () => await AsyncStorage.getItem('');
  console.log(getData());
  
  const { setLogin } = useOnboardingContext();

  const clickBtn = async () => {
    console.log(userHasUpdatedPassword,"breaking news");
    if (userHasUpdatedPassword) {
      setLogin(true);
    } else {
      navigation.navigate('updatepassword');
    }
  };

  useEffect(() => {
    // AsyncStorage.clear();
    const hasUserUpadatePassword = async () => {
      try {
        const userStatus = await AsyncStorage.getItem("updatedPassword");
        if (!userStatus) {
          setUserHasUpdatedPassword(false);
           await AsyncStorage.setItem(
            "updatedPassword",
            "true"
          );
        } else {
          setUserHasUpdatedPassword(true);
        }
      } catch (error) {
        console.error("Error retrieving password status:", error);
      }
    };
    hasUserUpadatePassword();
  }, []);

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
