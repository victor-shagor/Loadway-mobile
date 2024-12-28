import React, { useRef } from "react";
import DashboardHeader from "../../components/home/header";
import { View } from "react-native";
import { useEffect } from "react";
import useOnboardingContext from "@src/utils/Context";
import { getBills } from "@src/api/bills";
import { User } from "@src/models/User";
import { getAllNotifications } from "@src/api/notifications";
import { getChats } from "@src/api/chats";
import { useChatContext } from "@src/context/chats";
import HomeMain from "@src/components/home";
import CustomModal from "@src/components/CustomModal";
import ChangePasswordModal from "@src/components/home/ChangePasswordModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const {
    currentUser,
    setBills,
    setAlertNotifications,
    setGeneralNotifications,
  } = useOnboardingContext();
  const { setChats } = useChatContext();
  const changePasswordModalRef = useRef<any>(null);

  useEffect(() => {
    AsyncStorage.getItem("firstLogin").then((value) => {
      if (value === "true") {
        changePasswordModalRef.current?.open();
      }
    });
    const getUserBills = async () => {
      try {
        const bills = await getBills();
        setBills(bills);
        const [alert, general, chats] = await Promise.all([
          getAllNotifications({ category: "Alert", page: 1 }),
          getAllNotifications({ category: "General", page: 1 }),
          getChats(),
        ]);
        setAlertNotifications(alert.data);
        setGeneralNotifications(general.data);
        setChats(chats);
      } catch (error) {
        console.log(error);
      }
    };
    getUserBills();
  }, []);

  const close = () => {
    changePasswordModalRef.current?.close();
  };

  return (
    <>
      <View className='relative h-screen'>
        <StatusBar style='light' />
        <DashboardHeader currentUser={currentUser as User} />
        <HomeMain />
      </View>
      <CustomModal
        modalizeRef={changePasswordModalRef}
        modalContent={<ChangePasswordModal close={() => close()} />}
      />
    </>
  );
};

export default Home;
