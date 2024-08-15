import { View, Text } from "react-native";
import React from "react";
import Login from "../screens/UserAuthentication.tsx/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VerifyEmail from "../screens/UserAuthentication.tsx/VerifyEmail.com";
import { NavigatorScreenParams } from "@react-navigation/native";
import ForgotPassword from "../screens/UserAuthentication.tsx/ForgotPassword";
import UpdatePassword from "../screens/UserAuthentication.tsx/UpdatePassword";
import { useOnboarding } from "../hooks/isFirstLaunch";
import DashboardStack from "./DashboardStack";
import { SafeAreaView } from "../components/layout/safeAreaView";

// useOnboardi

export type AuthenticationStackParamList = {
  login: any;
  forgotpassword: any;
  updatepassword: any;
  // verify: any;
};

const Stack = createNativeStackNavigator<AuthenticationStackParamList>();
const UserAuthentication = () => {
  const context = useOnboarding()!;
  const { login } = context;
  // if (login) {
  //   <DashboardStack />;
  // }
  return (
    <SafeAreaView>
      {login ? (
        <DashboardStack />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="login" component={Login} />
          {/* <Stack.Screen name='verify' component={VerifyEmail}/> */}
          <Stack.Screen name="forgotpassword" component={ForgotPassword} />
          <Stack.Screen name="updatepassword" component={UpdatePassword} />
        </Stack.Navigator>
      )}
    </SafeAreaView>
  );
};

export default UserAuthentication;
