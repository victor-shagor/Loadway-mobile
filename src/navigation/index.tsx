import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import DashboardStack from "./DashboardStack";

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <DashboardStack />
    </NavigationContainer>
  );
};

export default RootNavigation;
