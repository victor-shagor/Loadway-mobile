import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardTypeOptions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { createComplaints } from "@src/api/complaints";
import { appColors } from "@src/constants/colors";
import { useUploadImage } from "@src/hooks/imageUpload";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { ToastService } from "react-native-toastier";
import AppToast from "@src/components/common/AppToast";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useMutation } from "@tanstack/react-query";
import { Dropdown } from "react-native-element-dropdown";
import { complaintCategories } from "@src/constants/data";
import { queryClient } from "@src/providers/get-query-client";

type FormField = {
  name: any;
  validators: {
    onChange: z.ZodSchema<any> | any;
    onChangeAsyncDebounceMs?: number;
    onChangeAsync?: z.ZodSchema<any>;
    onChangeListenTo?: Array<string>;
  };
  placeholder: string;
  type?: string;
  showRightIcon?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export const ComplaintModal = ({
  handleCreateComplaint,
}: {
  handleCreateComplaint: () => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const uploadImage = useUploadImage("/file-upload");

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

  const uploadFile = async () => {
    try {
      const response = await uploadImage(selectedFile);
      return response.url;
    } catch (error: any) {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#ef4444",
        },
        children: (
          <AppToast
            message={error?.message || "Unable to upload image"}
            leftIcon='alert-circle'
            color='#fff'
          />
        ),
        right: <View></View>,
      });
    }
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formFields: Array<FormField> = [
    {
      name: "category",
      validators: {
        onChange: z.string().min(1, {
          message: "Please select a category",
        }),
      },
      placeholder: "e.g. Plumbing",
    },
    {
      name: "description",
      validators: {
        onChange: z.string().min(1, {
          message: "Description is required",
        }),
      },
      placeholder: "What's happening",
      keyboardType: "default",
    },
    {
      name: "attachment",
      validators: {
        onChange: z.any(),
      },
      placeholder: "Attachment",
    },
  ];

  const form = useForm({
    defaultValues: {
      category: "",
      description: "",
      attachment: [],
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      let url;
      if (selectedFile) {
        url = await uploadFile();
      }
      const data = {
        personnel: "PROPERTY_MANAGER",
        title: value.category,
        description: value.description,
        attachment: [url],
      };
      mutation.mutate(data as any);
    },
    validatorAdapter: zodValidator(),
  });

  const mutation = useMutation({
    mutationFn: async (value) => {
      return await createComplaints(value);
    },
    mutationKey: ["complaints"],
    onError: (error: any) => {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#ef4444",
        },
        children: (
          <AppToast
            message={error?.response?.data?.message || "An error occurred"}
            leftIcon='alert-circle'
            color='#fff'
          />
        ),
        right: <View></View>,
      });
    },
    onSuccess: async (data: any) => {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#FFF1C6",
        },
        children: (
          <AppToast
            message={data?.message || "Complaint created successfully"}
            leftIcon='check-circle'
          />
        ),
        right: <View></View>,
      });
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      handleCreateComplaint();
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  return (
    <View className='px-4 py-8 bg-[#F2F2F2] rounded-t-xl' style={{ gap: 16 }}>
      <View className='flex-row justify-between items-center'>
        <Text className='text-xl font-medium'>NEW COMPLAINT</Text>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Pressable
              disabled={!canSubmit || isLoading}
              onPress={form.handleSubmit}
              children={({ pressed }) => (
                <View
                  className={`${
                    canSubmit
                      ? pressed
                        ? "bg-[#E8563780]"
                        : "bg-[#E85637]"
                      : "bg-[#E8563740]"
                  } h-12 rounded-full flex justify-center items-center w-20`}
                >
                  {isLoading ? (
                    <ActivityIndicator
                      size='small'
                      color='#fff'
                      style={{ marginRight: 8 }}
                    />
                  ) : (
                    <Text className='text-white text-center text-lg'>SEND</Text>
                  )}
                </View>
              )}
            />
          )}
        />
      </View>
      <View>
        <form.Field
          name='category'
          validators={formFields[0].validators as any}
          children={(field) => (
            <View className='mb-6' style={{ gap: 8 }}>
              <Text className='text-[#050402] text-xs font-medium'>
                COMPLAINT CATEGORY
              </Text>
              <View className='bg-white rounded-lg h-14 flex justify-center focus:border-black focus:border px-4 box-border'>
                <Dropdown
                  data={complaintCategories}
                  maxHeight={300}
                  labelField='label'
                  valueField='value'
                  placeholder='e.g. Plumbing'
                  onChange={(e) => field.handleChange(e.value)}
                  value={field.state.value}
                />
              </View>
              {!field.state.meta.isPristine && field.state.meta.errors[0] && (
                <Text className='text-red-500 text-xs absolute top-20'>
                  {
                    field.state.meta.errors[0]
                      .toString()
                      .split(",")[0] as string
                  }
                </Text>
              )}
            </View>
          )}
        />
        <form.Field
          name='description'
          validators={formFields[1].validators as any}
          children={(field) => (
            <View className='mb-6' style={{ gap: 8 }}>
              <Text className='text-[#050402] text-xs font-medium'>
                DESCRIPTION
              </Text>
              <View className='bg-white rounded-lg p-4 h-32 flex justify-start focus:border-black focus:border px-4 box-border'>
                <TextInput
                  placeholder="What's happening?"
                  value={field.state.value}
                  onChangeText={field.handleChange}
                  keyboardType={formFields[1].keyboardType}
                  multiline
                  numberOfLines={4}
                  spellCheck
                />
              </View>
              {!field.state.meta.isPristine && field.state.meta.errors[0] && (
                <Text className='text-red-500 text-xs absolute top-[156px]'>
                  {
                    field.state.meta.errors[0]
                      .toString()
                      .split(",")[0] as string
                  }
                </Text>
              )}
            </View>
          )}
        />
        <form.Field
          name='attachment'
          validators={formFields[2].validators as any}
          children={(field) => (
            <View className='mb-6' style={{ gap: 8 }}>
              <Text className='text-[#050402] text-xs font-medium'>
                ATTACHMENT
              </Text>
              <Pressable
                onPress={() => selectImage()}
                children={({ pressed }) => {
                  return selectedFile ? (
                    <Image
                      source={{ uri: selectedFile }}
                      style={styles.selectedImage}
                      className='rounded-lg'
                      width={128}
                      height={128}
                    />
                  ) : (
                    <View
                      className={`${
                        pressed ? "opacity-50" : ""
                      } bg-white rounded-lg h-32 w-32 flex justify-center items-center focus:border-black focus:border px-4 box-border`}
                    >
                      <Feather name='plus' size={24} color='#000' />
                    </View>
                  );
                }}
              />
            </View>
          )}
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
  input: {},
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
