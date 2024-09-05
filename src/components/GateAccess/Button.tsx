import { View, TouchableOpacity } from 'react-native'
import React from 'react';
import { AntDesign } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { appColors } from "@src/constants/colors";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { NewRequestStackParamList } from '@src/navigation/DashboardStack'; 


const Button = () => {

   
    const navigation =
    useNavigation<StackNavigationProp<NewRequestStackParamList>>();

  return (
      <View
          className="bg-[#F6411B] w-[30vw] py-[1.5vh]
       rounded-3xl absolute bottom-[30vh] right-5"
        >
          <TouchableOpacity className="flex-row justify-center items-center"
          onPress={()=>navigation.navigate('newrequest')}
          >
            <AntDesign name="plus" size={15} color={appColors.white} />
            <ThemedText style={{ color: appColors.white }}>New Chat</ThemedText>
          </TouchableOpacity>
        </View>
  )
}

export default Button