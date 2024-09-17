import { View, TextInput, ScrollView } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import { appColors } from "@src/constants/colors";
import SelectImage from "../common/SelectImage";
import { renderIcon } from "../common/renderIcon";
import CustomButton from "@src/components/CustomButton";

const ReportEmergencyModal = () => {
  return (
    <ScrollView className=" flex-1 mb-[12vh]">
      <ThemedText
        type="title"
        style={{ color: appColors.nero }}
        className="text-[18px] font-semibold ml-[5vw] mt-[2vh]"
      >
        Report Emergency
      </ThemedText>
      <ThemedText
        type="small"
        className="text-[12px] font-normal ml-[5vw] text-[#3F3C31] mt-[2vh] w-[85vw]
         tracking-wide leading-4
        "
      >
        In times of urgency, your swift action matters. Report any emergency
        directly to ensure prompt assistance. Your safety is our priority –
        let's keep our community secure and well-protected together.
      </ThemedText>
      <TextInputComponent placeholder="Title" />
      <TextInputComponent placeholder="Location" />
      <TextInput
        keyboardType="default"
        placeholder="Description"
        placeholderTextColor={appColors.lightGray}
        multiline={true}
        numberOfLines={5}
        textAlignVertical="top"
        spellCheck
        className=" ml-[5vw] pl-[5vw] py-[2vh] bg-[#FFFFFF]
        border-[1px] border-[#52514E33] rounded-md w-[89vw]
        mt-[3vh] h-[10vh]"
      />
      <DropDownInput placeholder="Personnel" />
      <DropDownInput placeholder="Risk Level" />
      <View className="ml-[5vw] w-[89vw] mt-[2vh]">
        <SelectImage />
      </View>
      <View className="ml-[5vw] w-[89vw] mt-[2vh]">
        <CustomButton value={"Submit"} />
      </View>
    </ScrollView>
  );
};

export default ReportEmergencyModal;

const TextInputComponent = ({ placeholder }: { placeholder: string }) => {
  return (
    <TextInput
      keyboardType="default"
      placeholder={placeholder}
      placeholderTextColor={appColors.lightGray}
      spellCheck
      className=" ml-[5vw] pl-[5vw] py-[2vh] bg-[#FFFFFF]
      border-[1px] border-[#52514E33] rounded-md w-[89vw]
      mt-[3vh]
      "
    />
  );
};

const DropDownInput = ({ placeholder }: { placeholder: string }) => {
  return (
    <View className=" relative">
      <TextInput
        keyboardType="default"
        placeholder={"Risk Level"}
        placeholderTextColor={appColors.lightGray}
        spellCheck
        className=" ml-[5vw] pl-[5vw] py-[2vh] bg-[#FFFFFF]
      border-[1px] border-[#52514E33] rounded-md w-[89vw]
      mt-[3vh]
      "
      />
      <View className=" absolute top-[3vh] right-[10vw] pt-3">
        {renderIcon("chevron-right", "Feather", 30, "#756250")}
      </View>
    </View>
  );
};
