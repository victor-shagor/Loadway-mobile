import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationStackParamList } from "@/src/navigation";


const LoginButton = () => {
    const navigation = useNavigation<StackNavigationProp<AuthenticationStackParamList>>(); 

  return (
    <View className=" mx-5 bg-[#F6411B] h-[50px] rounded-lg">
      <TouchableOpacity
        activeOpacity={100}
        onPress={()=> navigation.navigate('verify')}
      >
        <View className="bg-[#F6411B] h-full flex-row justify-center items-center rounded-lg">
          <Text className=" font-semibold text-center text-white">Sign in</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoginButton;
