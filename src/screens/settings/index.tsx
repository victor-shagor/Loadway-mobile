import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";
import settingsLinks from "./data";

export type SettingsStackParamList = {
  Notifications: undefined;
  Communication: undefined;
  Security: undefined;
  AppPreferences: undefined;
  Support: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  SettingsStackParamList,
  keyof SettingsStackParamList
>;

const Settings = () => {
  const { navigate } = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsLinks}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigate(item.path)}
            style={styles.links}
          >
            <ThemedText style={{ fontWeight: 500, color: appColors.lightGray }}>
              {item.name}
            </ThemedText>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.path}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 25 },
  listContainer: {
    borderRadius: 10,
    minHeight: 300,
    padding: 8,
    gap: 15,
  },
  links: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flex: 1,
    minHeight: 50,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: appColors.gray,
  },
});

export default Settings;
