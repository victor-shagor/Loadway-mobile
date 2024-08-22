import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BillsStackParamList } from "@src/navigation/DashboardStack";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type SectionTitleProps =
  | "Housing Bills"
  | "Others"
  | "Recent Transactions";

const SectionTitle = ({ title }: { title: SectionTitleProps }) => {
  const navigation = useNavigation<StackNavigationProp<BillsStackParamList>>();

  const navigationHandler = () => {
    const routeName =
      title === "Housing Bills" ? "HouseBill" : "PaymentHistory";
    navigation.navigate(routeName);
  };

  return (
    <View>
      <View className=" flex-row justify-between px-[8vw]">
        <Text className=" text-[#66635A] font-semibold text-lg">{title}</Text>
        {title !== "Others" ? (
          <TouchableOpacity onPress={navigationHandler}>
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
