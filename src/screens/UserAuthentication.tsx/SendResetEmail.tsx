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
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ToastService } from "react-native-toastier";
import AppToast from "@src/components/common/AppToast";
import { sendResetPasswordCode } from "@src/api/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationStackParamList } from "@src/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  label: string,
  showRightIcon?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

const SendResetEmail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation =
    useNavigation<StackNavigationProp<AuthenticationStackParamList>>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formFields: Array<FormField> = [
    {
      name: "email",
      validators: {
        onChange: z.string().email({
          message: "Please enter a valid email",
        }),
      },
      placeholder: "e.g. johndoe@gmail.com",
      label: "EMAIL ADDRESS",
      keyboardType: "email-address",
    },
  ];

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const data = {
        email: value.email,
      };
      mutation.mutate(data as any);
    },
    validatorAdapter: zodValidator(),
  });

  const mutation = useMutation({
    mutationFn: async (value: any) => {
      await AsyncStorage.setItem("resetEmail", value?.email || "");
      return sendResetPasswordCode(value);
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
    onSuccess: (data) => {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#FFF1C6",
        },
        children: (
          <AppToast
            message={data?.data?.message || "Authentication code sent"}
            leftIcon='check-circle'
          />
        ),
        right: <View></View>,
      });
      navigation.navigate("resetpassword" as any);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !showPassword);
  };
  return (
    <View className="flex-1 pt-4">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, height: "100%" }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 0.1 }}>
          <View className='h-full flex-1 px-[5vw]'>
            <View className='pb-8'>
              <View>
                <Text className='text-black text-3xl font-medium pb-0.5'>
                  Reset password
                </Text>
                <Text className='text-[#4b4b4b] text-lg'>
                  Enter a valid email address
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
                              inputField.type === "password" && !showPassword
                            }
                            value={field.state.value}
                            onChangeText={field.handleChange}
                            keyboardType={inputField.keyboardType}
                          />

                          {inputField.type && (
                            <Pressable
                              className='absolute right-4 top-0 bottom-0 justify-center'
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
                              Find my account
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

export default SendResetEmail;