import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons/";
import { Image } from "expo-image";
import { ThemedText } from "../ThemedText";
import { OnboardingContextType, useOnboarding } from "@src/context/onboarding";
import { appColors } from "@src/constants/colors";

export type AccountStackParamList = {
  EditProfile: undefined;
  Profile: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  AccountStackParamList,
  keyof AccountStackParamList
>;

export const UserImage = ({ selectedImage }: { selectedImage?: string }) => {
  const { currentUser } = useOnboarding() as OnboardingContextType;

  if (selectedImage) {
    return (
      <Image source={selectedImage} style={styles.userImage} />
    );
  }

  if (currentUser?.profilePicture) {
    return (
      <Image source={currentUser?.profilePicture} style={styles.userImage} />
    );
  }

  return (
    <>
        <View style={styles.userImage}>
          <AntDesign name="user" size={24} color={appColors.black} />
        </View>
    </>
  );
};

export const GoToEditScreen = () => {
  const { navigate } = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigate("EditProfile")}
      style={{ marginRight: 10 }}
    >
      <ThemedText>Edit</ThemedText>
    </TouchableOpacity>
  );
};

export const SaveEditedChanges = ({save}:any) => {
  const { navigate } = useNavigation<NavigationProp>();
  const handleSave = async () => {
    await save();
    navigate("Profile");
  }
  return (
    <TouchableOpacity style={{ marginRight: 10 }} onPress={handleSave}>
      <ThemedText>Save</ThemedText>
    </TouchableOpacity>
  );
};

export const CancelEdit = () => {
  const { navigate } = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => navigate("Profile")}
      style={{ marginHorizontal: 10 }}
    >
      <ThemedText style={{ color: appColors.lightGray }}>Cancel</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userImage: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: 65,
    height: 65,
  },
});
