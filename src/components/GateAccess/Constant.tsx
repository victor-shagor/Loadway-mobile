import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { string } from "prop-types";
import { ImageProps } from "react-native";
import { Modalize } from "react-native-modalize";
import CustomModal from "../CustomModal";
import { AntDesign } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import ChatModal from "@src/screens/modals/messages/chat";
import { appColors } from "@src/constants/colors";

export type GateAccessDataProps = {
  image: ImageProps | undefined;
  name: string;
  date: string | undefined;
  status: string;
  code: string;
};
const Constant = ({ image, name, status, date, code }: GateAccessDataProps) => {
  const modalizeRef = useRef<Modalize>(null);

  return (
      <View className="mb-[4vh] flex-row justify-between">
        <View className="flex-row gap-5">
          <Image source={image} className=" w-[10vw] h-[5vh]" />
          <View>
            <Text className=" font-semibold text-[#191508] text-[16px] mb-1">
              {name}
            </Text>
            <Text className=" text-[#66635A] font-medium text-[12px]">
              {status}
            </Text>
          </View>
        </View>
        <View>
          <Text className=" text-[#66635A] font-medium text-[12px] mb-3">
            {date}
          </Text>
          <View className="bg-[#D9CCD14D] rounded-lg px-4 py-1">
            <Text className="text-[#3F3C31] font-bold text-[14px]">{code}</Text>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  chatMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 80,
    padding: 10,
    flex: 1,
    gap: 15,
  },
  chatMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    flex: 1,
    paddingBottom: 5,
  },
  messageCountContainer: {
    backgroundColor: appColors.orange,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTriggerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    flex: 1,
    position: "absolute",
    top: "70%",
    right: 0,
    borderRadius: 50,
    backgroundColor: appColors.orange,
    padding: 10,
  },
});

export default Constant;
