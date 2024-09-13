import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";
import CustomButton from "@src/components/CustomButton";
import SelectImage from "@src/components/common/SelectImage";


export const ChatModal = () => {
  

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={{ color: appColors.deepGray }}>
        Fill the form to send a message
      </ThemedText>

      <View style={{ gap: 20 }}>
        <View style={{ gap: 10 }}>
          <TextInput
            keyboardType="default"
            placeholder="Message"
            placeholderTextColor={appColors.lightGray}
            style={[styles.input, { height: 75 }]}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            spellCheck
          />

         <SelectImage />
        </View>
        <CustomButton value={"Submit"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.modalBackground,
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 20,
  },
  input: {
    padding: 10,
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: appColors.gray,
    borderRadius: 6,
    height: 48,
  },
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  selectedImage: {
    width: 200,
    height: 200,
  },
});
export default ChatModal;
