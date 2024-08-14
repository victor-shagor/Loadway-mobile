import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { EmailInput, PasswordInput } from "@/src/components/UserAuthentication/Inputs";
import LoginButton from "@/src/components/UserAuthentication/LoginButton";
import { useNavigation } from "@react-navigation/native";


const icon = require("@/src/assets/icons/LoadWayLogoDarkWordmark.png");
const group = require("@/src/assets/icons/Group.png");
const group_one = require("@/src/assets/icons/Group-1.png");
const group_two = require("@/src/assets/icons/Group-2.png");

const Login = () => {
    const navigation = useNavigation(); 

  return (
    <View>
      <View className="h-[40vh] w-full bg-[#FFF1C6] rounded-b-[70px] relative">
        <View className=" p-5">
          <Image source={icon} />
        </View>
        <View className=" flex-row items-end left-[20%] ml-[-10] absolute bottom-[0.1]">
          <Image source={group} />
          <Image source={group_one} />
          <Image source={group_two} />
          <Image />
        </View>
      </View>
      <View>
        <Text className=" text-[#191508] py-10 text-center text-[18px] font-semibold"
        >
          Welcome back, {"\n"} Let’s make your living experience {"\n"} awesome!
        </Text>
      </View>
      <View>
        <EmailInput />
        <PasswordInput />
      </View>
      <View>
        <TouchableOpacity>
            <Text className=" text-[#F76141] my-2 text-right mr-[6vw]">Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <View>
        <LoginButton />
      </View>
    </View>
  );
};

export default Login;
