import { NavigationContainer } from "@react-navigation/native";
import DashboardStack from "./DashboardStack";

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <DashboardStack />
    </NavigationContainer>
  );
};


export default RootNavigation