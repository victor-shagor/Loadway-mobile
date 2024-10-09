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
import { createComplaints } from "@src/api/complaints";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";
import CustomButton from "@src/components/CustomButton";
import { updateState } from "@src/utils/updateState";
import { ToastNotification } from "@src/utils/toastMessage";
import { useOnboarding } from "@src/context/onboarding";
import { useUploadImage } from "@src/hooks/imageUpload";

export const ComplaintModal = ({
  handleCreateComplaint,
}: {
  handleCreateComplaint: (payload:any) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [complaintFormData, setComplaintsFormData] = useState({
    title: "",
    description: "",
    status: false,
  });
  const uploadImage = useUploadImage('/file-upload');

  const handleUpdateComplaints = (
    updates: Partial<{ title: string; description: string; status: boolean }>
  ) => {
    setComplaintsFormData((prev) => updateState(prev, updates));
  };

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

  const postComplaint = async () => {
    if (
      !complaintFormData.title ||
      !complaintFormData.description
    ) {
      ToastNotification("error", "Cannot make empty complaints");
      return;
    }

    handleUpdateComplaints({ status: true });

    

    try {
      let uploadedFile = null;
      if (selectedFile) {
        uploadedFile = await uploadImage(selectedFile); // Upload a single image
      }
      const payload = {
        personnel: "PROPERTY_MANAGER",
        title: complaintFormData.title,
        description: complaintFormData.description,
        attachment: [uploadedFile.url],
      };

      handleCreateComplaint(payload);
    } catch (error:any) {
      // console.log(error.response.data);
      ToastNotification("error", "An error occurred");
    } finally {
      handleUpdateComplaints({ status: false });
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
            onChangeText={(text) => handleUpdateComplaints({ title: text })}
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
            onChangeText={(text) =>
              handleUpdateComplaints({ description: text })
            }
          />

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
        <CustomButton
          value={"Submit"}
          disable={complaintFormData.status}
          isLoading={complaintFormData.status}
          onPress={postComplaint}
        />
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
