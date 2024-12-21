import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "@src/components/layout/safeAreaView";
import images from "@src/constants/images";
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

const Login = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginFormFields: Array<FormField> = [
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
    {
      name: "password",
      validators: {
        onChange: z.string().min(1, {
          message: "Password is required",
        }),
      },
      placeholder: "Password",
      type: "password",
      keyboardType: "default",
      showRightIcon: true,
    },
  ];

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const data = {
        email: value.email,
        password: value.password,
      };
      loginMutation.mutate(data as any);
    },
    validatorAdapter: zodValidator(),
  });

  const loginMutation = useMutation({
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
      // console.log({ data });
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
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !showPassword);
  };

  const gotoForgotPassword = () => {
    navigation.navigate("sendresetemail");
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
              <View>
                <Image source={images.icons.logo} className='w-32 h-[33.8px]' />
              </View>
              <View className='flex'>
                <Text className='text-black text-3xl font-medium pb-2'>
                  Bills. Services. Security
                </Text>
                <Text className='text-[#4b4b4b] text-xl font-lg'>
                  Login to your account
                </Text>
              </View>
            </View>
            <View>
              <View className='flex'>
                {loginFormFields.map((inputField, index) => (
                  <loginForm.Field
                    key={index}
                    name={inputField.name}
                    validators={inputField.validators as any}
                    children={(field) => (
                      <View className='mb-6'>
                        {/* <View className='bg-white rounded-lg h-14 flex justify-center focus:border-black focus:border px-4 box-border'>
                      <TextInput placeholder={inputField.placeholder} />
                    </View> */}
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
              <View className='flex justify-end pb-12'>
                <Pressable
                  className='flex-end self-end h-10 flex justify-center center'
                  onPress={gotoForgotPassword}
                >
                  {({ pressed }) => (
                    <Text
                      className={`w-fit text-base self-end text-right ${
                        pressed ? "text-[#E85637]" : "text-[#771500]"
                      }`}
                    >
                      Forgot Password
                    </Text>
                  )}
                </Pressable>
              </View>
              <loginForm.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <View>
                    <Pressable
                      disabled={!canSubmit}
                      onPress={loginForm.handleSubmit}
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
                            Sign in
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

export default Login;
