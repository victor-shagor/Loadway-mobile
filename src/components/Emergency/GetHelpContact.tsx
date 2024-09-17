import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { getHelpDataContact } from "@src/constants/data";
import { renderIcon } from "../common/renderIcon";
import EmergencyButton from "./EmergencyButton";
import chunkArray from "@src/utils/chunkArray";


const GetHelpContact = () => {
  const temporaryData = [
    {
      id: 1,
      name: "Dad",
      image: require("@src/assets/icons/dad.png"),
    },
    {
      id: 2,
      name: "Mum",
      image: require("@src/assets/icons/mom.png"),
    },
  ];


  const rows = chunkArray(temporaryData, 2);

  return (
    <View className=" mt-[2vh]">
      {rows.map((row, rowIndex) => (
        <View className=" flex-row justify-center items-center w-screen ml-[-5vw]" key={rowIndex}>
          {row.map((data, index) => {
            const { id, name, image } = data;

            return (
              <TouchableOpacity
                key={index}
                className=" mb-[5%] bg-[#FFFEFE] rounded-lg mx-[3vw] py-[6%] shadow-md
           shadow-[#2C2C2C26] w-[35vw] flex-row justify-center items-center
           "
              >
                <Image source={image} />
                <Text className=" text-[##3F3C31] text-[16px] font-bold px-[2vw]">
                  {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default GetHelpContact;

{
  /* <View className=" flex-row gap-5 px-[9%] pt-[2%]">
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
            </View> */
}
