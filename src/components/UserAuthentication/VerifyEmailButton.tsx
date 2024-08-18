import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useOnboardingContext from '@src/utils/Context'



const VerifyEmailButton = () => {
  const {color } = useOnboardingContext();
  return (
    <View className={`mx-5 bg-[${color}] h-[50px] rounded-lg`}>
      <TouchableOpacity
        activeOpacity={100}
        // onPress={()=> navigation.navigate('verify')}
      >
        <View className={`bg-[${color}] h-full flex-row justify-center items-center rounded-lg`}>
          <Text className=" font-semibold text-center text-white">Verify now</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default VerifyEmailButton;