import React from "react";
import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { ThemedText } from "./ThemedText";
import { appColors } from "@src/constants/colors";

interface CustomButtonProps {
  value: string;
  disable?: boolean;
  isLoading?: boolean;
}

const CustomButton = ({ isLoading, disable, value }: CustomButtonProps) => {
  return (
    <TouchableOpacity style={styles.customButtonStyle} disabled={disable}>
      <ThemedText type="title" style={{ color: appColors.white }}>
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
