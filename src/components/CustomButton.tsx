import React from "react";
import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { ThemedText } from "./ThemedText";
import { appColors } from "@src/constants/colors";

interface CustomButtonProps {
  value: string;
  disable?: boolean;
  isLoading?: boolean;
  buttonStyle?: any;
  onPress?: () => void;
  bgColor?: string;
  textColor?: string;
}

const CustomButton = ({
  isLoading,
  disable,
  value,
  buttonStyle = {},
  bgColor,
  onPress,
  textColor
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.customButtonStyle,
        buttonStyle,
        { backgroundColor: disable ? appColors.gray : appColors.orange },
        bgColor && { backgroundColor: bgColor },
      ]}
      disabled={disable}
      onPress={onPress}
    >
      <ThemedText type="title" style={{ color: textColor? textColor :appColors.white }}>
        {value}
      </ThemedText>
      {isLoading && <ActivityIndicator size="small" color={appColors.white} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: appColors.orange,
    minHeight: 50,
    flex: 1,
    borderRadius: 8,
  },
});

export default CustomButton;