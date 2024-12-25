import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Cards from "./cards";
import PushNotifications from "./pushNotifications";
import RecentActivity from "./recentActivity";
import QuickLinks from "./quickLinks";

type Props = {};

const HomeMain = (props: Props) => {
  return (
    <ScrollView className="px-[5vw] py-4 flex-1">
      <Cards />
      <QuickLinks/>
      <PushNotifications />
      <RecentActivity/>
      <View className="h-32"></View>
    </ScrollView>
  );
};

export default HomeMain;
