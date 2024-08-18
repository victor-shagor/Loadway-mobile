import {  } from "expo-status-bar";
import { SafeAreaView } from "../../components/layout/safeAreaView";
import { Text, View, StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const Bills = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
    }, [])
  )
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content"   />
      <View>
        <View>
          <Text>Wallet Balance</Text>
          <Text>N10,000</Text>
        </View>
        <View>
          <Text>Due Bills</Text>
          <Text>N20,000</Text>

          <Text>N20,000</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Bills;
