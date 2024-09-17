import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import { renderIcon } from "../common/renderIcon";
import { appColors } from "@src/constants/colors";

const PoliceStation = () => {
  const temporaryData = [
    {
      name: "Oregun Police Station",
      address: "Ikeja Bus Stop, 161 Obafemi Awolowo Way, Ikeja",
    },
    {
      name: "Oregun Police Station",
      address: "Ikeja Bus Stop, 161 Obafemi Awolowo Way, Ikeja",
    },
    {
      name: "Oregun Police Station",
      address: "Ikeja Bus Stop, 161 Obafemi Awolowo Way, Ikeja",
    },
  ];
  return (
    <ScrollView>
      <View className="mb-[5vh]">
        <ThemedText type="default" className="ml-[5vw] py-5 text-[#8C8A83]">
          Closest stations to you
        </ThemedText>
        <View>
          {temporaryData.map((data, index) => {
            return (
              <>
                <View className=" ml-[5vw]">
                  <ThemedText type="title" className=" text-[18px]">
                    Oregun Police Station
                  </ThemedText>
                </View>
                <View className=" flex-row justify-between mx-[5vw] mt-[2vh]">
                  {renderIcon(
                    "map-pin",
                    "Feather",
                    28,
                    appColors.CornflowerBlue
                  )}
                  <ThemedText
                    type="default"
                    className=" text-[#3F3C31] w-[60vw]"
                  >
                    Ikeja Bus Stop, 161 Obafemi Awolowo Way, Ikeja.
                  </ThemedText>
                  <View className=" p-[15px] rounded-full bg-[#28F116] top-[-2vh]">
                    {renderIcon("phone", "Feather", 25, appColors.white)}
                  </View>
                </View>
                <ThemedText className=" ml-[5vw] mb-[3vh] text-[#C4A485]">Open in google maps</ThemedText>
                <View className=" w-screen h-[0.1vh] bg-[#00000038] mx-[5vw] mb-[3vh]"></View>
              </>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default PoliceStation;
