import React, { useState } from "react";
import { StyleSheet, View} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { appColors } from "@src/constants/colors";
import Complaints from "@src/components/message/complaints";
import AppTopTabBar, { TabItem } from "@src/components/common/AppTopTabBar";
import { Feather } from "@expo/vector-icons";

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

  const tabs: Array<TabItem> = [
    {
      name: "CHAT",
      label: "CHAT",
    },
    {
      name: "COMPLAINTS",
      label: "COMPLAINTS",
    },
  ];

  const [activeTab, setActiveTab] = useState<string>("COMPLAINTS");

  return (
    <View className='flex-1 py-3'>
      {/* <View className='absolute z-10 w-full'>
        <AppTopTabBar
          activeTab={activeTab}
          tabs={tabs}
          onTabPressed={(tab) => setActiveTab(tab)}
        />
      </View> */}
      <View className='flex-1 px-[5vw]'>
        {activeTab === "CHAT" ? (
          <View className='flex-1'>
            <Feather name='zap-off' size={24} color='#000' />
          </View>
        ) : (
          <Complaints />
        )}
      </View>
    </View>
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
