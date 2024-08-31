import React from "react";
import { StyleSheet, View, TextInput, TextInputProps } from "react-native";
import { useOnboarding, OnboardingContextType } from "@src/context/onboarding";
import { ThemedText } from "../ThemedText";
import { appColors } from "@src/constants/colors";
import { capitalizedFirstLetter } from "@src/utils/capitalizedLetter";
import CustomScrollView from "../CustomScrollView";

export const ProfileStyledInput = (props: TextInputProps) => {
  return <TextInput {...props} />;
};

const ViewProfile = () => {
  const { currentUser } = useOnboarding() as OnboardingContextType;

  const userFullName =
    capitalizedFirstLetter(currentUser?.firstName!) +
    " " +
    capitalizedFirstLetter(currentUser?.lastName!);

  return (
    <CustomScrollView>
      <View style={styles.container}>
        <View style={{ gap: 5, flex: 1 }}>
          <ThemedText type="small" style={{ color: appColors.lightGray }}>
            FULL NAME
          </ThemedText>
          <ProfileStyledInput
            editable={false}
            defaultValue={userFullName}
            style={styles.inputStyle}
          />
        </View>

        <View style={{ gap: 5, flex: 1 }}>
          <ThemedText type="small" style={{ color: appColors.lightGray }}>
            PHONE NUMBER
          </ThemedText>
          <ProfileStyledInput
            editable={false}
            defaultValue={currentUser?.phoneNumber}
            style={styles.inputStyle}
          />
        </View>

        <View style={{ gap: 5, flex: 1 }}>
          <ThemedText type="small" style={{ color: appColors.lightGray }}>
            EMAIL ADDRESS
          </ThemedText>
          <ProfileStyledInput
            editable={false}
            defaultValue={currentUser?.email}
            style={styles.inputStyle}
          />
        </View>

        <View style={{ gap: 5, flex: 1 }}>
          <ThemedText type="small" style={{ color: appColors.lightGray }}>
            ADDRESS
          </ThemedText>
          <ProfileStyledInput
            editable={false}
            defaultValue={currentUser?.address}
            style={styles.inputStyle}
          />
        </View>
      </View>
    </CustomScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 25, gap: 25 },
  inputStyle: {
    backgroundColor: appColors.white,
    color: appColors.black,
    minHeight: 50,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
});

export default ViewProfile;
