import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import DashboardStack from "./DashboardStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Onboarding from "../screens/Onboarding/onboarding";
import { useOnboarding } from "../hooks/isFirstLaunch";
import { SafeAreaView } from "../components/layout/safeAreaView";
import UserAuthentication from "./UserAuthentication";
import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  login: undefined;
  verify: undefined;
};
export type AuthenticationStackParamList = {
  login: undefined;
  verify: undefined;
};

const RootNavigation = () => {
  const context = useOnboarding();

  const user = () => {
    AsyncStorage.getItem("alreadyLaunched").then((value:any) => {
      return value;
    });
  };

  useEffect(() => {
    const checkFirstLaunch = async () => {
      if (!context) {
        console.error("Onboarding context is not available.");
        throw new Error("Onboarding context is not available.");
        return;
      }

      const { setIsFirstLaunch } = context;

      await AsyncStorage.clear();
      try {
        const value = await AsyncStorage.getItem("alreadyLaunched");
        console.log(value, "value");
        if (value === null) {
          await AsyncStorage.setItem("alreadyLaunched", "true");
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error("Error checking first launch: ", error);
      }
    };

    checkFirstLaunch();
  }, []);

  if (!context) {
    return (
      <View>
        <Text>Loading context...</Text>
      </View>
    );
  }

  const { isFirstLaunch } = context;

  if (isFirstLaunch === null) {
    return (
      <SafeAreaView>
        <View className=" flex-1 text-center text-[40px]">
          <Text>Loading</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    // <NavigationContainer>
    //   <StatusBar style="dark" />
    //   <DashboardStack />
    // </NavigationContainer>
    <SafeAreaView>
      <NavigationContainer>
        {isFirstLaunch ? (
          <Onboarding />
        ) : (
          <>
          <UserAuthentication />
          <DashboardStack />
          </>
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default RootNavigation;
