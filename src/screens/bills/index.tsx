import {} from "expo-status-bar";
import { SafeAreaView } from "../../components/layout/safeAreaView";
import { Text, View, StatusBar, Image, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import { View, StatusBar, ScrollView } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import WalletBallance from "@src/components/bills/walletBallance";
import BillsList from "@src/components/bills/BillsList";
import { HousingBills, OtherBills, transactionData } from '@src/constants/data';
import SectionTitle from "@src/components/bills/SectionTitle";
import Transaction from "@src/components/bills/Transaction"
import 'react-native-gesture-handler';
import { transactionProps } from "@src/constants/data";


const Bills = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
    }, [])
  );
  return (
    <View className="mt-5">
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <View className="mb-5">
          <WalletBallance />
          <BillsList title="Housing Bills" data={HousingBills} />
          {/* <BillsList title="Others" data={OtherBills} /> */}
        </View>
        <View className="mb-40">
           <SectionTitle title="Recent Transactions" />
           <Transaction  />
        </View>
      </ScrollView>
    </View>
  );
};

export default Bills;

// 3A0427
// 191508
