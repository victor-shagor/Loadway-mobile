import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import GetHelp from "@src/components/Emergency/GetHelp";
import { getHelpData } from "@src/constants/data";
import CustomText from "@src/components/Emergency/CustomText";
import GetHelpContact from "@src/components/Emergency/GetHelpContact";
import { useFocusEffect } from "@react-navigation/native";

const Emergency = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
    }, [])
  );
  return (
    <ScrollView>
      <View className=" bg-white h-screen">
        <CustomText />
        <GetHelp data={getHelpData} />
        <CustomText />
        <GetHelpContact />
      </View>
    </ScrollView>
  );
};

export default Emergency;

const styles = StyleSheet.create({});
