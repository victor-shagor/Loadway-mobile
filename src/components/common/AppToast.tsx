import { Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

type Props = {
  message: string;
  rightIcon?: any;
  leftIcon?: any;
  color?: string;
};

const AppToast = ({ message, leftIcon, rightIcon, color = "#000" }: Props) => {
  return (
    <View className='flex-row gap-2 items-center'>
      {leftIcon && <Feather name={leftIcon} size={24} color={color} />}
      <Text style={{ color }}>{message}</Text>
      {rightIcon && <Feather name={leftIcon} size={24} color={color} />}
    </View>
  );
};

export default AppToast;
