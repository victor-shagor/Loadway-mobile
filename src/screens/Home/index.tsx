import DashboardHeader from "../../components/home/header";
import RecentActivity from "../../components/home/recentActivity";
import { ScrollView, StatusBar, View } from "react-native";
import { appColors } from "@src/constants/colors";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import useOnboardingContext from "@src/utils/Context";
import PayBillModal from "@src/components/bills/PayBillModal";

const Home = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
    }, [])
  );
  const { currentUser, payBillModal } = useOnboardingContext();
  return (
    <>
      <View className="relative h-screen">
          <StatusBar
            barStyle="light-content"
            backgroundColor={appColors.black}
          />
          <DashboardHeader currentUser={currentUser} />
          <RecentActivity currentUser={currentUser} />
          <View className="static bottom-[10%] left-0">
            {payBillModal && <PayBillModal />}
          </View>
      </View>
    </>
  );
};

export default Home;
