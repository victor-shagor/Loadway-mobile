import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

const FundWalletModal = () => {
  return (
    <View style={styles.modalContainer}>
      <Text>FundWalletModal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: screenHeight * 0.6,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
});

export default FundWalletModal;
