import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { appColors } from "@src/constants/colors";
import { ThemedText } from "@src/components/ThemedText";
import { Tab, CustomTabLabel } from "../message";
import GeneralNotifications from "@src/components/notifications/general";
import UserAlerts from "@src/components/notifications/alerts";

const UserNotifications = () => {
  const { height } = useWindowDimensions();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { display: "none" },
        tabBarStyle: [styles.tabScreenStyles, { height: height * 0.05 }],
      }}
      sceneContainerStyle={{ padding: 12 }}
    >
      <Tab.Screen
        name="Notifications"
        component={GeneralNotifications}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel active={focused}>
              <ThemedText
                type="title"
                style={{ color: focused ? appColors.orange : appColors.black }}
              >
                General
              </ThemedText>
            </CustomTabLabel>
          ),
        }}
      />
      <Tab.Screen
        name="Alerts"
        component={UserAlerts}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel active={focused}>
              <ThemedText
                type="title"
                style={{ color: focused ? appColors.orange : appColors.black }}
              >
                Alerts
              </ThemedText>
            </CustomTabLabel>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabScreenStyles: {
    borderRadius: 10,
    backgroundColor: appColors.gray,
    margin: 10,
  },
});

export default UserNotifications;
