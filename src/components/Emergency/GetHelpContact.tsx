import { View, Text } from "react-native";
import React from "react";
import { getHelpDataContact } from "@src/constants/data";
import { renderIcon } from "../common/renderIcon";
import EmergencyButton from "./EmergencyButton";

const GetHelpContact = () => {
  return (
    <View>
      {getHelpDataContact.map((data, index) => {
        const { title, iconProvider } = data;

        return (
          <View key={index} 
           className=" mb-[5%] bg-[#D4D4D429] rounded-lg mx-[6%] py-[6%]
           ">
            <Text 
             className=" text-[#000000] font-medium text-[18px] mb-[6%]
             px-[8%] pb-2
             ">
              {title}
            </Text>
            <View className=" flex-row gap-5 px-[9%] pt-[2%]">
              <EmergencyButton
                text="Call Now"
                icon={'phone'}
                iconProvider={iconProvider}
                color="#F76141"
              />
              <EmergencyButton
                text="Copy Phone Number"
                icon={'copy'}
                iconProvider={iconProvider}
                color="#000000"
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default GetHelpContact;
