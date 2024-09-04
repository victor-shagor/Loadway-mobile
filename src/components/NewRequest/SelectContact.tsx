import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { renderIcon } from "../common/renderIcon";
import { appColors } from "@src/constants/colors";

const SelectContact = () => {
  return (
    <View>
      <TouchableOpacity>
        <View
         className="flex-row justify-center items-center 
         border-2 border-gray-300 py-[2vh] mx-3 my-5
        rounded-lg
        "
        style={{ backgroundColor: appColors.offWhite}}
        >
          {renderIcon(
            "contacts",
            "MaterialCommunityIcons",
            28,
            appColors.black
          )}
          <Text>Select from contacts</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectContact;
