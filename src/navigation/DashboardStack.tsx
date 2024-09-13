import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, Entypo, Octicons, FontAwesome } from "@expo/vector-icons";
import { Host } from "react-native-portalize";
import { appColors } from "../constants/colors";

import {
  CancelEdit,
  GoToEditScreen,
  SaveEditedChanges,
  UserImage,
} from "@src/components/account/utils";
import Home from "@src/screens/home";
import Bills from "../screens/bills";
import Messages from "../screens/message";
import Profile from "../screens/profile";
import Emergency from "../screens/emergency";
import GateAccess from "../screens/gateAccess";
// import HouseBill from "@src/screens/bills/HouseBill";
import PaymentHistory from "@src/screens/bills/PaymentHistory";
import UserManagement from "@src/screens/userManagement";
import Account from "@src/screens/account";
import Settings from "@src/screens/settings";
import EditProfile from "@src/components/account/editProfile";
import NotificationsPreferences from "@src/components/settings/notifications";
import Communication from "@src/components/settings/communication";
import Security from "@src/components/settings/security";
import AppPreference from "@src/components/settings/appPreference";
import Support from "@src/components/settings/support";
import NewRequest from "@src/screens/NewRequest";
import { renderIcon } from "@src/components/common/renderIcon";
import UserNotifications from "@src/screens/notifications";
import EmergencyUI from "../screens/emergency";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export type BillsStackParamList = {
  HouseBill: any;
  PaymentHistory: any;
};

export type NewRequestStackParamList = {
  newrequest: any;
};

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
    <Host>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: appColors.white,
          tabBarLabel: () => null,
          tabBarStyle: styles.tabBarStyles,
          headerTitleAlign: "center",
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
            headerTitleAlign: "center",
          }}
          name="Bills"
          component={Bills}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ size, color, focused }) => (
              <CustomTabIcon active={focused}>
                <Ionicons
                  name="chatbubble-ellipses"
                  size={size}
                  color={color}
                />
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
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </Host>
  );
};

const DashboardStack = () => {
  const { height } = useWindowDimensions();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigation}
        options={{ headerShown: false, title: "" }}
      />

      <Stack.Group screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="Emergency"
          component={EmergencyUI}
          options={{ title: "Emergency", headerTitleAlign: "center", headerBackTitleVisible: false,
            headerTintColor: appColors.black }}
        />
        <Stack.Screen
          name="GateAccess"
          component={GateAccess}
          options={{
            title: "Gate Access",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
            headerTintColor: appColors.black,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => alert("I can do All things through christ")} // Should be removed or edited.
                style={{ marginRight: 15 }}
              >
                {renderIcon(
                  "filter-variant",
                  "MaterialCommunityIcons",
                  28,
                  appColors.black
                )}
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="newrequest"
          component={NewRequest}
          options={{ title: "New Request", headerTitleAlign: "center", headerBackTitleVisible: false,
            headerTintColor: appColors.black }}
        />
        {/* <Stack.Screen
          name="HouseBill"
          component={HouseBill}
          options={{ title: "Housing  bills", headerTitleAlign: 'center' }}
        /> */}
        <Stack.Screen
          name="PaymentHistory"
          component={PaymentHistory}
          options={{ title: "Payment History" }}
        />

        <Stack.Screen
          name="UserNotifications"
          component={UserNotifications}
          options={{ title: "Notifications" }}
        />

        <Stack.Group>
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerStyle: { height: height * 0.15 },
              headerTitle: () => <UserImage />,
              headerRight: () => <GoToEditScreen />,
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              title: "Edit Profile",
              headerLeft: () => <CancelEdit />,
              headerRight: () => <SaveEditedChanges />,
            }}
          />
        </Stack.Group>

        <Stack.Screen
          name="UserManagement"
          component={UserManagement}
          options={{ title: "UserManagement" }}
        />

        {/* PROFILE SETTINGS */}
        <Stack.Group>
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ title: "Settings" }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsPreferences}
            options={{ title: "Notifications Preferences" }}
          />
          <Stack.Screen
            name="Communication"
            component={Communication}
            options={{ title: "Communication Preferences" }}
          />
          <Stack.Screen
            name="Security"
            component={Security}
            options={{ title: "Password & Security" }}
          />
          <Stack.Screen
            name="AppPreferences"
            component={AppPreference}
            options={{ title: "App Preferences" }}
          />
          <Stack.Screen
            name="Support"
            component={Support}
            options={{ title: "Help & Support" }}
          />
        </Stack.Group>
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
