import React, { useCallback } from "react";
import { StatusBar, StyleSheet, View, useWindowDimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { appColors } from "@src/constants/colors";
import { ThemedText } from "@src/components/ThemedText";
import All from "@src/components/GateAccess/All";
import Upcoming from "@src/components/GateAccess/Upcoming";
import Completed from "@src/components/GateAccess/Completed";
import { useFocusEffect } from "@react-navigation/native";



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

const GetAccessUI = () => {
  const { height } = useWindowDimensions();
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
    }, [])
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { display: "none" },
        tabBarStyle: [styles.tabScreenStyles],
      }}
      sceneContainerStyle={{ padding: 12 }}
    >
      <Tab.Screen
        name="all"
        component={All}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel active={focused}>
              <ThemedText
                type="title"
                style={{ color: focused ? appColors.orange : appColors.black }}
              >
                All
              </ThemedText>
            </CustomTabLabel>
          ),
        }}
      />
      <Tab.Screen
        name="upcoming"
        component={Upcoming}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel active={focused}>
              <ThemedText
                type="title"
                style={{ color: focused ? appColors.orange : appColors.black }}
              >
                Upcoming
              </ThemedText>
            </CustomTabLabel>
          ),
        }}
      />
      <Tab.Screen
        name="completed"
        component={Completed}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel active={focused}>
              <ThemedText
                type="title"
                style={{ color: focused ? appColors.orange : appColors.black }}
              >
                Completed
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
    width: 115,
    borderRadius: 8,
    padding: 4,
    fontWeight: 600,
    fontSize: 12,
  },
});

export default GetAccessUI;
