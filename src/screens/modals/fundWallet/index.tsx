import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

const FundWalletModal = () => {
  return (
    <View style={styles.container}>
      <Text>FundWalletModal</Text>
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

export default FundWalletModal;
