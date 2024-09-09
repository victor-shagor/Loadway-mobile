import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ThemedText } from "../ThemedText";
import {
  generalNotification,
  maintainanceNotification,
} from "@src/screens/notifications/data";
import {
  Divider,
  RenderedGeneralNotification,
  RenderedMaintainanceNotification,
} from "./renderedNotification";

const MaintenanceNotifications = () => {
  return (
    <FlatList
      data={maintainanceNotification}
      renderItem={({ item }) => (
        <RenderedMaintainanceNotification item={item} />
      )}
      keyExtractor={(_item, index) => JSON.stringify(index)}
      contentContainerStyle={{ flex: 1 }}
      scrollEnabled={false}
    />
  );
};

const GeneralNotifications = () => {
  return (
    <FlatList
      data={generalNotification}
      renderItem={({ item }) => <RenderedGeneralNotification item={item} />}
      keyExtractor={(_item, index) => JSON.stringify(index)}
      contentContainerStyle={{ flex: 1 }}
      ListHeaderComponent={
        <View style={styles.dayContainer}>
          <ThemedText style={{ flex: 0.3 }}>Today</ThemedText>
          <Divider />
        </View>
      }
      ListHeaderComponentStyle={{ marginBottom: 8 }}
      ListFooterComponent={
        <>
          <View style={[styles.dayContainer, { marginVertical: 8 }]}>
            <ThemedText style={{ flex: 0.3 }}>Feb 3, 2023</ThemedText>
            <Divider />
          </View>
          <MaintenanceNotifications />
        </>
      }
      ListFooterComponentStyle={{ marginTop: 8 }}
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

export default GeneralNotifications;
