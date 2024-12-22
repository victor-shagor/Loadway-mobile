import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, SectionList, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { RenderedAlertNotification, Divider } from "./renderedNotification";
import useOnboardingContext from "@src/utils/Context";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { getAllNotifications } from "@src/api/notifications";
import { format } from "date-fns";
import { navigate } from "@src/navigation";
import { appColors } from "@src/constants/colors";

const UserAlerts = () => {
  const { alertNotifications, setAlertNotifications } = useOnboardingContext();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { params } = useRoute();

  const modalView = params?.modalView;
  const modalItem = params?.item;

  const resetModalItem = () => {
    if(modalItem){
      navigate("Alerts", { modalItem: null, modalView: false });
    }
    
  }

  const fetchNot = async () => {
    if (isLoading || !hasMore) return;
  
    setIsLoading(true);
    try {
      const newNot = await getAllNotifications({ category: "Alert", page: pageNumber });
      
      if (newNot.data && newNot.data.length > 0) {
        setAlertNotifications((prevNotifications:any) => [
          ...prevNotifications,
          ...newNot.data, 
        ]);
        setPageNumber((prevPage) => prevPage + 1);
        setTotalPages(newNot.totalPages);
        
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
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

export default UserAlerts;
