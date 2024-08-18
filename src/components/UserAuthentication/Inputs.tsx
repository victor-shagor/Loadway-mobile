import { View, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import useOnboardingContext from "@src/utils/Context";
import AuthInputs from "@src/utils/AuthInputValues";
import images from "@src/constants/images";



export const EmailInput = ({action}:{ action: string}) => {


  const inputValue = AuthInputs();

  const setEmailValue = (value : string)=>{
    if (action === 'setLoginEmail') {
      const newLoginDetails = {...inputValue.loginDetails, email: value};
      inputValue.setLoginDetails(newLoginDetails);
    }else if(action === 'changePassword'){
      const NewChangePasswordDetails = {...inputValue.changePasswordDetails,email: value};
      inputValue.setChangePasswordDetails(NewChangePasswordDetails);
    }else if(action === 'resetpassword'){
      const NewRestPasswordDetails = {...inputValue.resetPassword, email: value};
      console.log(NewRestPasswordDetails)
      inputValue.setResetPassword(NewRestPasswordDetails);
    }
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
      onChangeText={(value)=>setEmailValue(value)}
      />
    </View>
  );
};


export const PasswordInput = ({action}:{ action: string}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const changeVisibilty = () => {
    setShowPassword((prev) => !showPassword);
  };
  const inputValue = AuthInputs();

  const {setLoginDetails , loginDetails} = useOnboardingContext();

   const setPasswordValue = (value : string)=>{
    if (action === 'setLoginEmail') {
      const newLoginDetails = {...loginDetails, password: value};
      setLoginDetails(newLoginDetails);
    }else if(action === 'resetpassword'){
      const NewRestPasswordDetails = {...inputValue.resetPassword, newPassword: value};
      console.log(NewRestPasswordDetails)
      inputValue.setResetPassword(NewRestPasswordDetails);
    }
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
      onChangeText={(value)=>setPasswordValue(value)}
      />
      {showPassword ? (
        <TouchableOpacity className="absolute top-[1.5vh] right-[10vw]"
        onPress={changeVisibilty}
        >
          <Image
            source={images.onboarding.eyeOpen}
            className=" w-[3vh] h-[3vh]"
            // onProgress={changeVisibilty}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity className="absolute top-[1.5vh] right-[10vw]"
        onPress={changeVisibilty}
        >
        <Image
          source={images.onboarding.eyeClosed}
          className=" w-[3vh] h-[3vh]"
        //   onProgress={changeVisibilty}
        />
        </TouchableOpacity>
      )}
    </View>
  );
};
