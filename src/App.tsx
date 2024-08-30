// import "expo-router/entry"
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { registerRootComponent } from "expo";
import RootNavigation from "./navigation";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import { User } from "./models/User";
import OnboardingContext from "./context/onboarding";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [color, setColor] = useState<string>("#CECAC3");
  const [login, setLogin] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [payBillModal, setPayBillModal] = useState<boolean>(false);
  const [loginDetails, setLoginDetails] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [changePasswordDetails, setChangePasswordDetails] = useState<{
    email: string;
  }>({ email: "" });
  const [resetPassword, setResetPassword] = useState<{
    email: string;
    initialLogin: boolean;
    code: string;
    newPassword: string;
  }>({
    email: "",
    initialLogin: true,
    code: "",
    newPassword: "",
  });

  return (
    <>
      <OnboardingContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          setIsFirstLaunch,
          isFirstLaunch,
          color,
          setColor,
          login,
          setLogin,
          loginDetails,
          setLoginDetails,
          changePasswordDetails,
          setChangePasswordDetails,
          resetPassword,
          setResetPassword,
          payBillModal,
          setPayBillModal,
        }}
      >
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <RootNavigation />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </OnboardingContext.Provider>
      <Toast />
    </>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
