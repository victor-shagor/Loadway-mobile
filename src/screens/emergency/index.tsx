

import React from "react";
import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { appColors } from "@src/constants/colors";
import { ThemedText } from "@src/components/ThemedText";
import EmergencyContact from "@src/components/Emergency/EmergencyContact";
import ReportEmergency from "@src/components/Emergency/ReportEmergency";

const Tab = createMaterialTopTabNavigator();

const CustomTabLabel = ({
  children,
  active,
}: {
  active: boolean;
  children: React.ReactNode;
}) => {
  return (
    <View
      style={[
        styles.tabBarItemStyle,
        {
          backgroundColor: active ? appColors.white : "transparent",
        },
      ]}
    >
      {children}
    </View>
  );
};

const EmergencyUI = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { display: "none" },
        tabBarStyle: [styles.tabScreenStyles],
      }}
      sceneContainerStyle={{ padding: 12 }}
    >
      <Tab.Screen
        name="emergency_contact"
        component={EmergencyContact}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel active={focused}>
              <ThemedText
                type="title"
                style={{ color: focused ? appColors.orange : appColors.black }}
              >
                Emergency Contact
              </ThemedText>
            </CustomTabLabel>
          ),
        }}
      />
      <Tab.Screen
        name="report_emergency"
        component={ReportEmergency}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel active={focused}>
              <ThemedText
                type="title"
                style={{ color: focused ? appColors.orange : appColors.black }}
              >
                Report Emergency
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
    backgroundColor: appColors.offWhite,
    margin: 10,
  },
  tabBarItemStyle: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: 189,
    borderRadius: 8,
    padding: 6,
    paddingVertical: 9,
    fontWeight: 600,
    fontSize: 8,
  },
});

export default EmergencyUI;


