import { View, Text } from 'react-native'
import React from 'react'
import { renderIcon } from '../common/renderIcon'
import { getHelp } from '@src/constants/data';
import { appColors } from '@src/constants/colors';

const GetHelp = ({data}:{data: getHelp[]}) => {
  return (
    <View>

      {
        data.map((data, index) =>{

          const { title, desc, icon, iconProvider, color} = data;
          return(
            <View 
             className=' flex-row gap-[3%] bg-[#D4D4D429] my-[1.5%] p-[4%]
              item-center mx-[6%] rounded-lg shadow-sm shadow-slate-500
             '
             key={index}
             >
              <View style={{ backgroundColor: color}}
              className=' w-[12vw] h-[6vh] flex-row justify-center
               items-center rounded-full
              '
              >
              {renderIcon(icon, iconProvider, 20, appColors.white)}
              </View>
              <View>
                <Text 
                 className=' font-semibold text-[#3F3C31] text-[14px]'> 
                 {title}
                </Text>
                <Text 
                className=' font-normal text-[#66635A] text-[12px] pt-2'>
                  {desc}
                </Text>
              </View>
            </View>
          )
        })
      }
    </View>
  )
}

export default GetHelp