import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BuyElectricity = () => {
  return (
    <View style={styles.container}>
      <Text>BuyElectricity</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 100,
    padding: 20,
  },
});
export default BuyElectricity;
