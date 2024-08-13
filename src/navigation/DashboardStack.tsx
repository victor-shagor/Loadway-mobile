import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo, Octicons, FontAwesome } from "@expo/vector-icons";
import { appColors } from "@src/constants/colors";
import Home from "../screens/home";
import Bills from "../screens/bills";
import Messages from "../screens/message";
import Account from "../screens/account";

const Tab = createBottomTabNavigator();

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

const DashboardStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: appColors.white,
        tabBarLabel: () => null,
        tabBarStyle: {
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

const styles = StyleSheet.create({
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
