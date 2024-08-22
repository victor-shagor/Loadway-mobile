import { View, Text } from "react-native";
import React from "react";
import Login from "../screens/UserAuthentication.tsx/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "../screens/UserAuthentication.tsx/ForgotPassword";
import UpdatePassword from "../screens/UserAuthentication.tsx/UpdatePassword";
import DashboardStack from "./DashboardStack";
import { SafeAreaView } from "@src/components/layout/safeAreaView";
import { useOnboarding } from "@src/context/onboarding";





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
  if (login) {
    <DashboardStack />;
  }
  return (
    <View style={{flex: 1}}>
      {login ? (
        <DashboardStack />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="forgotpassword" component={ForgotPassword} />
          <Stack.Screen name="updatepassword" component={UpdatePassword} />
        </Stack.Navigator>
      )}
    </View>         
  );
};

export default UserAuthentication;
