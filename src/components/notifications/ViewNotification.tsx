import { Pressable, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { timestampDisplay } from "@src/utils/helper";
import { ScrollView } from "react-native-gesture-handler";

type ViewNotificationProps = {
  notification: any;
  handleClose: () => void;
};

const ViewNotification = ({
  notification,
  handleClose,
}: ViewNotificationProps) => {
  return (
    <View className='px-[5vw] py-16 h-[80vh]'>
      <ScrollView className='flex-1' style={{ gap: 16 }}>
        <View className='self-center rounded-full w-16 h-16 items-center justify-center bg-[#EFBABA]'>
          <MaterialCommunityIcons
            name='bell'
            size={24}
            color='#fff'
            className='bg-red-50'
          />
        </View>
        <Text className='font-bold text-2xl text-[#050402} pt-4'>
          {notification.description}
        </Text>
        <Text className='font-medium text-base text-[#050402]/50 pt-4'>
          {notification.content}
        </Text>
        <Text className='font-medium text-base text-[#050402] pt-4'>
          {timestampDisplay(notification.createdAt).formattedDate} at{" "}
          {timestampDisplay(notification.createdAt).formattedTime}
        </Text>
      </ScrollView>
      <Pressable
        onPress={handleClose}
        children={({ pressed }) => (
          <View
            className={`${
              pressed ? "opacity-50" : ""
            } rounded-full h-16 justify-center items-center border border-black`}
          >
            <Text className='text-center font-medium text-base'>
              Close message
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ViewNotification;