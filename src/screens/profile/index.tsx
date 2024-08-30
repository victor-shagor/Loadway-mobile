import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";
import { OnboardingContextType, useOnboarding } from "@src/context/onboarding";
import profileLinks from "./data";

export type ProfileStackParamList = {
  Account: undefined;
  UserManagement: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  keyof ProfileStackParamList
>;

const Profile = () => {
  const { navigate } = useNavigation<NavigationProp>();
  const { setCurrentUser, setLogin } = useOnboarding() as OnboardingContextType;

  const logout = () => {
    setLogin(false);
    setCurrentUser(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={profileLinks}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigate(item.path)}
            style={styles.links}
          >
            <ThemedText style={{ fontWeight: 500, color: appColors.black }}>
              {item.name}
            </ThemedText>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.path}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <TouchableOpacity
            onPress={() => logout()}
            style={[styles.links, { borderBottomWidth: 0 }]}
          >
            <ThemedText style={{ fontWeight: 500, color: appColors.black }}>
              Log out
            </ThemedText>
          </TouchableOpacity>
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 25 },
  listContainer: {
    justifyContent: "space-around",
    backgroundColor: appColors.white,
    borderRadius: 10,
    minHeight: 300,
    padding: 8,
  },
  links: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 1,
    minHeight: 45,
    borderBottomWidth: 1,
    borderBottomColor: appColors.gray,
  },
});

export default Profile;
