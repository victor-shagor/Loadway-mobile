import { View, Text } from 'react-native'
import React from 'react'

const CustomText = ({text}:{text: string;}) => {
  return (
    <View>
      <Text 
       className=' text-[#191508] font-semibold text-[16px] ml-[7%] 
       mt-[7%] mb-[1%]'>
         {text}
        </Text>
    </View>
  );
};

export default CustomText;