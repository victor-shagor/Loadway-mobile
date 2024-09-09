import { alertsNotification } from "@src/screens/notifications/data";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { RenderedAlertNotification, Divider } from "./renderedNotification";

const UserAlerts = () => {
  return (
    <FlatList
      data={alertsNotification}
      renderItem={({ item }) => <RenderedAlertNotification item={item} />}
      keyExtractor={(_item, index) => JSON.stringify(index)}
      contentContainerStyle={{ flex: 1 }}
      ListHeaderComponent={
        <View style={styles.dayContainer}>
          <ThemedText style={{ flex: 0.3 }}>Today</ThemedText>
          <Divider />
        </View>
      }
      ListHeaderComponentStyle={{ marginBottom: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

export default UserAlerts;
