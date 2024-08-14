import { View, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const eyeOpen = require("@/src/assets/icons/view.png");
const eyeClosed = require("@/src/assets/icons/hide.png");

export const EmailInput = () => {
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
      />
    </View>
  );
};
export const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const changeVisibilty = () => {
    setShowPassword((prev) => !showPassword);
  };

  return (
    <View className=" relative">
      <TextInput
        placeholder="Password"
        placeholderTextColor={"black"}
        secureTextEntry={showPassword}
        autoComplete="password"
        inlineImageLeft="eyeOpen"
        className=" border-2 border-[#52514E4D] mx-[5vw] h-[43px] px-[5vw]
        rounded-lg
      "
      />
      {showPassword ? (
        <TouchableOpacity className="absolute top-[1.5vh] right-[10vw]"
        onPress={changeVisibilty}
        >
          <Image
            source={eyeOpen}
            className=" w-[3vh] h-[3vh]"
            // onProgress={changeVisibilty}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity className="absolute top-[1.5vh] right-[10vw]"
        onPress={changeVisibilty}
        >
        <Image
          source={eyeClosed}
          className=" w-[3vh] h-[3vh]"
        //   onProgress={changeVisibilty}
        />
        </TouchableOpacity>
      )}
    </View>
  );
};
