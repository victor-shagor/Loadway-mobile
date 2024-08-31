import DashboardHeader from "../../components/home/header";
import RecentActivity from "../../components/home/recentActivity";
import {  StatusBar, View } from "react-native";
import { appColors } from "@src/constants/colors";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import useOnboardingContext from "@src/utils/Context";
import React from "react";
import { getBills } from "@src/api/bills";

const Home = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
    }, [])
  );

  const { setBills } = useOnboardingContext();

  useEffect(()=>{
    const getUserBills = async () => {
      try {
        const bills = await getBills()
        setBills(bills)
      } catch (error) {
      }
    };
    getUserBills();
  }, [])

  const { currentUser } = useOnboardingContext();

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
          </View>
      </View>
    </>
  );
};

export default Home;
