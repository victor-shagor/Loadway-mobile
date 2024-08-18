import { View } from "react-native";
import DashboardHeader from "../../components/home/header";
import RecentActivity from "../../components/home/recentActivity";
import { ScrollView, StatusBar } from "react-native";
import { appColors } from "@src/constants/colors";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import useOnboardingContext from "@src/utils/Context";

const Home = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
    }, [])
  );
  const { currentUser } = useOnboardingContext();
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={appColors.black} />
      <DashboardHeader currentUser={currentUser}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RecentActivity currentUser={currentUser}/>
      </ScrollView>
    </>
  );
};

export default Home;
