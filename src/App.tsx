// import "expo-router/entry"
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { registerRootComponent } from "expo";
import RootNavigation from "./navigation";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { User } from "./models/User";
import OnboardingContext from "./context/onboarding";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RequestContext from "./context/gateRequest";
import ChatContext from "./context/chats";
import io from 'socket.io-client'
import { socketUrl } from "./utils/Base_url";

export const socket = io(socketUrl, {
  transports: ['websocket'],
});


export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [color, setColor] = useState<string>("#CECAC3");
  const [login, setLogin] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [frequents, setFrequent] = useState<any>([]);
  const [refetch, setRefetch] = useState<any>(false);
  const [bills, setBills] = useState<any>([]);
  const [chats, setChats] = useState<any>([]);
  const [generalNotifications, setGeneralNotifications] = useState<any>([]);
  const [alertNotifications, setAlertNotifications] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);
  const [loginDetails, setLoginDetails] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [changePasswordDetails, setChangePasswordDetails] = useState<{
    email: string;
  }>({ email: "" });
  const [resetPassword, setResetPassword] = useState<{
    email: string;
    initialLogin: boolean;
    code: string;
    newPassword: string;
  }>({
    email: "",
    initialLogin: true,
    code: "",
    newPassword: "",
  });

  useEffect(() => {
    if(currentUser){
      socket.connect();
      // Optionally, listen for a connection event
      socket.on('connect', () => {
        console.log('Connected to WebSocket server', socket.id);
        socket.emit('identify', {userId: currentUser?.id})
      });
  
      return () => {
        // Clean up the socket connection when the app is closed
        socket.disconnect();
      };
    }
  }, [currentUser?.id]);

  return (
    <>
      <OnboardingContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          setIsFirstLaunch,
          isFirstLaunch,
          color,
          setColor,
          login,
          setLogin,
          loginDetails,
          setLoginDetails,
          changePasswordDetails,
          setChangePasswordDetails,
          resetPassword,
          setResetPassword,
          bills,
          setBills,
          alertNotifications,
          setAlertNotifications,
          generalNotifications,
          setGeneralNotifications,
        }}
      >
        <RequestContext.Provider value={{frequents, setFrequent, refetch, setRefetch}}>
        <ChatContext.Provider value={{chats, setChats, messages, setMessages}}>
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <RootNavigation />
          </GestureHandlerRootView>
        </SafeAreaProvider>
        </ChatContext.Provider>
        </RequestContext.Provider>
      </OnboardingContext.Provider>
      <Toast />
    </>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
