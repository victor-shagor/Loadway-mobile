import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@src/constants/images';

const LoadWayLogoDarkWordmark = () => {
  return (
    <View>
      <View className=" p-5">
          <Image source={images.onboarding.logo} style={{ width: 100, height: 100 }} resizeMode="contain"/>
        </View>
    </View>
  )
}

export default LoadWayLogoDarkWordmark;