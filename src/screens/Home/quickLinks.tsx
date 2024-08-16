import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
import CustomModal from "@src/components/CustomModal";
import BuyElectricity from "../modals/electricity";

export type RootStackParamList = {
  GateAccess: undefined;
  Emergency: undefined;
  Message: undefined;
  Electricity: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export const renderIcon = (
  icon: IconTypes | string,
  provider: IconProvider,
  size: number,
  color: string
) => {
  switch (provider) {
    case "AntDesign":
      return (
        <AntDesign
          name={icon as keyof typeof AntDesign.glyphMap}
          size={size}
          color={color}
        />
      );

    case "Feather":
      return (
        <Feather
          name={icon as keyof typeof Feather.glyphMap}
          size={size}
          color={color}
        />
      );

    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons
          name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={size}
          color={color}
        />
      );
    case "Entypo":
      return (
        <Entypo
          name={icon as keyof typeof Entypo.glyphMap}
          size={size}
          color={color}
        />
      );

    default:
      return "";
  }
};

const QuickLinks = () => {
  const navigation = useNavigation<NavigationProp>();

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
          horizontal
          data={quickLinksArray}
          renderItem={({ item }) => (
            <>
              {item.href === "Electricity" ? (
                <CustomModal
                  triggerItem={
                    <>
                      <View style={styles.iconContainer}>
                        {renderIcon(
                          item.icon,
                          item.iconProvider,
                          24,
                          appColors.orange
                        )}
                      </View>
                      <ThemedText type="small" style={{ fontWeight: 600 }}>
                        {item.name}
                      </ThemedText>
                    </>
                  }
                  triggerItemStyle={{ alignItems: "center", gap: 5 }}
                  modalContent={<BuyElectricity />}
                />
              ) : (
                <TouchableOpacity
                  style={{ alignItems: "center", gap: 5 }}
                  onPress={() => navigation.navigate(item.href)}
                >
                  <View style={styles.iconContainer}>
                    {renderIcon(
                      item.icon,
                      item.iconProvider,
                      24,
                      appColors.orange
                    )}
                  </View>
                  <ThemedText type="small" style={{ fontWeight: 600 }}>
                    {item.name}
                  </ThemedText>
                </TouchableOpacity>
              )}
            </>
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
            <View style={[styles.quickLinksContainer, { marginBottom: 8 }]}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image source={item.image} style={{ width: 50, height: 50 }} />
                <View style={{ gap: 2 }}>
                  <ThemedText type="title">{item.name}</ThemedText>
                  <ThemedText>{item.itemSent}</ThemedText>
                </View>
              </View>

              <Entypo
                name="chevron-small-right"
                size={20}
                color={appColors.black}
              />
            </View>
          )}
          keyExtractor={(item) => item.name}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
  },
  iconContainer: {
    backgroundColor: appColors.iconGray,
    height: 50,
    width: 50,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  recentChatsContainer: {
    gap: 12,
  },
});

export default QuickLinks;