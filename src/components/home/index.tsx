import {
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";
import Cards from "./cards";
import PushNotifications from "./pushNotifications";
import RecentActivity from "./recentActivity";
import QuickLinks from "./quickLinks";
import { useGetCurrentUserQuery } from "@src/hooks/useUserQuery";

const HomeMain = () => {
  const { isLoading, isFetching, refetch } = useGetCurrentUserQuery();

  return (
    <ScrollView
      className='px-[5vw] py-4 flex-1'
      refreshControl={
        <RefreshControl
          refreshing={isFetching || isLoading}
          onRefresh={refetch}
          colors={["#F6411B"]}
          tintColor={"#F6411B"}
        />
      }
    >
      <Cards />
      <QuickLinks />
      <PushNotifications />
      <RecentActivity />
      <View className='h-32'></View>
    </ScrollView>
  );
};

export default HomeMain;
