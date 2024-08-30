import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import GetHelp from "@src/components/Emergency/GetHelp";
import { getHelpData } from "@src/constants/data";
import CustomText from "@src/components/Emergency/CustomText";
import GetHelpContact from "@src/components/Emergency/GetHelpContact";

const Emergency = () => {
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
