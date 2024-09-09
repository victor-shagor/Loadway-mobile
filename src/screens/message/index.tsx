import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { appColors } from "@src/constants/colors";
import { ThemedText } from "@src/components/ThemedText";
import Chat from "@src/components/message/chat";
import Complaints from "@src/components/message/complaints";

export const Tab = createMaterialTopTabNavigator();

export const CustomTabLabel = ({
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

const Messages = () => {
  const { height } = useWindowDimensions();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { display: "none" },
        tabBarStyle: [styles.tabScreenStyles],
      }}
      sceneContainerStyle={{ padding: 12 }}
    >
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel active={focused}>
              <ThemedText
                type="title"
                style={{ color: focused ? appColors.orange : appColors.black }}
              >
                Chat
              </ThemedText>
            </CustomTabLabel>
          ),
        }}
      />
      <Tab.Screen
        name="Complaint"
        component={Complaints}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel active={focused}>
              <ThemedText
                type="title"
                style={{ color: focused ? appColors.orange : appColors.black }}
              >
                Complaint
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
  tabBarItemStyle: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: 175,
    borderRadius: 8,
    padding: 4,
  },
});

export default Messages;
