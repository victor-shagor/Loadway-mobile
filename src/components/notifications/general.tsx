import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, FlatList, SectionList } from "react-native";
import { ThemedText } from "../ThemedText";
import { getAllNotifications } from "@src/api/notifications";
import useOnboardingContext from "@src/utils/Context";
import { useFocusEffect } from "@react-navigation/native";
import { RenderedGeneralNotification } from "./renderedNotification";
import { format } from "date-fns"; // Import date-fns for date formatting

const GeneralNotifications = () => {
  const { generalNotifications, setGeneralNotifications } =
    useOnboardingContext();

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchNot = async () => {
    try {
      if (isLoading || !hasMore) return;

      setIsLoading(true);
      const newNot = await getAllNotifications({ category: "General" });
      // setGeneralNotifications(newNot.data);
      if (newNot.length > 0) {
        setGeneralNotifications((prevTransactions: any) => [
          ...prevTransactions,
          ...newNot.data,
        ]);
        setPageNumber(newNot.data.data.currentPage + 1);
        setTotalPages(newNot.data.data.totalPages);
      }

      if (newNot.data.currentPage >= newNot.data.totalPages) {
        setHasMore(false);
      }
    } catch (error: any) {
      // console.log(error.response.data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNot();
    }, [setGeneralNotifications])
  );

  // Group notifications by date
  const groupedNotifications = useMemo(() => {
    if (!generalNotifications || !generalNotifications.length) return [];
    const grouped = generalNotifications.reduce((acc, notification) => {
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
  }, [generalNotifications]);

  return (
    <SectionList
      sections={groupedNotifications}
      keyExtractor={(item, index) => JSON.stringify(index)}
      renderItem={({ item }) => <RenderedGeneralNotification item={item} />}
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
});

export default GeneralNotifications;
