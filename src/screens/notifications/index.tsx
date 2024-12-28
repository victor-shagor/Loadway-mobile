import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppTopTabBar, { TabItem } from "@src/components/common/AppTopTabBar";
import { useGetAllNotificationsQuery } from "@src/hooks/useNotificationQuery";
import { FlatList } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { timestampDisplay } from "@src/utils/helper";
import CustomModal from "@src/components/CustomModal";
import ViewNotification from "@src/components/notifications/ViewNotification";
import { StatusBar } from "expo-status-bar";

const UserNotifications = () => {
  const notificationInfoModalRef = useRef<any>(null);
  const [selectedNotification, setSelectedNotification] = useState<any>({});

  const openNotificationInfoModal = (item: any) => {
    setSelectedNotification(item);
    notificationInfoModalRef.current?.open();
  };

  const tabs: Array<TabItem> = [
    {
      label: "GENERAL",
      name: "General",
    },
    {
      label: "ALERTS",
      name: "Alert",
    },
  ];

  const [activeTab, setActiveTab] = useState<string>("General");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  const { data, isFetching, isLoading, refetch } = useGetAllNotificationsQuery(
    activeTab,
    page,
    pageSize
  );

  return (
    <View className='flex-1 pt-3'>
      <StatusBar style='dark' />
      <View className='absolute z-10 w-full'>
        <AppTopTabBar
          activeTab={activeTab}
          tabs={tabs}
          onTabPressed={(tab) => setActiveTab(tab)}
        />
      </View>
      {isLoading || isFetching ? (
        <View className='flex-1 items-center justify-center py-16 mx-[5vw]'>
          <ActivityIndicator size='large' color='#F6411B' />
        </View>
      ) : (
        <View className='flex-1 pt-16 mx-[5vw]'>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isFetching || isLoading}
                onRefresh={refetch}
                colors={["#F6411B"]}
                tintColor={"#F6411B"}
              />
            }
            data={data?.data || []}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={() => (
              <View className='flex items-center justify-center p-14 gap-4'>
                <View>
                  <Feather name='bell-off' size={96} color='#a1a1a1' />
                </View>
                <View>
                  <Text className='text-center font-medium text-xl text-[#050402]'>
                    You have no notifications
                  </Text>
                </View>
              </View>
            )}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => openNotificationInfoModal(item)}
                children={({ pressed }) => (
                  <View className={`${pressed ? "opacity-50" : ""} flex-row`} style={{ gap: 16 }}>
                    <View className={`w-16 h-16 rounded-full ${false ? "border-2" : ""} border-[#B42020] justify-center items-center overflow-hidden p-1 shrink-0`}>
                      <View className='rounded-full w-full h-full items-center justify-center bg-[#EFBABA]'>
                        <MaterialCommunityIcons
                          name='bell'
                          size={24}
                          color='#fff'
                          className='bg-red-50'
                        />
                      </View>
                    </View>
                    <View className='flex-1'>
                      <View>
                        <Text className='text-sm font-medium text-[#050402]'>
                          {timestampDisplay(item.createdAt).formattedDate} at{" "}
                          {timestampDisplay(item.createdAt).formattedTime}
                        </Text>
                        <Text className='font-bold text-base text-[#050402]'>
                          {item.description}
                        </Text>
                        <Text className='text-[#050402]/50' numberOfLines={2}>
                          {item.content}
                        </Text>
                      </View>
                    </View>
                    {/* This is for unread notifications
                    Change to true to show
                     */}
                    {false && (
                      <View className='shrink-0 pt-7'>
                        <View className='bg-[#FF2828] h-2 w-2 rounded-full'></View>
                      </View>
                    )}
                  </View>
                )}
              />
            )}
          />
        </View>
      )}
      <CustomModal
        modalizeRef={notificationInfoModalRef}
        modalContent={
          <ViewNotification
            notification={selectedNotification}
            handleClose={() => notificationInfoModalRef.current?.close()}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    gap: 32,
  },
});

export default UserNotifications;
