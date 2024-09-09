import React from "react";
import DashboardHeader from "../../components/home/header";
import RecentActivity from "../../components/home/recentActivity";
import { StatusBar, View } from "react-native";
import { appColors } from "@src/constants/colors";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import useOnboardingContext from "@src/utils/Context";
import { getBills } from "@src/api/bills";
import { User } from "@src/models/User";

const Home = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
    }, [])
  );

  const { currentUser, setBills } = useOnboardingContext();

  useEffect(() => {
    const getUserBills = async () => {
      try {
        const bills = await getBills();
        setBills(bills);
      } catch (error) {}
    };
    getUserBills();
  }, []);

  return (
    <>
      <View className="relative h-screen">
          <StatusBar
            barStyle="light-content"
            backgroundColor={appColors.black}
          />
          <DashboardHeader currentUser={currentUser as User} />
          <RecentActivity />
          <View className="static bottom-[10%] left-0">
          </View>
      </View>
    </>
  );
};

export default Home;
