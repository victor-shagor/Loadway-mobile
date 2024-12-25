import React from "react";
import DashboardHeader from "../../components/home/header";
import { StatusBar, View } from "react-native";
import { appColors } from "@src/constants/colors";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import useOnboardingContext from "@src/utils/Context";
import { getBills } from "@src/api/bills";
import { User } from "@src/models/User";
import { getAllNotifications } from "@src/api/notifications";
import { getChats } from "@src/api/chats";
import { useChatContext } from "@src/context/chats";
import HomeMain from "@src/components/home";

const Home = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
    }, [])
  );

  const {
    currentUser,
    setBills,
    setAlertNotifications,
    setGeneralNotifications,
  } = useOnboardingContext();
  const { setChats } = useChatContext();

  useEffect(() => {
    const getUserBills = async () => {
      try {
        const bills = await getBills();
        setBills(bills);
        const [alert, general, chats] = await Promise.all([getAllNotifications({ category: "Alert", page: 1 }),  getAllNotifications({ category: "General", page: 1 }), getChats()]);
       setAlertNotifications(alert.data);
        setGeneralNotifications(general.data);
        setChats(chats);
      } catch (error) {}
    };
    getUserBills();
  }, []);

  return (
    <>
      <View className='relative h-screen'>
        <StatusBar barStyle='dark-content' backgroundColor={appColors.black} />
        <DashboardHeader currentUser={currentUser as User} />
        <HomeMain />
      </View>
    </>
  );
};

export default Home;
