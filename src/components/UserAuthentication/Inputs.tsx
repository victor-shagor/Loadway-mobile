import React, { useState } from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import useOnboardingContext from "@src/utils/Context";
import AuthInputs from "@src/utils/AuthInputValues";

export const EmailInput = ({ action }: { action: string }) => {
  const inputValue = AuthInputs();

  const setEmailValue = (value: string) => {
    if (action === "setLoginEmail") {
      const newLoginDetails = { ...inputValue.loginDetails, email: value };
      inputValue.setLoginDetails(newLoginDetails);
    } else if (action === "changePassword") {
      const NewChangePasswordDetails = {
        ...inputValue.changePasswordDetails,
        email: value,
      };
      inputValue.setChangePasswordDetails(NewChangePasswordDetails);
      const NewRestPasswordDetails = {
        ...inputValue.resetPassword,
        email: value,
      };
      inputValue.setResetPassword(NewRestPasswordDetails);
    } 
    // else if (action === "resetpassword") {
    //   const NewRestPasswordDetails = {
    //     ...inputValue.resetPassword,
    //     email: value,
    //   };
    //   console.log(NewRestPasswordDetails);
    //   inputValue.setResetPassword(NewRestPasswordDetails);
    // }
  };

  return (
    <View className="mb-3">
      <TextInput
        placeholder="Email"
        placeholderTextColor={"black"}
        inputMode="email"
        enterKeyHint="enter"
        autoComplete="email"
        className=" border-2 border-[#52514E4D] mx-[5vw] h-[43px] px-[5vw]
       rounded-lg
      "
        onChangeText={(value) => setEmailValue(value)}
      />
    </View>
  );
};

export const PasswordInput = ({ action, placeholder }: { action: string; placeholder?: string; }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const changeVisibilty = () => {
    setShowPassword((prev) => !showPassword);
  };
  const inputValue = AuthInputs();

  const { setLoginDetails, loginDetails } = useOnboardingContext();

  const placeHolderText = placeholder || 'Password';

  const setPasswordValue = (value: string) => {
    if (action === "setLoginEmail") {
      const newLoginDetails = { ...loginDetails, password: value };
      setLoginDetails(newLoginDetails);
    } else if (action === "resetpassword") {
      const NewRestPasswordDetails = {
        ...inputValue.resetPassword,
        newPassword: value,
      };
      console.log(NewRestPasswordDetails);
      inputValue.setResetPassword(NewRestPasswordDetails);
    }
  };

  return (
    <View className=" relative">
      <TextInput
        placeholder={placeHolderText}
        placeholderTextColor={"black"}
        secureTextEntry={showPassword}
        autoComplete="password"
        inlineImageLeft="eyeOpen"
        className=" border-2 border-[#52514E4D] mx-[5vw] h-[43px] px-[5vw]
        rounded-lg
      "
        onChangeText={(value) => setPasswordValue(value)}
      />

      <TouchableOpacity
        className="absolute top-3 right-8"
        onPress={changeVisibilty}
      >
        <Feather
          name={showPassword ? "eye" : "eye-off"}
          size={18}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};
