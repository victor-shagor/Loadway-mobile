import { ScrollView, StatusBar, StyleSheet, View, Dimensions } from "react-native";
import React, { useCallback, useRef } from "react";
import GetHelp from "@src/components/Emergency/GetHelp";
import { getHelpData } from "@src/constants/data";
import CustomText from "@src/components/Emergency/CustomText";
import GetHelpContact from "@src/components/Emergency/GetHelpContact";
import { useFocusEffect } from "@react-navigation/native";
import CustomModal from "../CustomModal";
import PoliceStation from "./PoliceStation";
import { Modalize } from "react-native-modalize";
import { ThemedText } from "@src/components/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { appColors } from "@src/constants/colors";




const EmergencyContact = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
    }, [])
  );

  const modalizeRefForReport = useRef<Modalize>(null);

  const { height } = Dimensions.get('window');
  const position = height/3;


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className=" bg-white h-screen w-screen">
        <CustomText text="Emergency Personnel"/>
        <GetHelp data={getHelpData} />
        <CustomText text="Emergency Contact"/>
        <GetHelpContact />
        <View className="  absolute right-[5vw]"
        style={{ bottom: position}}
        >
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
            modalContent={<PoliceStation />}
          />
        </View>
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

export default EmergencyContact;
