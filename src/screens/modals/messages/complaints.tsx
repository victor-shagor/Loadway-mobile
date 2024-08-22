import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { EvilIcons } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";
import CustomButton from "@src/components/CustomButton";

export const ComplaintModal = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState("");

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedFile(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={{ color: appColors.deepGray }}>
        Fill the complaint form
      </ThemedText>

      <View style={{ gap: 20 }}>
        <View style={{ gap: 10 }}>
          <TextInput
            keyboardType="default"
            placeholder="Title"
            placeholderTextColor={appColors.lightGray}
            style={styles.input}
          />

          <TextInput
            keyboardType="default"
            placeholder="Description"
            placeholderTextColor={appColors.lightGray}
            style={[styles.input, { height: 75 }]}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            spellCheck
          />

          {/* <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            // style={styles.input}
            // mode="dropdown"
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="javascript" />
            <Picker.Item label="Python" value="python" />
            <Picker.Item label="C++" value="cpp" />
          </Picker> */}

          <View style={{ gap: 10 }}>
            <TouchableOpacity
              onPress={() => selectImage()}
              style={[styles.input, styles.imagePicker]}
            >
              <ThemedText style={{ color: appColors.lightGray }}>
                Attachment
              </ThemedText>
              <EvilIcons name="image" size={24} color={appColors.lightGray} />
            </TouchableOpacity>

            {selectedFile && (
              <Image
                source={{ uri: selectedFile }}
                style={styles.selectedImage}
              />
            )}
          </View>
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
export default ComplaintModal;
