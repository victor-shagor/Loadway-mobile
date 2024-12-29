import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardTypeOptions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FieldApi, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ToastService } from "react-native-toastier";
import AppToast from "@src/components/common/AppToast";
import { resetPassword } from "@src/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationStackParamList } from "@src/navigation";
import { OnboardingContextType, useOnboarding } from "@src/context/onboarding";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";

type FormField = {
  name: any;
  validators: {
    onChange: z.ZodSchema<any> | any;
    onChangeAsyncDebounceMs?: number;
    onChangeAsync?: z.ZodSchema<any>;
    onChangeListenTo?: Array<string>;
  };
  placeholder: string;
  label: string;
  type?: string;
  showRightIcon?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<Array<boolean>>([
    false,
    false,
    false,
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendEmail, setResendEmail] = useState<string>("");
  const navigation =
    useNavigation<StackNavigationProp<AuthenticationStackParamList>>();

  const { setCurrentUser, setLogin } = useOnboarding() as OnboardingContextType;
  useEffect(() => {
    AsyncStorage.getItem("resetEmail").then((value) => {
      setResendEmail(value || "");
    });
  }, []);

  const formFields: Array<FormField> = [
    {
      name: "code",
      validators: {
        onChange: z.string().min(1, {
          message: "Reset code is required",
        }),
      },
      placeholder: "Paste code here",
      label: "VERIFICATION CODE",
      keyboardType: "number-pad",
    },
    {
      name: "newPassword",
      validators: {
        onChange: z
          .string()
          .min(1, {
            message: "Password is required",
          })
          .regex(/(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least one special character",
          })
          .regex(/\w*[a-z]\w*/, "Must have a small letter")
          .regex(/\w*[A-Z]\w*/, "Must have a capital letter")
          .regex(/\d/, "Must have a number")
          .regex(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Must have a special character")
          .min(8, "Password must be at least 8 characters long"),
      },
      placeholder: "New password",
      label: "NEW PASSWORD",
      type: "password",
      keyboardType: "default",
      showRightIcon: true,
    },
    {
      name: "confirmPassword",
      validators: {
        onChangeListenTo: ["newPassword"],
        onChange: ({
          value,
          fieldApi,
        }: {
          value: string;
          fieldApi: FieldApi<any, any>;
        }) => {
          if (value !== fieldApi.form.getFieldValue("newPassword")) {
            return "Passwords do not match";
          }
          return undefined;
        },
      },
      placeholder: "Confirm password",
      label: "CONFIRM PASSWORD",
      type: "password",
      keyboardType: "default",
      showRightIcon: true,
    },
  ];

  const form = useForm({
    defaultValues: {
      email: "",
      newPassword: "",
      initialLogin: false,
      code: "",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const data = {
        email: resendEmail,
        newPassword: value.newPassword,
        code: value.code,
        initialLogin: value.initialLogin,
      };
      mutation.mutate(data as any);
    },
    validatorAdapter: zodValidator(),
  });

  const mutation = useMutation({
    mutationFn: (value) => {
      return resetPassword(value);
    },
    mutationKey: ["signIn"],
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
            message={data?.message || "Password reset successful"}
            leftIcon='check-circle'
          />
        ),
        right: <View></View>,
      });
      AsyncStorage.removeItem("resetEmail");
      await SecureStore.deleteItemAsync("password")
      setLogin(false);
      setCurrentUser(null);
      navigation.navigate("login" as any);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const togglePasswordVisibility = (idx: number) => {
    setShowPassword(
      showPassword.map((password, index) => {
        if (index === idx) {
          return !password;
        }
        return password;
      })
    );
  };

  return (
    <View className='flex-1 pt-4'>
      <StatusBar style='dark' />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, height: "100%" }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 0.1 }}>
          <View className='h-full flex-1 px-[5vw]'>
            <View className='pb-6'>
              <View>
                <Text className='text-black text-3xl font-medium pb-0.5'>
                  Reset password
                </Text>
                <Text className='text-[#4b4b4b] text-lg'>
                  Enter the code sent to {resendEmail}
                </Text>
              </View>
            </View>
            <View>
              <View className='pb-7'>
                {formFields.map((inputField, index) => (
                  <form.Field
                    key={index}
                    name={inputField.name}
                    validators={inputField.validators as any}
                    children={(field) => (
                      <View className='mb-5'>
                        <Text className='text-[#050402] text-xs font-medium pb-1'>
                          {inputField.label}
                        </Text>
                        <View className='bg-white rounded-lg h-14 justify-center focus:border-black focus:border px-4 box-border'>
                          <TextInput
                            placeholder={inputField.placeholder}
                            secureTextEntry={
                              inputField.type === "password" &&
                              !showPassword[index]
                            }
                            value={field.state.value}
                            onChangeText={field.handleChange}
                            keyboardType={inputField.keyboardType}
                          />

                          {inputField.type && (
                            <Pressable
                              className='absolute right-4 top-0 bottom-0 justify-center'
                              onPress={() => togglePasswordVisibility(index)}
                            >
                              <Feather
                                name={showPassword[index] ? "eye" : "eye-off"}
                                size={18}
                                color='black'
                              />
                            </Pressable>
                          )}
                        </View>
                        {!field.state.meta.isPristine &&
                          field.state.meta.errors[0] && (
                            <Text className='text-red-500 text-xs absolute top-[77px]'>
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
                              Update password
                            </Text>
                          )}
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
    </View>
  );
};

export default ResetPassword;
