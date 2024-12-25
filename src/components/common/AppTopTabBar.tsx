import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";

export type TabProps = {
  tabs: Array<TabItem>;
  activeTab: string;
  onTabPressed: (tab: string) => void;
};

export type TabItem = {
  name: string;
  label: string;
};

const AppTopTabBar = ({
  tabs,
  activeTab,
  onTabPressed,
}: TabProps) => {
  return (
    <View className='mx-[5vw] rounded-full border border-black bg-[#f1f1f1] self-center w-fit'>
      <FlatList
        data={tabs}
        keyExtractor={(item) => item.name}
        horizontal
        renderItem={({ item }) => (
          <Pressable onPress={() => onTabPressed(item.name)}>
            {({ pressed }) => (
              <View
                className={`${pressed ? "opacity-50" : null} ${
                  activeTab === item.name ? "bg-black" : null
                } rounded-full h-full p-2.5`}
              >
                <Text
                  className={`${
                    activeTab === item.name ? "text-white" : "text-black"
                  } font-medium text-base`}
                >
                  {item.label}
                </Text>
              </View>
            )}
          </Pressable>
        )}
        contentContainerStyle={styles.tabListContainer}
      />
    </View>
  );
};

export default AppTopTabBar;

const styles = StyleSheet.create({
  tabListContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});
