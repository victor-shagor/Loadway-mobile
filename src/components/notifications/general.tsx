import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, FlatList, SectionList, ActivityIndicator } from "react-native";
import { ThemedText } from "../ThemedText";
import { getAllNotifications } from "@src/api/notifications";
import useOnboardingContext from "@src/utils/Context";
import { useFocusEffect } from "@react-navigation/native";
import { RenderedGeneralNotification } from "./renderedNotification";
import { format } from "date-fns"; // Import date-fns for date formatting
import { appColors } from "@src/constants/colors";

const GeneralNotifications = () => {
  const { generalNotifications, setGeneralNotifications } =
    useOnboardingContext();

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchNot = async () => {
    if (isLoading || !hasMore) return;
  
    setIsLoading(true);
    try {
      const newNot = await getAllNotifications({ category: "General", page: pageNumber });
      
      if (newNot.data && newNot.data.length > 0) {
        setGeneralNotifications(newNot.data);
        setPageNumber((prevPage) => prevPage + 1);
        
        if (newNot.currentPage >= newNot.totalPages) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useFocusEffect(
    useCallback(() => {
      if (hasMore && pageNumber === 1) {
        // Only fetch if `hasMore` is true and it's the first page
        fetchNot();
      }
    }, [hasMore, pageNumber])
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
    stickySectionHeadersEnabled={false}
    onEndReached={fetchNot}
    onEndReachedThreshold={0.5}
    ListFooterComponent={isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
  />
  
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    backgroundColor: appColors.gray, // Adjust the background color
  },
  headerText: {
    // fontWeight: "bold",
    fontSize: 16,
  },
});

export default GeneralNotifications;
