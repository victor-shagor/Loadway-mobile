import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ThemedText } from "@src/components/ThemedText";
import { recentActivityArray, RecentActivityProps } from "../../screens/home/data";
import QuickLinks from "./quickLinks";
import { appColors } from "@src/constants/colors";
import Cards from "./cards";
import PushNotifications from "./pushNotifications";
import { Activity, ActivityType, User } from "@src/models/User";
import { renderIcon } from "../common/renderIcon";
import EmptyState from "../common/emptyState";
import { formatTimestamp } from "@src/utils/helper";
import useOnboardingContext from "@src/utils/Context";

interface RecentActivityPropsWithIndex {
  item: Activity;
  index: number;
  currentUser: User | null
}

const RecentActivityItem = ({ item, index, currentUser }: RecentActivityPropsWithIndex) => {
  const activities = currentUser?.activities || [];
  const icon = item.activityType === ActivityType.COMPLAINT ? 'chat-question-outline' : 'unlock'
  const iconProvider = item.activityType === ActivityType.COMPLAINT ? 'MaterialCommunityIcons' : 'AntDesign'
  const formatString = (input: string) => {
    const words = input.toLowerCase().split('_');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  }
  
  return (
    <View style={styles.renderActivityItem}>
      <View
        style={[
          styles.renderActivityItem,
          {
            flex: 1,
            borderBottomWidth:
              index !== activities?.length - 1 ? 1 : undefined,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.iconContainer}>
            {renderIcon(
              icon,
              iconProvider,
              24,
              appColors.iconWine
            )}
          </View>
          <View style={{ gap: 3 }}>
            <ThemedText type="small">{formatString(item.activityType)}</ThemedText>
            <ThemedText type="title">{item.title}</ThemedText>
          </View>
        </View>

        <View style={{ gap: 2 }}>
          <ThemedText type="default">{formatTimestamp(item.createdAt)}</ThemedText>
        </View>
      </View>
    </View>
  );
};

const RecentActivity = () => {
  const { currentUser } = useOnboardingContext();
  const activities = currentUser?.activities || [];

  return (
    <FlatList
      data={activities}
      renderItem={({ item, index }) => (
        <View style={{marginBottom: index === activities?.length -1 ? 30 : 0 }}>
        <RecentActivityItem item={item} index={index} currentUser={currentUser}/>
        </View>
      )}
      keyExtractor={(item) => item.title}
      ListHeaderComponent={
        <View style={{ gap: 15 }}>
          <Cards />
          <PushNotifications />
          <QuickLinks currentUser={currentUser}/>

          <ThemedText type="default" style={styles.recentActivityHeader}>
            Recent Activity
          </ThemedText>

          {(!activities || activities.length === 0) && (
            <View style={{ marginBottom: 30 }}>
            <EmptyState text="No recent activity yet" />
            </View>
          )}
        </View>
      }
      contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  renderActivityContainer: {
    backgroundColor: appColors.white,
    padding: 10,
  },
  renderActivityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: appColors.white,
    borderColor: appColors.gray,
    borderRadius: 10,
    minHeight: 70,
    padding: 10,
  },
  recentActivityHeader: {
    color: appColors.lightGray,
    fontWeight: "600",
    marginBottom: 5
  },
  iconContainer: {
    backgroundColor: appColors.iconGray,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecentActivity;
