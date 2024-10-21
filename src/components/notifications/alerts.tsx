import React, { useCallback, useMemo } from "react";
import { FlatList, SectionList, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { RenderedAlertNotification, Divider } from "./renderedNotification";
import useOnboardingContext from "@src/utils/Context";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { getAllNotifications } from "@src/api/notifications";
import { format } from "date-fns";
import { navigate } from "@src/navigation";

const UserAlerts = () => {
  const { alertNotifications, setAlertNotifications } = useOnboardingContext();

  const { params } = useRoute();

  const modalView = params?.modalView;
  const modalItem = params?.item;

  const resetModalItem = () => {
    if(modalItem){
      navigate("Alerts", { modalItem: null, modalView: false });
    }
    
  }

  useFocusEffect(
    useCallback(() => {
      const fetchNot = async () => {
        const newNot = await getAllNotifications({ category: "Alert" });
        setAlertNotifications(newNot.data);
      };

      fetchNot();
    }, [setAlertNotifications])
  );

  const groupedNotifications = useMemo(() => {
    if (!alertNotifications || !alertNotifications.length) return [];
    
    const grouped = alertNotifications.reduce((acc, notification) => {
      const date = format(new Date(notification.createdAt), "MMM dd, yyyy"); // Format the date
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notification);
      return acc;
    }, {});
  
    // Convert grouped object to an array of sections
    return Object.entries(grouped).map(([date, notifications]) => ({
      title: date,
      data: notifications as any[], // Provide the correct type for the data property
    }));
  }, [alertNotifications]);


  return (
    <SectionList
      sections={groupedNotifications}
      keyExtractor={(item, index) => JSON.stringify(index)}
      renderItem={({ item }) => <RenderedAlertNotification item={item} modalView={modalView} modalItem={modalItem} resetModalItem={resetModalItem}/>}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.headerContainer}>
          <ThemedText style={styles.headerText}>{title}</ThemedText>
        </View>
      )}
      contentContainerStyle={{ flexGrow: 1 }}
      stickySectionHeadersEnabled={false} // Disable sticky headers if needed
    />
  );
};


const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    backgroundColor: "#f4f4f4", // Adjust the background color
  },
  headerText: {
    // fontWeight: "bold",
    fontSize: 16,
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

export default UserAlerts;
