import {
  ActivityIndicator,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { ToastService } from "react-native-toastier";
import AppToast from "@src/components/common/AppToast";
import { addToFrequentList, createGateAccess } from "@src/api/gateRequest";
import AccessSent from "@src/components/Modal/AccessSent";
import { OnboardingContextType, useOnboarding } from "@src/context/onboarding";
import { queryClient } from "@src/providers/get-query-client";
import GateAccessCard from "@src/components/GateAccess/GateAccessCard";

type FormField = {
  name: any;
  validators: {
    onChange: z.ZodSchema<any> | any;
    onChangeAsyncDebounceMs?: number;
    onChangeAsync?: z.ZodSchema<any>;
    onChangeListenTo?: Array<string>;
  };
  placeholder: string;
  label?: string;
  type?: string;
  showRightIcon?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

const NewAccessForm = () => {
  const { currentUser } = useOnboarding() as OnboardingContextType;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [accessCodeData, setAccessCodeData] = useState({
    guestName: "",
    phoneNumber: "",
    code: "",
    address: "",
  });

  const formFields: Array<FormField> = [
    {
      name: "guestName",
      validators: {
        onChange: z.string().min(1, {
          message: "Guest name is required",
        }),
      },
      label: "GUEST NAME",
      placeholder: "e.g. John Doe",
      keyboardType: "default",
      showRightIcon: true,
    },
    {
      name: "phoneNumber",
      validators: {
        onChange: z.string().min(1, {
          message: "Phone number is required",
        }),
      },
      label: "PHONE NUMBER",
      placeholder: "e.g 080 123 3456",
      keyboardType: "phone-pad",
      showRightIcon: true,
    },
  ];

  const form = useForm({
    defaultValues: {
      guestName: "",
      phoneNumber: "",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const [firstName, lastName = ""] = value.guestName.split(" ");
      const data = {
        firstName,
        lastName,
        phoneNumber: value.phoneNumber,
      };
      mutation.mutate(data as any);
    },
    validatorAdapter: zodValidator(),
  });

  const mutation = useMutation({
    mutationFn: async (value) => {
      return await createGateAccess(value);
    },
    mutationKey: ["createAccess"],
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
            message={error || "An error occurred"}
            leftIcon='alert-circle'
            color='#fff'
          />
        ),
        right: <View></View>,
      });
    },
    onSuccess: async (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["gateAccess"] });
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#FFF1C6",
        },
        children: (
          <AppToast
            message={data?.message || "Access created successfully"}
            leftIcon='check-circle'
          />
        ),
        right: <View></View>,
      });
      setAccessCodeData({
        guestName: form.getFieldValue("guestName") as string,
        phoneNumber: form.getFieldValue("phoneNumber") as string,
        code: data?.data,
        address: currentUser?.address || "",
      });
      setModalVisible(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const addToFrequent = useMutation({
    mutationFn: async () => {
      return await addToFrequentList({
        phoneNumber: accessCodeData?.phoneNumber || "",
      });
    },
    mutationKey: ["addToFrequent"],
    onError: () => {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#ef4444",
        },
        children: (
          <AppToast
            message={"An error occurred"}
            leftIcon='alert-circle'
            color='#fff'
          />
        ),
        right: <View></View>,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["frequentVisitors"] });
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#FFF1C6",
        },
        children: (
          <AppToast
            message={"Added to frequent list"}
            leftIcon='check-circle'
          />
        ),
        right: <View></View>,
      });
    },
  });

  const handleAddToFrequent = async () => {
    setModalVisible(false);
    await addToFrequent.mutateAsync();
    form.reset();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    form.reset();
  };

  return (
    <View className='flex-grow-0'>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className='px-[5vw]'>
          {formFields.map((inputField, index) => (
            <form.Field
              key={index}
              name={inputField.name}
              validators={inputField.validators as any}
              children={(field) => (
                <View className='mb-5'>
                  <Text className='text-[#050402] text-xs font-medium pb-2'>
                    {inputField.label}
                  </Text>
                  <View className='relative bg-white rounded-lg h-14 justify-center focus:border-black focus:border px-4 box-border'>
                    <TextInput
                      placeholder={inputField.placeholder}
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      keyboardType={inputField.keyboardType}
                    />
                  </View>

                  {!field.state.meta.isPristine &&
                    field.state.meta.errors[0] && (
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
          ))}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <View className='mt-6'>
                <Pressable
                  disabled={!canSubmit || isLoading}
                  onPress={form.handleSubmit}
                >
                  {({ pressed }) => (
                    <View
                      className={`${
                        canSubmit
                          ? pressed
                            ? "bg-[#E8563780]"
                            : "bg-[#E85637]"
                          : "bg-[#E8563740]"
                      } h-16 rounded-full justify-center items-center hover:cursor-pointer`}
                    >
                      {isLoading ? (
                        <ActivityIndicator
                          size='small'
                          color='#fff'
                          style={{ marginRight: 8 }}
                        />
                      ) : (
                        <Text className='text-white text-center text-lg'>
                          Create access
                        </Text>
                      )}
                    </View>
                  )}
                </Pressable>
              </View>
            )}
          />
        </View>
      </KeyboardAvoidingView>
      <AccessSent
        modalVisible={modalVisible}
        closeModal={() => handleCloseModal()}
      >
        <GateAccessCard
          handleAddToFrequent={handleAddToFrequent}
          accessCodeData={accessCodeData}
        />
      </AccessSent>
    </View>
  );
};

export default NewAccessForm;
