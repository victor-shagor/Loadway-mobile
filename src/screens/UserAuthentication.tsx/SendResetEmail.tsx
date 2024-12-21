import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "@src/components/layout/safeAreaView";
import { Feather } from "@expo/vector-icons";
import { FieldApi, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ToastService } from "react-native-toastier";
import AppToast from "@src/components/common/AppToast";
import { login } from "@src/api/auth";
import { useNavigation } from "@react-navigation/native";

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

const SendResetEmail = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formFields: Array<FormField> = [
    {
      name: "email",
      validators: {
        onChange: z.string().email({
          message: "Please enter a valid email",
        }),
      },
      placeholder: "Email Address",
      keyboardType: "email-address",
    },
  ];

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      const data = {
        email: value.email,
      };
      mutation.mutate(data as any);
    },
    validatorAdapter: zodValidator(),
  });

  const mutation = useMutation({
    mutationFn: (value) => {
      return login(value);
    },
    mutationKey: ["signIn"],
    onError: (error) => {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#ef4444",
        },
        children: (
          <AppToast
            message='An error occurred'
            leftIcon='alert-circle'
            color='#fff'
          />
        ),
        right: <View></View>,
      });
    },
    onSuccess: (data) => {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#FFF1C6",
        },
        children: (
          <AppToast message='Login successful' leftIcon='check-circle' />
        ),
        right: <View></View>,
      });
      navigation.navigate("resetpassword");
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !showPassword);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, height: "100%" }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 0.1 }}>
          <View className='h-full flex-1 px-[5vw]'>
            <View className='flex gap-8 pb-10'>
              <View className='flex'>
                <Text className='text-black text-3xl font-medium pb-2'>
                  Reset Password
                </Text>
                <Text className='text-[#4b4b4b] text-xl font-lg'>
                  Enter the code sent to
                </Text>
              </View>
            </View>
            <View>
              <View className='flex pb-12'>
                {formFields.map((inputField, index) => (
                  <form.Field
                    key={index}
                    name={inputField.name}
                    validators={inputField.validators as any}
                    children={(field) => (
                      <View className='mb-6'>
                        <View className='relative bg-white rounded-lg h-14 flex justify-center focus:border-black focus:border px-4 box-border'>
                          <TextInput
                            placeholder={inputField.placeholder}
                            secureTextEntry={
                              inputField.type === "password" && !showPassword
                            }
                            value={field.state.value}
                            onChangeText={field.handleChange}
                            keyboardType={inputField.keyboardType}
                          />

                          {inputField.type && (
                            <Pressable
                              className='absolute right-4 top-0 bottom-0 auto flex justify-center'
                              onPress={togglePasswordVisibility}
                            >
                              <Feather
                                name={showPassword ? "eye" : "eye-off"}
                                size={18}
                                color='black'
                              />
                            </Pressable>
                          )}
                        </View>
                        {!field.state.meta.isPristine &&
                          field.state.meta.errors[0] && (
                            <Text className='text-red-500 text-xs absolute top-14'>
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
              </View>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <View>
                    <Pressable
                      disabled={!canSubmit}
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
                          } h-16 rounded-full flex justify-center items-center hover:cursor-pointer`}
                        >
                          <Text className='text-white text-center text-lg'>
                            Find my account
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SendResetEmail;
