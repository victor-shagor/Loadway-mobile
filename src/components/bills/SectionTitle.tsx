import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { BillsStackParamList } from "@src/navigation/DashboardStack";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import useOnboardingContext from "@src/utils/Context";

export type SectionTitleProps =
  | "List of Housing Bills"
  | "Quick Links"
  | "Recent Transactions";

const SectionTitle = ({
  title,
  payAllColor,
}: {
  title: SectionTitleProps;
  payAllColor?: string;
}) => {
  const navigation = useNavigation<StackNavigationProp<BillsStackParamList>>();

  const name = title === "List of Housing Bills" ? "Pay all" : "View all";

  const navigationHandler = () => {
    const routeName =
      title === "List of Housing Bills" ? "HouseBill" : "PaymentHistory";
    if (title === "Recent Transactions") {
      navigation.navigate(routeName);
    }else if( title === 'List of Housing Bills'){
      setPayBillModal(true);
    }else{
      setPayBillModal(true);
    }
  };

  const { setPayBillModal } = useOnboardingContext();

  // const buttonHandler = () => {
  //   setPayBillModal(true);
  // };

  return (
    <View>
      <View className=" flex-row justify-between px-[8vw]">
        <Text className=" text-[#66635A] font-semibold text-lg">{title}</Text>
        {title !== "Quick Links" ? (
          <Pressable
            disabled={payAllColor === "#CD3617" ? false : true}
          >
            <TouchableOpacity onPress={navigationHandler}>
              <Text
                className="font-medium text-base"
                style={{ color: payAllColor }}
              >
                {name}
              </Text>
            </TouchableOpacity>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default SectionTitle;
