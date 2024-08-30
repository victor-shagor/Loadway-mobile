import {} from "expo-status-bar";
import {
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import WalletBallance from "@src/components/bills/walletBallance";
import QuickLinkBills from "@src/components/bills/QuickLinkBills";
import { QuickLinkBillsData } from "@src/constants/data";
import Recent_Transactions from "@src/components/bills/Recent_Transactions";
import "react-native-gesture-handler";
import HousingBills from "@src/components/bills/HousingBills";
import { HousingBillsData } from "@src/constants/data";
import PayBillModal from "@src/components/bills/PayBillModal";
import useOnboardingContext from "@src/utils/Context";

const Bills = () => {


  const {  payBillModal } = useOnboardingContext();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
    }, [])
  );

  const laregNumber =  142000;
  const options = {  maximumFractionDigits: 2   } 
  const formattedNumber = Intl.NumberFormat("en-US",options).format(laregNumber);
  console.log(formattedNumber, 'formatted')

  console.log(laregNumber.toLocaleString(), 'localestring')


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
      <View>{payBillModal && <PayBillModal />}</View>
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

// 3A0427
// 191508
