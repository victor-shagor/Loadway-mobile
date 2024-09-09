import {} from "expo-status-bar";
import {
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import WalletBallance from "@src/components/bills/walletBallance";
import QuickLinkBills from "@src/components/bills/QuickLinkBills";
import { QuickLinkBillsData } from "@src/constants/data";
import Recent_Transactions from "@src/components/bills/Recent_Transactions";
import "react-native-gesture-handler";
import HousingBills from "@src/components/bills/HousingBills";
import React from "react";

const Bills = () => {


  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
    }, [])
  );

  return (
    <View className="relative h-screen">
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <View className="mb-5 mt-[5%]">
          <WalletBallance />
        </View>
        <View>
          <QuickLinkBills title="Quick Links" data={QuickLinkBillsData} />
        </View>
        <View>
          {/* <HousingBills title="List of Housing Bills" data={HousingBillsData} /> */}
          <HousingBills title="List of Housing Bills" />
        </View>
        <View className="mb-40">
          <Recent_Transactions  />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default Bills;
