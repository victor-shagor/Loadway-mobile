import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import GetHelp from "@src/components/Emergency/GetHelp";
import { getHelpData } from "@src/constants/data";
import CustomText from "@src/components/Emergency/CustomText";
import GetHelpContact from "@src/components/Emergency/GetHelpContact";
import { useFocusEffect } from "@react-navigation/native";

const EmergencyContact = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
    }, [])
  );
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className=" bg-white h-screen w-screen">
        <CustomText text="Emergency Personnel"/>
        <GetHelp data={getHelpData} />
        <CustomText text="Emergency Contact"/>
        <GetHelpContact />
      </View>
    </ScrollView>
  );
};

export default EmergencyContact;
