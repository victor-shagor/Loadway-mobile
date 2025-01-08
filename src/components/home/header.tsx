import React from "react";
import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { User } from "@src/models/User";
import { appColors } from "@src/constants/colors";
import { capitalizedFirstLetter } from "@src/utils/capitalizedLetter";
import { getStatusBarHeight } from "@src/utils/dimension";

type NavigationProp = NativeStackNavigationProp<
  { UserNotifications: undefined },
  keyof { UserNotifications: undefined }
>;

const DashboardHeader = ({
  currentUser,
}: {
  currentUser: User;
}) => {
  const { navigate } = useNavigation<NavigationProp>();
  const statusBarHeight = getStatusBarHeight();

  return (
    <View
      className='bg-black flex-row justify-between items-center px-5 pb-4'
      style={{ paddingTop: statusBarHeight + 16 }}
    >
      <View className='flex-1'>
        <Text className='text-white text-xl font-medium'>
          👋🏽 Hello, {capitalizedFirstLetter(currentUser?.firstName)}
        </Text>
        <Text className='text-white text-xs font-medium opacity-50'>
          {currentUser?.address}
        </Text>
      </View>
      <Pressable
        className='shrink-1'
        onPress={() => navigate("UserNotifications")}
      >
        {({ pressed }) => (
          <View
            className={`${
              pressed ? "opacity-50" : "opacity-100"
            } bg-[#E85637]/20 w-12 h-12 rounded-full justify-center items-center relative`}
          >
            <Feather name='bell' size={24} color={appColors.white} />
            {currentUser.notificationCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  backgroundColor: "#E85637",
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: appColors.white,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  {currentUser.notificationCount > 99 ? "99+" : currentUser.notificationCount}
                </Text>
              </View>
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default DashboardHeader;
