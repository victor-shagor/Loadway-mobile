import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { appColors } from "@src/constants/colors";
import { OnboardingContextType, useOnboarding } from "@src/context/onboarding";
import { Image } from "expo-image";
import { getStatusBarHeight } from "@src/utils/dimension";
import MailIcon from "@src/components/icons/MailIcon";
import PhoneIcon from "@src/components/icons/PhoneIcon";
import MapPinIcon from "@src/components/icons/MapPinIcon";
import CopyIcon from "@src/components/icons/CopyIcon";
import * as Clipboard from "expo-clipboard";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendResetPasswordCode } from "@src/api/auth";
import { ToastService } from "react-native-toastier";
import AppToast from "@src/components/common/AppToast";
import { StatusBar } from "expo-status-bar";

export type ProfileStackParamList = {
  Account: undefined;
  UserManagement: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  keyof ProfileStackParamList
>;

type InfoItem = {
  name: string;
  value: string;
  icon: React.ReactNode;
};

const Profile = () => {
  const statusBarHeight = getStatusBarHeight();
  const { navigate } = useNavigation<NavigationProp | any>();
  const { setCurrentUser, setLogin, currentUser } =
    useOnboarding() as OnboardingContextType;
  const [infoItems, setInfoItems] = useState<Array<InfoItem>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setInfoItems([
      {
        name: "ADDRESS",
        value: currentUser?.address || "--",
        icon: <MapPinIcon width={40} height={40} color={appColors.black} />,
      },
      {
        name: "PHONE NUMBER",
        value: currentUser?.phoneNumber || "--",
        icon: <PhoneIcon width={36} height={36} color={appColors.black} />,
      },
      {
        name: "EMAIL ADDRESS",
        value: currentUser?.email || "--",
        icon: <MailIcon width={36} height={36} color={appColors.black} />,
      },
    ]);
  }, [currentUser]);

  const logout = () => {
    setLogin(false);
    setCurrentUser(null);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      await AsyncStorage.setItem("resetEmail", currentUser?.email || "");
      return sendResetPasswordCode({
        email: currentUser?.email || "",
      });
    },
    mutationKey: ["sendResetPasswordCode"],
    onError: (error: any) => {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#ef4444",
        },
        children: (
          <AppToast
            message={error?.response?.data?.message || "An error occurred"}
            leftIcon='alert-circle'
            color='#fff'
          />
        ),
        right: <View></View>,
      });
    },
    onSuccess: (data) => {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#FFF1C6",
        },
        children: (
          <AppToast
            message={data?.data?.message || "Authentication code sent"}
            leftIcon='check-circle'
          />
        ),
        right: <View></View>,
      });
      navigate("resetpassword" as any);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const resetPassword = () => {
    setIsLoading(true);
    mutation.mutateAsync();
  }

  const copyAddress = () => {
    Clipboard.setStringAsync(currentUser?.address || "").then(() => {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#FFF1C6",
        },
        children: (
          <AppToast
            message={"Address copied"}
            leftIcon='check-circle'
          />
        ),
        right: <View></View>,
      });
    });
  };

  return (
    <ScrollView
      className='px-[10vw]'
      style={{ paddingTop: statusBarHeight + 16 }}
    >
      <StatusBar style='dark' />
      <View className='justify-center items-center' style={{ gap: 32 }}>
        <View className='justify-center items-center' style={{ gap: 16 }}>
          <Text className='uppercase text-center text-xl font-medium'>
            {currentUser?.firstName + " " + currentUser?.lastName}
          </Text>
          <Image
            source={currentUser?.profilePicture}
            contentFit='cover'
            className='w-24 h-24 rounded-full'
          />
        </View>
        <View style={{ gap: 20 }}>
          {infoItems.map((item, index) => (
            <View key={index} style={{ gap: 8 }}>
              <View className='flex-row justify-between'>
                <Text className='text-sm font-medium'>{item.name}</Text>
                {index === 0 && (
                  <Pressable
                    onPress={copyAddress}
                    children={({ pressed }) => (
                      <View
                        className={`${
                          pressed ? "opacity-50" : ""
                        } items-center bg-white rounded-full flex-row py-1.5 px-2`}
                        style={{ gap: 4 }}
                      >
                        <View className='w-4 h-4'>
                          <CopyIcon color='#E85637' />
                        </View>
                        <Text className='text-black font-medium'>Copy</Text>
                      </View>
                    )}
                  />
                )}
              </View>
              <View className='flex-row' style={{ gap: 8 }}>
                <View className='w-5 h-5 mt-1.5'>{item.icon}</View>
                <Text className='text-base font-medium'>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className='mt-16' style={{ gap: 16 }}>
        <Pressable
          onPress={resetPassword}
          children={({ pressed }) => (
            <View
              className={`${
                pressed ? "opacity-50" : ""
              } rounded-full h-16 justify-center items-center border-2 border-black bg-[#FFF6F4]`}
            >
              {isLoading ? (
                <ActivityIndicator
                  size='small'
                  color='#000'
                  style={{ marginRight: 8 }}
                />
              ) : (
                <Text className='text-center font-medium text-base text-black'>
                  Reset password
                </Text>
              )}
            </View>
          )}
        />
        <Pressable
          onPress={logout}
          children={({ pressed }) => (
            <View
              className={`${
                  pressed
                  ? "opacity-50"
                  : ""
              } rounded-full h-16 justify-center items-center border-2 border-[#E83737] bg-[#FFF6F4]`}
            >
              <Text className='text-center font-medium text-base text-[#E83737]'>
                Log out
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;
