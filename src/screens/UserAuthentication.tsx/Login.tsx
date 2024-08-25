import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  EmailInput,
  PasswordInput,
} from "@src/components/UserAuthentication/Inputs";
import LoginButton from "@src/components/UserAuthentication/LoginButton";
import LoadWayLogoDarkWordmark from "@src/components/UserAuthentication/LoadWayLogoDarkWordmark";
import ResetPasswordModal from "@src/components/Modal/ResetPasswordModal";
import { SafeAreaView } from "@src/components/layout/safeAreaView";
import images from "@src/constants/images";

const Login = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const forgotPasswordHandler = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, height: "100%" }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 0.1 }}>
          <View className=" h-full flex-1">
            <View className="h-[40vh] w-full bg-[#FFF1C6] rounded-b-[70px] relative">
              <LoadWayLogoDarkWordmark />
              <View className=" flex-row items-end left-[20%] ml-[-10] absolute bottom-[0.1]">
                <Image source={images.onboarding.group} />
                <Image source={images.onboarding.group_one} />
                <Image source={images.onboarding.group_two} />
                <Image />
              </View>
            </View>
            <View>
              <Text className=" text-[#191508] py-10 text-center text-[18px] font-semibold">
                Welcome back, {"\n"} Let’s make your living experience {"\n"}{" "}
                awesome!
              </Text>
            </View>
            <View>
              <EmailInput action="setLoginEmail" />
              <PasswordInput action="setLoginEmail" />
            </View>
            <View>
              <TouchableOpacity onPress={forgotPasswordHandler}>
                <Text className=" text-[#F76141] my-2 text-right mr-[6vw]">
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <LoginButton />
            </View>
            <ResetPasswordModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
