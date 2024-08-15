import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ThemedText } from "@src/components/ThemedText";
import { recentActivityArray, RecentActivityProps } from "./data";
import QuickLinks, { renderIcon } from "./quickLinks";
import { appColors } from "@src/constants/colors";
import Cards from "./cards";
import PushNotifications from "./pushNotifications";

interface RecentActivityPropsWithIndex {
  prop: RecentActivityProps;
  index: number;
}

const RecentActivityItem = ({ prop, index }: RecentActivityPropsWithIndex) => {
  return (
    <View style={styles.renderActivityItem}>
      <View
        style={[
          styles.renderActivityItem,
          {
            flex: 1,
            borderBottomWidth:
              index !== recentActivityArray.length - 1 ? 1 : undefined,
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
          {renderIcon(
            prop.activityIcon,
            prop.iconProvider,
            24,
            appColors.iconWine
          )}
          <View style={{ gap: 3 }}>
            <ThemedText type="small">{prop.activityTag}</ThemedText>
            <ThemedText type="title">{prop.activityTitle}</ThemedText>
          </View>
        </View>

        <View style={{ gap: 2 }}>
          <ThemedText type="default">{prop.activityDate}</ThemedText>
          <ThemedText
            type="title"
            style={{ alignSelf: "flex-end", color: appColors.deepGray }}
          >
            {prop.activityAmount}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const RecentActivity = () => {
  return (
    <FlatList
      data={recentActivityArray}
      renderItem={({ item, index }) => (
        <RecentActivityItem prop={item} index={index} />
      )}
      keyExtractor={(item) => item.activityTitle}
      ListHeaderComponent={
        <View style={{ gap: 15 }}>
          <Cards />
          <PushNotifications />
          <QuickLinks />

          <ThemedText type="default" style={styles.recentActivityHeader}>
            Recent Activity
          </ThemedText>
        </View>
      }
      contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
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
    minHeight: 60,
    padding: 10,
  },
  recentActivityHeader: {
    color: appColors.lightGray,
    fontWeight: 600,
    marginBottom: 8,
  },
});

export default RecentActivity;
