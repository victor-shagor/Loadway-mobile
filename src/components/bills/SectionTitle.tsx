import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
export type SectionTitleProps = "Housing Bills" | "Others" | 'Recent Transactions';

const SectionTitle = ({ title }: { title: SectionTitleProps }) => {
  console.log(title);
  return (
    <View>
      <View className=" flex-row justify-between px-[8vw]">
        <Text className=" text-[#66635A] font-semibold text-lg">{title}</Text>
        {title !== "Others" ? (
          <TouchableOpacity>
            <Text className=" text-[#F6411B] font-medium text-base">
              View all
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default SectionTitle;
