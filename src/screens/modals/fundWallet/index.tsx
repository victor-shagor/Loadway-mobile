import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";
import CustomButton from "@src/components/CustomButton";

export const ChatModal = () => {

  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
        <View style={{ gap: 10 }}>
        <ThemedText type="title" style={{ color: appColors.deepGray }}>
        Enter an Amount
      </ThemedText>
          <TextInput
            keyboardType="default"
            placeholder="Amount"
            placeholderTextColor={appColors.lightGray}
            style={[styles.input]}
            spellCheck
          />
        </View>
        <CustomButton value={"Fund"} buttonStyle={styles.buttonStyle}/>
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
  buttonStyle:{
    marginVertical: 30
  }
});
export default ChatModal;
