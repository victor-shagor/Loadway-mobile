import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { registerRootComponent } from "expo";
import RootNavigation from "./navigation";

import { SafeAreaProvider } from "react-native-safe-area-context";
import {  useState } from "react";
import OnboardingContext from "./hooks/isFirstLaunch";

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [color, setColor] = useState<string>('#CECAC3');
  const [login, setLogin] = useState<boolean>(false);

  return (
    <>
      <OnboardingContext.Provider value={{ setIsFirstLaunch, isFirstLaunch, color, setColor,login, setLogin}}>
        <SafeAreaProvider>
          <RootNavigation />
        </SafeAreaProvider>
      </OnboardingContext.Provider>
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
