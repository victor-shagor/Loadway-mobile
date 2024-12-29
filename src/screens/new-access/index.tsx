import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import NewAccessForm from "./NewAccessForm";
import FrequentGuestList from "./FrequentGuestList";
import { StatusBar } from "expo-status-bar";

type Props = {};

const NewAccess = (props: Props) => {
  return (
    <SafeAreaView className='flex-1' style={styles.container}>
      <StatusBar style='dark' />
      <NewAccessForm />
      <FrequentGuestList />
    </SafeAreaView>
  );
};

export default NewAccess;

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
