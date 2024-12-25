import { View } from "react-native";
import React, { JSXElementConstructor, ReactNode } from "react";
import Login from "../screens/UserAuthentication.tsx/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "../screens/UserAuthentication.tsx/ForgotPassword";
import UpdatePassword from "../screens/UserAuthentication.tsx/UpdatePassword";
import DashboardStack from "./DashboardStack";
import { useOnboarding } from "@src/context/onboarding";
import SendResetEmail from "@src/screens/UserAuthentication.tsx/SendResetEmail";
import ResetPassword from "@src/screens/UserAuthentication.tsx/ResetPassword";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "@src/components/common/AppHeader";

export type AuthenticationStackParamList = {
  login: any;
  forgotpassword: any;
  updatepassword: any;
  sendresetemail: any;
  resetpassword: any;
  // verify: any;
};

type ScreenProps = {
  name: keyof AuthenticationStackParamList;
  component: any;
  showHeader: boolean;
  title?: string;
  leftIcon?: string;
  rightIcon?: string;
};

const Stack = createNativeStackNavigator<AuthenticationStackParamList>();
const UserAuthentication = () => {
  const navigation = useNavigation();
  const context = useOnboarding()!;
  const { login } = context;

  if (login) {
    return <DashboardStack />;
  }

  const screens: ScreenProps[] = [
    {
      name: "login",
      component: Login,
      showHeader: false,
    },
    {
      name: "sendresetemail",
      component: SendResetEmail,
      showHeader: true,
      leftIcon: "arrow-left",
    },
    {
      name: "resetpassword",
      component: ResetPassword,
      showHeader: true,
      leftIcon: "arrow-left",
    },
    {
      name: "forgotpassword",
      component: ForgotPassword,
      showHeader: false,
    },
    {
      name: "updatepassword",
      component: UpdatePassword,
      showHeader: false,
    },
  ];

  const gotoRoute = () => {
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              headerShown: screen.showHeader,
              headerShadowVisible: false,
              header: () => (
                <AppHeader
                  title={screen.title}
                  leftIcon={screen.leftIcon}
                  rightIcon={screen.rightIcon}
                  handleLeftBtnPress={gotoRoute}
                />
              ),
              headerBackVisible: false,
            }}
          />
        ))}
      </Stack.Navigator>
    </View>
  );
};

export default UserAuthentication;
