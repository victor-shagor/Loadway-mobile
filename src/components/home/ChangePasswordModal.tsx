import { ActivityIndicator, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import images from "@src/constants/images";
import { formatMoney } from "@src/utils/helper";
import useOnboardingContext from "@src/utils/Context";
import { useMutation } from "@tanstack/react-query";
import { sendResetPasswordCode } from "@src/api/auth";
import { ToastService } from "react-native-toastier";
import AppToast from "../common/AppToast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

type ChangePasswordModalProps = {
  close: () => void;
};

const ChangePasswordModal = ({ close }: ChangePasswordModalProps) => {
  const { currentUser } = useOnboardingContext();
  const { navigate } = useNavigation<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      close();
      navigate("resetpassword" as any);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const resetPassword = () => {
    setIsLoading(true);
    mutation.mutateAsync();
  };

  return (
    <View className='px-[10vw] py-12' style={{ gap: 24 }}>
      <View className='w-14 h-14 justify-center items-center self-center bg-[#FFF6F4] rounded-full'>
        <Text className='text-lg'>👋🏽</Text>
      </View>
      <View>
        <Text className='text-black text-2xl font-medium pb-1.5 text-center'>
          HELLO, {currentUser?.firstName}
        </Text>
        <Text className='font-medium text-center text-base text-[#050402]/50'>
          Before you dive in, consider resetting your password to something more
          memorable.
        </Text>
      </View>
      <View style={{ gap: 16 }}>
        <Pressable
          onPress={() => resetPassword()}
          children={({ pressed }) => (
            <View
              className={`${
                pressed ? "opacity-50" : ""
              } rounded-full h-16 justify-center items-center bg-[#E85637]`}
            >
              {isLoading ? (
                <ActivityIndicator
                  size='small'
                  color='#fff'
                  style={{ marginRight: 8 }}
                />
              ) : (
                <Text className='text-center font-medium text-base text-white'>
                  Change Password
                </Text>
              )}
            </View>
          )}
        />
        <Pressable
          onPress={() => close()}
          children={({ pressed }) => (
            <View
              className={`${
                  pressed
                  ? "opacity-50"
                  : ""
              } rounded-full h-16 justify-center items-center border-2 border-black bg-[#FFF6F4]`}
            >
              <Text className='text-center font-medium text-base text-[#E85637]'>
                Do it later
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ChangePasswordModal;
