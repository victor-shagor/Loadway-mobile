import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { renderIcon } from "../common/renderIcon";
import React, { useRef } from "react";
import CustomModal from "../CustomModal";
import { Modalize } from "react-native-modalize";
import { ThemedText } from "@src/components/ThemedText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { appColors } from "@src/constants/colors";
import { UserChats } from "@src/constants/data";
import { ChatRenderItemProps } from "@src/models/chat";
import ChatModal from "@src/screens/modals/messages/chat";
import ReportEmergencyModal from "./ReportEmergencyModal";

const ReportEmergency = () => {
  const temporaryData = [
    {
      title: "Intrusion Detection",
      desc: "Suspicious persons seen around premises...",
      time: "1hr ago",
      riskLevel: "High Risk",
    },
    {
      title: "Security Reminder",
      desc: "All residents should take note of their...",
      time: "1hr ago",
      riskLevel: "High Risk",
    },
  ];

  const modalizeRefForReport = useRef<Modalize>(null);

  return (
    <ScrollView className=" flex-1">
      <View className=" w-screen ml-[-2.5vw] mb-[10vh]">
        {temporaryData.map((item, index) => {
          const { title, desc, time, riskLevel } = item;

          return (
            <View
              className=" flex-row justify-between mx-[5vw] my-5"
              key={index}
            >
              <View className=" w-[60vw]">
                <Text className=" text-[16px] font-semibold text-[#191919]">
                  {title}
                </Text>
                <Text className=" text-[14px] font-medium text-[#3F3C31] pt-3">
                  {desc}
                </Text>
                <Text className=" text-[14px] font-medium text-[#3F3C31] pt-3">
                  {time}
                </Text>
              </View>
              <View className=" pl-[9vw]">
                <TouchableOpacity className=" px-[2vw] py-[1.5vh] bg-[#FDD9D1] rounded-lg">
                  <Text className=" text-[12px] font-semibold text-[#CD3616] text-center">
                    {riskLevel}
                  </Text>
                </TouchableOpacity>
                <View className=" relative right-[-10vw] pt-3">
                  {renderIcon("chevron-right", "Feather", 30, "#756250")}
                </View>
              </View>
            </View>
          );
        })}
        {/* <ReportEmergencyModal /> */}
        <CustomModal
            modalizeRef={modalizeRefForReport}
            triggerItem={
              <>
                <AntDesign name="plus" size={15} color={appColors.white} />
                <ThemedText style={{ color: appColors.white }}>
                  New report
                </ThemedText>
              </>
            }
            triggerItemStyle={styles.modalTriggerStyle}
            modalTitle="Report"
            modalContent={<ReportEmergencyModal />}
          />
      </View>
    </ScrollView>
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

export default ReportEmergency;
