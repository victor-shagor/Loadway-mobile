import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";

const PoliceStation = () => {
  const temporaryData = [
    {
      name: "Oregun Police Station",
      address: "Ikeja Bus Stop, 161 Obafemi Awolowo Way, Ikeja",
    },
    {
      name: "Oregun Police Station",
      address: "Ikeja Bus Stop, 161 Obafemi Awolowo Way, Ikeja",
    },
    {
      name: "Oregun Police Station",
      address: "Ikeja Bus Stop, 161 Obafemi Awolowo Way, Ikeja",
    },
  ];
  return (
    <ScrollView>
      <View>
        <ThemedText type="title" >
        Oregun Police Station
        </ThemedText>
      </View>
    </ScrollView>
  );
};

export default PoliceStation;
