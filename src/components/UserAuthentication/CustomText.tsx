import { View, Text } from 'react-native'
import React from 'react'

const CustomText = ({heading, sub_heading}:{heading: string; sub_heading: string}) => {
  return (
    <View>
        <View>
            <Text className=' text-[18px] font-medium text-left ml-5 my-3 text-[#191508]'>{heading}</Text>
            <Text className=' text-[14px] font-normal text-left ml-5 my-3 text-[#3F3C31]'>{sub_heading}</Text>
        </View>
    </View>
  )
}

export default CustomText;