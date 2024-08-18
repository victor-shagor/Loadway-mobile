import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import {  } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { appColors } from "@src/constants/colors";
import { ThemedText } from "@src/components/ThemedText";

const capitalizedFirstLetter = (word: string)=>
  word.charAt(0).toUpperCase()
  + word.slice(1)

const DashboardHeader = ({currentUser}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerItemsWrapper}>
        <View style={{ gap: 8 }}>
          <View style={styles.nameIconContainer}>
            <ThemedText type="title" style={{ color: appColors.white }}>
              Hello {capitalizedFirstLetter(currentUser?.firstName)}
            </ThemedText>
            <Feather name="info" size={16} color={appColors.white} />
          </View>
          <ThemedText type="small" style={{ color: appColors.white }}>
            Welcome to your zen
          </ThemedText>
        </View>
        <View style={styles.notificationIconContainer}>
          <FontAwesome name="bell-o" size={24} color={appColors.white} />
          <View style={styles.notification} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    minHeight: 180,
    backgroundColor: appColors.black,
    padding: 20,
  },
  headerItemsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameIconContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  notificationIconContainer: {
    position: "relative",
  },
  notification: {
    width: 8,
    height: 8,
    borderRadius: 100,
    position: "absolute",
    top: 1,
    right: 2,
    backgroundColor: appColors.orange,
  },
});

export default DashboardHeader;
