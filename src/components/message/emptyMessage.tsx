import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";

const EmptyMessage = ({ message }: { message: string }) => {
  return (
    <View style={styles.container}>
      <ThemedText type="title">{message}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default EmptyMessage;
