import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";

const PushNotifications = () => {
  return (
    <View style={styles.pushNotificationWrapper}>
      <View style={{ gap: 8 }}>
        <View style={{ gap: 8 }}>
          <ThemedText
            type="default"
            style={{ color: appColors.lightGray, fontWeight: 600 }}
          >
            Push Notifications
          </ThemedText>

          <View style={styles.alertContainer}>
            <ThemedText
              type="small"
              style={{ fontWeight: 700, color: appColors.orange }}
            >
              ALERT
            </ThemedText>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ThemedText
                type="default"
                style={{ color: appColors.white, fontWeight: 600 }}
              >
                Unauthorized entry at front gate
              </ThemedText>

              <View style={styles.highRisk}>
                <ThemedText type="small" style={{ color: appColors.orange }}>
                  High Risk
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.gateAccess}>
          <ThemedText
            type="small"
            style={{ fontWeight: 700, color: appColors.lightGray }}
          >
            GATE ACCESS
          </ThemedText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ gap: 6 }}>
              <ThemedText type="title">John Davis</ThemedText>
              <ThemedText type="small">C-135DF0</ThemedText>
            </View>

            <View style={{ gap: 6 }}>
              <ThemedText type="small">JAN 20 2023</ThemedText>
              <ThemedText type="small">10:00 AM</ThemedText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pushNotificationWrapper: {
    flex: 1,
    marginBottom: 20,
  },
  alertContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: appColors.black,
    borderRadius: 10,
    minHeight: 100,
    gap: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  highRisk: {
    backgroundColor: appColors.white,
    borderRadius: 5,
    padding: 6,
  },
  gateAccess: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: appColors.gray,
    borderRadius: 10,
    minHeight: 100,
    padding: 10,
  },
});

export default PushNotifications;
