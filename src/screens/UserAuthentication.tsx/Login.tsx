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
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "@src/components/layout/safeAreaView";
import images from "@src/constants/images";
import { Feather } from "@expo/vector-icons";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ToastService } from "react-native-toastier";
import AppToast from "@src/components/common/AppToast";
import { login } from "@src/api/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationStackParamList } from "@src/navigation";
import useOnboardingContext from "@src/utils/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser } from "@src/api/user";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";

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

const Login = () => {
  const navigation =
    useNavigation<StackNavigationProp<AuthenticationStackParamList>>();

  const { setLogin, setCurrentUser } = useOnboardingContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginFormFields: Array<FormField> = [
    {
      name: "email",
      validators: {
        onChange: z.string().email({
          message: "Please enter a valid email",
        }),
      },
      placeholder: "e.g. johndoe@gmail.com",
      keyboardType: "email-address",
      label: "EMAIL ADDRESS",
    },
    {
      name: "password",
      validators: {
        onChange: z.string().min(1, {
          message: "Password is required",
        }),
      },
      placeholder: "Password",
      label: "PASSWORD",
      type: "password",
      keyboardType: "default",
      showRightIcon: true,
    },
  ];

  const save = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  };

  const getValueFor = async (key: string) => {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    }
  };

  useEffect(() => {
    getValueFor("email").then((value) => {
      loginForm.setFieldValue("email", (value as any) || "");
    });
    // getValueFor("password").then((value) => {
    //   loginForm.setFieldValue("password", (value as any) || "");
    // });
  }, []);

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const data = {
        email: (value.email || '').toLowerCase(),
        password: value.password,
      };
      loginMutation.mutate(data as any);
    },
    validatorAdapter: zodValidator(),
  });

  const loginMutation = useMutation({
    mutationFn: async (value) => {
      return await login(value);
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
    onSuccess: async (data) => {
      await AsyncStorage.setItem("accessToken", data?.data?.accessToken);
      const currentUser = await getCurrentUser();
      setCurrentUser(currentUser);
      if (data?.firstLogin) {
        await AsyncStorage.setItem("firstLogin", "true");
        navigation.navigate("updatepassword");
      }
      setLogin(true);
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#FFF1C6",
        },
        children: (
          <AppToast
            message={data?.message || "Login successful"}
            leftIcon='check-circle'
          />
        ),
        right: <View></View>,
      });
      await save("email", loginForm.getFieldValue("email") as string);
      await save("password", loginForm.getFieldValue("password") as string);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !showPassword);
  };

  const gotoForgotPassword = () => {
    navigation.navigate("sendresetemail" as any);
  };

  return (
    <SafeAreaView className='flex-1 pt-4'>
      <StatusBar style='dark' />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, height: "100%" }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className='h-full flex-1 px-[5vw]'>
            <View className='pb-10'>
              <View className='pb-5'>
                <Image source={images.icons.logo} className='w-32 h-[33.8px]' />
              </View>
              <View>
                <Text className='text-black text-3xl font-medium'>Login</Text>
              </View>
            </View>
            <View>
              <View>
                {loginFormFields.map((inputField, index) => (
                  <loginForm.Field
                    key={index}
                    name={inputField.name}
                    validators={inputField.validators as any}
                    children={(field) => (
                      <View
                        className={`${
                          index !== loginFormFields.length - 1
                            ? "mb-5"
                            : "mb-12"
                        }`}
                      >
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
              <loginForm.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <View>
                    <Pressable
                      disabled={!canSubmit || isLoading}
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
                          } h-16 rounded-full justify-center items-center`}
                        >
                          {isLoading ? (
                            <ActivityIndicator
                              size='small'
                              color='#fff'
                              style={{ marginRight: 8 }}
                            />
                          ) : (
                            <Text className='text-white text-center text-lg'>
                              Sign in
                            </Text>
                          )}
                        </View>
                      )}
                    </Pressable>
                  </View>
                )}
              />
              <View>
                <Pressable
                  className='h-14 justify-center'
                  onPress={gotoForgotPassword}
                >
                  {({ pressed }) => (
                    <Text
                      className={`w-fit text-base text-center ${
                        pressed ? "text-[#E85637]" : "text-[#771500]"
                      }`}
                    >
                      Forgot Password
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
          <View className='px-[5vw] mb-2'>
            <Text className='uppercase text-center font-medium text-xs text-black/50'>
              Powered by <Text className='text-black'>Mason Atlantic</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
