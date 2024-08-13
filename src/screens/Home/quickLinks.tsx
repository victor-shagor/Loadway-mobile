import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons/";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";
import {
  IconTypes,
  IconProvider,
  quickLinksArray,
  recentChatArray,
} from "./data";

const renderIcon = (
  icon: IconTypes | string,
  provider: IconProvider,
  size: number
) => {
  switch (provider) {
    case "AntDesign":
      return (
        <AntDesign
          name={icon as keyof typeof AntDesign.glyphMap}
          size={size}
          color={appColors.orange}
        />
      );

    case "Feather":
      return (
        <Feather
          name={icon as keyof typeof Feather.glyphMap}
          size={size}
          color={appColors.orange}
        />
      );

    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons
          name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={size}
          color={appColors.orange}
        />
      );

    default:
      return "";
  }
};

const QuickLinks = () => {
  return (
    <View style={styles.container}>
      <View style={{ gap: 8 }}>
        <ThemedText
          type="default"
          style={{ color: appColors.lightGray, fontWeight: 600 }}
        >
          Quick Links
        </ThemedText>

        <FlatList
          data={quickLinksArray}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ alignItems: "center", gap: 5 }}>
              <View style={styles.iconContainer}>
                {renderIcon(item.icon, item.iconProvider, 24)}
              </View>
              <ThemedText type="small" style={{ fontWeight: 600 }}>
                {item.name}
              </ThemedText>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
          scrollEnabled={false}
          contentContainerStyle={styles.quickLinksContainer}
        />
      </View>

      <View style={{ gap: 8 }}>
        <ThemedText
          type="default"
          style={{ color: appColors.lightGray, fontWeight: 600 }}
        >
          Recent Chats
        </ThemedText>

        <FlatList
          data={recentChatArray}
          renderItem={({ item }) => (
            <View>
              <Image source={item.image} />
              <ThemedText>{item.name}</ThemedText>
            </View>
          )}
          keyExtractor={(item) => item.name}
          scrollEnabled={false}
          contentContainerStyle={styles.recentChatsContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
  quickLinksContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 80,
    borderColor: appColors.gray,
    borderRadius: 10,
    padding: 10,
    backgroundColor: appColors.white,
  },
  iconContainer: {
    backgroundColor: appColors.gray,
    height: 50,
    width: 50,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  recentChatsContainer: {},
});

export default QuickLinks;
