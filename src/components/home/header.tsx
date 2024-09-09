import React from "react";
import { StyleSheet, View, Platform, TouchableOpacity } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { User } from "@src/models/User";
import { appColors } from "@src/constants/colors";
import { ThemedText } from "@src/components/ThemedText";
import { capitalizedFirstLetter } from "@src/utils/capitalizedLetter";

type NavigationProp = NativeStackNavigationProp<
  { UserNotifications: undefined },
  keyof { UserNotifications: undefined }
>;

const DashboardHeader = ({ currentUser }: { currentUser: User }) => {
  const { navigate } = useNavigation<NavigationProp>();

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
        <TouchableOpacity
          onPress={() => navigate("UserNotifications")}
          style={styles.notificationIconContainer}
        >
          <FontAwesome name="bell-o" size={24} color={appColors.white} />
          <View style={styles.notification} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    minHeight: Platform.OS === "ios" ? 180 : 150,
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
