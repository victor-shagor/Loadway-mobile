import { View, Text, Pressable } from "react-native";
import React from "react";
import images from "@src/constants/images";
import { Image } from "expo-image";
import * as Clipboard from "expo-clipboard";
import { Share } from "react-native";
import { ToastService } from "react-native-toastier";
import AppToast from "../common/AppToast";
import { addDays } from "date-fns";
import { timestampDisplay } from "@src/utils/helper";

type ActionButtonType = {
  name: string;
  icon: any;
  action?: (...args: any) => void;
  disabled?: boolean;
};

const GateAccessCard = ({
  accessCodeData,
  handleAddToFrequent,
  revokeAccess,
  accessRevoked,
}: {
  revokeAccess?: () => void;
  accessCodeData: any;
  handleAddToFrequent?: () => void;
  accessRevoked?: boolean;
}) => {
  const copyToClipboard = async () => {
    const messageTemplate = `Hi ${
      accessCodeData.guestName
    },\n\nYour access code is: ${accessCodeData.code}\n\nAddress: ${
      accessCodeData?.address
    }\n\nWhen you arrive at the gate, show the code to the security team. Your code expires on ${
      timestampDisplay(addDays(accessCodeData?.createdAt || new Date(), 1))
        .formattedDate
    } at ${
      timestampDisplay(addDays(accessCodeData?.createdAt || new Date(), 1))
        .formattedTime
    }.\n\nPowered by masonatlantic.com`;
    await Clipboard.setStringAsync(messageTemplate);
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Hi ${
      accessCodeData.guestName
    },\n\nYour access code is: ${accessCodeData.code}\n\nAddress: ${
      accessCodeData?.address
    }\n\nWhen you arrive at the gate, show the code to the security team. Your code expires on ${
      timestampDisplay(addDays(accessCodeData?.createdAt || new Date(), 1))
        .formattedDate
    } at ${
      timestampDisplay(addDays(accessCodeData?.createdAt || new Date(), 1))
        .formattedTime
    }.\n\nPowered by masonatlantic.com`,
      });
    } catch (error: any) {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#ef4444",
        },
        children: (
          <AppToast
            message={error || "An error occurred"}
            leftIcon='alert-circle'
            color='#fff'
          />
        ),
        right: <View></View>,
      });
    }
  };

  const actionButtons: Array<ActionButtonType> = [
    {
      name: "Add to frequent",
      icon: images.gateAccess.standingMan,
      action: handleAddToFrequent,
      disabled: !handleAddToFrequent,
    },
    {
      name: "Copy invite",
      icon: images.gateAccess.copy,
      action: copyToClipboard,
    },
    {
      name: "Share to apps",
      icon: images.gateAccess.forwardArrow,
      action: onShare,
    },
  ];

  return (
    <View
      className={`bg-white rounded-2xl p-10 items-center ${
        !revokeAccess ? "w-[85vw]" : "w-full"
      }`}
    >
      <View style={{ gap: 10 }}>
        <View className='items-center'>
          <Text className='text-sm font-medium'>Access created for</Text>
          <Text className='text-lg font-medium'>
            {accessCodeData.guestName}
          </Text>
        </View>
        <Text className='text-3xl font-medium text-center'>
          {accessCodeData.code}
        </Text>
      </View>
      <View
        className='flex-row justify-between items-start w-full mt-10'
        style={{ gap: 10 }}
      >
        {actionButtons.map(({ name, icon, action, disabled }, index) => (
          <Pressable
            key={index}
            onPress={accessRevoked || disabled ? () => {} : action}
            className='flex-1 shrink-0 justify-center items-center '
          >
            {({ pressed }) => (
              <View
                className={`${
                  disabled || accessRevoked
                    ? "opacity-50"
                    : pressed
                    ? "opacity-50"
                    : ""
                } items-center`}
              >
                <View className='w-12 h-12 rounded-full border-black border-2 justify-center items-center'>
                  <Image source={icon} contentFit='cover' className='w-8 h-8' />
                </View>
                <Text className='text-black text-center text-base'>{name}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
      {revokeAccess && (
        <View className='pt-5'>
          <Pressable
            onPress={accessRevoked || !revokeAccess ? () => {} : revokeAccess}
            children={({ pressed }) => (
              <View
                className={`${
                  !revokeAccess || accessRevoked
                    ? "opacity-50"
                    : pressed
                    ? "opacity-50"
                    : ""
                } rounded-full px-6 py-3 flex justify-center items-center border-2 border-[#C80000]`}
              >
                <Text className='text-[#C80000] font-medium text-base'>
                  Revoke Invite
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default GateAccessCard;
