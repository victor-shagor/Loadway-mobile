import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { renderIcon } from "../common/renderIcon";
import { getHelp } from "@src/constants/data";
import { appColors } from "@src/constants/colors";
import chunkArray from "@src/utils/chunkArray";


const GetHelp = ({ data }: { data: getHelp[] }) => {


  const rows = chunkArray(data, 2);

  
  return (
    <View className="">
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-center items-center ml-[-5vw]">
          {row.map((data, index) => {
            const { title, desc, icon, iconProvider, color } = data;
            return (
              <TouchableOpacity
                className=" bg-[#D4D4D429] my-[1.5%] p-[2%]
              item-center mx-[1%] rounded-lg
             "
                key={index}
              >
                <View
                  style={{ backgroundColor: color }}
                  className=" w-10 h-10 flex-row justify-center
               items-center rounded-full p-[10px] m-[5px]
              "
                >
                  {renderIcon(icon, iconProvider, 20, appColors.white)}
                </View>
                <View>
                  <Text className=" font-semibold text-[#3F3C31] text-[14px]">
                    {title}
                  </Text>
                  <Text className=" font-normal text-[#66635A] text-[12px] pt-2">
                    {desc}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default GetHelp;
