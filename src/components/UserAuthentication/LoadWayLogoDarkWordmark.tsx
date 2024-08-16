import { View, Text, Image } from 'react-native'
import React from 'react'

const icon = require("@/src/assets/icons/LoadWayLogoDarkWordmark.png");
const LoadWayLogoDarkWordmark = () => {
  return (
    <View>
      <View className=" p-5">
          <Image source={icon} />
        </View>
    </View>
  )
}

export default LoadWayLogoDarkWordmark;