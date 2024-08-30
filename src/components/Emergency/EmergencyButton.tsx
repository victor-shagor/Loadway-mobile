import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { renderIcon } from "../common/renderIcon";
import { appColors } from "@src/constants/colors";
import { IconProvider } from "@src/constants/data";

export type EmergencyButtonProps = {
  text: "Call Now" | "Copy Phone Number";
  icon: string;
  iconProvider: IconProvider;
  color: string;
};
const EmergencyButton = ({
  text,
  icon,
  iconProvider,
  color,
}: EmergencyButtonProps) => {
  return (
    <View
      className={` ${ color === '#F76141' ? 'w-[30vw]' : 'w-[45vw]'}  mx-[2%]
       rounded-3xl py-[2%]`}
      style={{ backgroundColor: color }}
    >
      <TouchableOpacity className="  flex-row justify-center gap-[5%]">
        <View>{renderIcon(icon, iconProvider, 20, appColors.white)}</View>
        <View>
          <Text
            className=" text-white text-center 
            font-semibold text-[13px] pt-[1%]"
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EmergencyButton;
