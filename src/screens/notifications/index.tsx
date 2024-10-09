import React, { useEffect } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { appColors } from "@src/constants/colors";
import { ThemedText } from "@src/components/ThemedText";
import { Tab, CustomTabLabel } from "../message";
import GeneralNotifications from "@src/components/notifications/general";
import UserAlerts from "@src/components/notifications/alerts";
import { useNavigation, useRoute } from "@react-navigation/native";

const UserNotifications = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const { params } = useRoute();

  const alert = params?.alert;
  const item = params?.item;

  useEffect(() => {
    // Navigate to the "Alerts" tab when the component mounts
    if(alert) navigation.navigate("Alerts", {item, modalView: true});
  }, [navigation, alert, item]);

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
