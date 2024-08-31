import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useOnboarding, OnboardingContextType } from "@src/context/onboarding";
import { ThemedText } from "../ThemedText";
import { UserImage } from "./utils";
import { appColors } from "@src/constants/colors";
import { ProfileStyledInput } from "./viewProfiile";
import CustomScrollView from "../CustomScrollView";

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { currentUser } = useOnboarding() as OnboardingContextType;

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <CustomScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <UserImage selectedImage={selectedImage} />

            <TouchableOpacity
              onPress={() => pickProfileImage()}
              style={styles.changeImageButton}
            >
              <ThemedText>Change profile picture</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.userDetailsContainer}>
            <View style={styles.userDetails}>
              <ThemedText type="title">First Name</ThemedText>
              <ProfileStyledInput
                defaultValue={currentUser?.firstName}
                style={styles.inputStyle}
              />
            </View>

            <View style={styles.userDetails}>
              <ThemedText type="title">Last Name</ThemedText>
              <ProfileStyledInput
                defaultValue={currentUser?.lastName}
                style={styles.inputStyle}
              />
            </View>

            <View style={styles.userDetails}>
              <ThemedText type="title">Phone Number</ThemedText>
              <ProfileStyledInput
                defaultValue={currentUser?.phoneNumber}
                style={styles.inputStyle}
              />
            </View>

            <View style={styles.userDetails}>
              <ThemedText type="title">Email</ThemedText>
              <ProfileStyledInput
                defaultValue={currentUser?.email}
                style={styles.inputStyle}
              />
            </View>

            <View style={styles.userDetails}>
              <ThemedText type="title">Address</ThemedText>
              <ProfileStyledInput
                defaultValue={currentUser?.address}
                style={styles.inputStyle}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </CustomScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 25, gap: 30 },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  changeImageButton: {
    backgroundColor: appColors.white,
    borderColor: appColors.gray,
    borderWidth: 0.8,
    borderRadius: 5,
    padding: 8,
    minHeight: 28,
  },
  userDetailsContainer: {
    flex: 1,
    gap: 15,
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    gap: 10,
    minHeight: 45,
    borderBottomWidth: 1,
    borderBottomColor: appColors.gray,
  },
  inputStyle: {
    backgroundColor: "transparent",
    flex: 1,
    minHeight: 50,
    fontSize: 16,
  },
});

export default EditProfile;
