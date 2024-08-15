import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, Entypo, Octicons, FontAwesome } from "@expo/vector-icons";
import { appColors } from "@src/constants/colors";
import Home from "../screens/home";
import Bills from "../screens/bills";
import Messages from "../screens/message";
import Account from "../screens/account";
import FundWalletModal from "@src/screens/modals/fundWallet";
import BuyElectricity from "@src/screens/modals/electricity";
import Emergency from "@src/screens/emergency";
import GateAccess from "@src/screens/gateAccess";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabIcon = ({
  children,
  active,
}: {
  active: boolean;
  children: React.ReactNode;
}) => {
  return (
    <View
      style={[
        styles.iconContainer,
        { backgroundColor: active ? appColors.orange : appColors.white },
      ]}
    >
      {children}
    </View>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: appColors.white,
        tabBarLabel: () => null,
        tabBarStyle: styles.tabBarStyles,
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <CustomTabIcon active={focused}>
              <Entypo name="home" size={size} color={color} />
            </CustomTabIcon>
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <CustomTabIcon active={focused}>
              <Octicons name="credit-card" size={size} color={color} />
            </CustomTabIcon>
          ),
        }}
        name="Bills"
        component={Bills}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <CustomTabIcon active={focused}>
              <Ionicons name="chatbubble-ellipses" size={size} color={color} />
            </CustomTabIcon>
          ),
        }}
        name="Message"
        component={Messages}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <CustomTabIcon active={focused}>
              <FontAwesome name="user" size={size} color={color} />
            </CustomTabIcon>
          ),
        }}
        name="Account"
        component={Account}
      />
    </Tab.Navigator>
  );
};

const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigation}
        options={{ headerShown: false, title: "" }}
      />

      <Stack.Group>
        <Stack.Screen
          name="Emergency"
          component={Emergency}
          options={{ title: "Emergency" }}
        />
        <Stack.Screen
          name="GateAccess"
          component={GateAccess}
          options={{ title: "Gate Access" }}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="FundWallet"
          component={FundWalletModal}
          options={{ title: "Fund Wallet" }}
        />
        <Stack.Screen
          name="Electricity"
          component={BuyElectricity}
          options={{ title: "Buy Electricity" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyles: {
    height: 100,
    paddingBottom: 10,
    backgroundColor: appColors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 0,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: appColors.orange,
    borderRadius: 50,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default DashboardStack;
