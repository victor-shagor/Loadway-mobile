import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Host } from "react-native-portalize";
import { appColors } from "../constants/colors";
import * as Device from "expo-device";
import Constants from 'expo-constants';

// import Home from "@src/screens/home";
import Home from "@src/screens/home";
import Bills from "../screens/bills";
import Messages from "../screens/message";
import Profile from "../screens/profile";
import Emergency from "../screens/emergency";
// import HouseBill from "@src/screens/bills/HouseBill";
import PaymentHistory from "@src/screens/bills/PaymentHistory";
import UserManagement from "@src/screens/userManagement";
import Account from "@src/screens/account";
import Settings from "@src/screens/settings";
import EditProfile from "@src/components/account/editProfile";
import NotificationsPreferences from "@src/components/settings/notifications";
import Communication from "@src/components/settings/communication";
import Security from "@src/components/settings/security";
import AppPreference from "@src/components/settings/appPreference";
import Support from "@src/components/settings/support";
import UserNotifications from "@src/screens/notifications";
import ChatRoom from "@src/screens/message/ChatRoom";
import * as Notifications from "expo-notifications";
import { getCurrentUser, updateCurrentUser } from "@src/api/user";
import { OnboardingContextType, useOnboarding } from "@src/context/onboarding";
import axiosInstance from "@src/api/axiosClient";
import Toast from "react-native-toast-message";
import { navigate } from "./index";
import AppHeader from "@src/components/common/AppHeader";
import { useNavigation } from "@react-navigation/native";
import NewAccess from "@src/screens/new-access";
import ElectricityVending from "@src/screens/power";
import GateAccessHome from "../screens/gateAccess";
import HomeIcon from "@src/components/icons/HomeIcon";
import BillIcon from "@src/components/icons/BillIcon";
import MessageIcon from "@src/components/icons/MessageIcon";
import ProfileIcon from "@src/components/icons/ProfileIcon";
import ResetPassword from "@src/screens/UserAuthentication.tsx/ResetPassword";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export type BillsStackParamList = {
  HouseBill: any;
  PaymentHistory: any;
};

type TabItem = {
  name: string;
  label: string;
  icon: (color: string) => ReactElement;
  headerShown?: boolean;
  component: any;
  headerTitle?: string;
};

type ScreenProps = {
  name: string;
  component: any;
  showHeader: boolean;
  title?: string;
  leftIcon?: string;
  rightIcon?: string;
};

export type NewRequestStackParamList = {
  newrequest: any;
};

const tabs: Array<TabItem> = [
  {
    name: "Home",
    label: "Home",
    icon: (color: string) => <HomeIcon color={color} width={50} height={50} />,
    component: Home,
    headerShown: false,
  },
  {
    name: "Bills",
    label: "Bills",
    icon: (color: string) => <BillIcon color={color} width={50} height={50} />,
    component: Bills,
    headerShown: true,
    headerTitle: "BILLS",
  },
  {
    name: "Message",
    label: "Message",
    icon: (color: string) => (
      <MessageIcon color={color} width={50} height={50} />
    ),
    component: Messages,
    headerShown: true,
    headerTitle: "COMPLAINTS",
  },
  {
    name: "Profile",
    label: "Profile",
    icon: (color: string) => (
      <ProfileIcon color={color} width={50} height={50} />
    ),
    component: Profile,
    headerShown: false,
    headerTitle: "PROFILE",
  },
];

const TabNavigation = () => {
  return (
    <Host>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: appColors.white,
          tabBarLabel: () => null,
          tabBarStyle: styles.tabBarStyles,
          headerTitleAlign: "center",
        }}
      >
        {tabs.map((tab, index) => (
          <Tab.Screen
            key={index}
            options={{
              headerShown: tab.headerShown,
              tabBarIcon: ({ size, color, focused }) => (
                <View className='items-center' style={{ gap: 4 }}>
                  <View className='h-6 w-6'>
                    {tab.icon(focused ? appColors.orange : color)}
                  </View>
                  <Text
                    className={`${
                      focused ? "text-[#E85637]" : "text-black/50"
                    } font-medium text-sm`}
                  >
                    {tab.label}
                  </Text>
                </View>
              ),
              header: () => <AppHeader title={tab.headerTitle} />,
            }}
            name={tab.name}
            component={tab.component}
          />
        ))}
      </Tab.Navigator>
    </Host>
  );
};


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const DashboardStack = () => {
  const navigation = useNavigation<any>();
  const { height } = useWindowDimensions();
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync();
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (response.notification.request.content.title === "New Message") {
          navigate("ChatRoom", {
            chatId: response.notification.request.content.data.chatId,
            recipientId: response.notification.request.content.data.recipientId,
          });
        } else if (response.notification.request.content.title === "Alert") {
          navigate("UserNotifications", {
            alert: true,
            item: response.notification.request.content.data,
          });
        } else if (
          response.notification.request.content.title === "Complaint"
        ) {
          navigate("Message", {
            complaint: true,
            item: response.notification.request.content.data,
          });
        } else {
          navigate("UserNotifications", {});
        }
      });
    navigation.navigate("Main" as any);
    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

 
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      try {
        const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

        token = (await Notifications.getExpoPushTokenAsync({projectId})).data;
        console.log(token);
        await updateCurrentUser({ pushNotificationsToken: token });
      } catch (e) {
        console.log(e);
        return;
      }
    } else {
      console.log("Must use physical device for Push Notifications");
      return;
    }

    return token;
  }

  const { currentUser, setCurrentUser } =
    useOnboarding() as OnboardingContextType;

  const [profile, setProfile] = useState({
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    phoneNumber: currentUser?.phoneNumber,
    email: currentUser?.email,
    address: currentUser?.address,
    profilePicture: currentUser?.profilePicture,
  });

  // Function to save profile changes
  const handleSave = async () => {
    try {
      await axiosInstance.put("/user/update", profile);
      const user = await getCurrentUser();
      setCurrentUser(user);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Update successful.",
      });

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      Toast.show({
        type: "Error",
        text1: "error",
        text2: "Error while saving changes., try again later",
      });
    }
  };

  const screens: ScreenProps[] = [
    {
      name: "Main",
      component: TabNavigation,
      showHeader: false,
      title: "",
    },
    {
      name: "GateAccess",
      component: GateAccessHome,
      showHeader: true,
      title: "GATE ACCESS",
      leftIcon: "arrow-left",
    },
    {
      name: "NewAccess",
      component: NewAccess,
      showHeader: true,
      title: "NEW ACCESS",
      leftIcon: "arrow-left",
    },
    {
      name: "Electricity",
      component: ElectricityVending,
      showHeader: true,
      title: "ELECTRICITY VENDING",
      leftIcon: "arrow-left",
    },
    {
      name: "Emergency",
      component: Emergency,
      showHeader: true,
      title: "EMERGENCY",
      leftIcon: "arrow-left",
    },
    {
      name: "ChatRoom",
      component: ChatRoom,
      showHeader: true,
      title: "CHAT",
      leftIcon: "arrow-left",
    },
    {
      name: "HouseBill",
      component: PaymentHistory,
      showHeader: true,
      title: "PAYMENT HISTORY",
      leftIcon: "arrow-left",
    },
    {
      name: "PaymentHistory",
      component: PaymentHistory,
      showHeader: true,
      title: "PAYMENT HISTORY",
      leftIcon: "arrow-left",
    },
    {
      name: "UserNotifications",
      component: UserNotifications,
      showHeader: true,
      title: "NOTIFICATIONS",
      leftIcon: "arrow-left",
    },
    {
      name: "Account",
      component: Account,
      showHeader: true,
      title: "ACCOUNT",
      leftIcon: "arrow-left",
    },
    {
      name: "EditProfile",
      component: EditProfile,
      showHeader: true,
      title: "EDIT PROFILE",
      leftIcon: "arrow-left",
    },
    {
      name: "UserManagement",
      component: UserManagement,
      showHeader: true,
      title: "USER MANAGEMENT",
      leftIcon: "arrow-left",
    },
    {
      name: "resetpassword",
      component: ResetPassword,
      showHeader: true,
      leftIcon: "arrow-left",
    },
  ];

  const profileScreens: ScreenProps[] = [
    {
      name: "Settings",
      component: Settings,
      showHeader: true,
      title: "SETTINGS",
      leftIcon: "arrow-left",
    },
    {
      name: "Notifications",
      component: NotificationsPreferences,
      showHeader: true,
      title: "NOTIFICATION PREFERENCES",
      leftIcon: "arrow-left",
    },
    {
      name: "Communication",
      component: Communication,
      showHeader: true,
      title: "COMMUNICATION PREFERENCES",
      leftIcon: "arrow-left",
    },
    {
      name: "Security",
      component: Security,
      showHeader: true,
      title: "PASSWORD & SECURITY",
      leftIcon: "arrow-left",
    },
    {
      name: "AppPreferences",
      component: AppPreference,
      showHeader: true,
      title: "APP PREFERENCES",
      leftIcon: "arrow-left",
    },
    {
      name: "Support",
      component: Support,
      showHeader: true,
      title: "HELP & SUPPORT",
      leftIcon: "arrow-left",
    },
  ];

  const gotoRoute = () => {
    navigation.goBack();
  };

  return (
    <Host>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              headerShown: screen.showHeader,
              headerShadowVisible: false,
              header: () => (
                <AppHeader
                  title={screen.title}
                  leftIcon={screen.leftIcon}
                  rightIcon={screen.rightIcon}
                  handleLeftBtnPress={gotoRoute}
                />
              ),
            }}
          />
        ))}
      </Stack.Navigator>

      {/* PROFILE SETTINGS */}
      <Stack.Group>
        {profileScreens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              headerShown: screen.showHeader,
              headerShadowVisible: false,
              header: () => (
                <AppHeader
                  title={screen.title}
                  leftIcon={screen.leftIcon}
                  rightIcon={screen.rightIcon}
                  handleLeftBtnPress={gotoRoute}
                />
              ),
            }}
          />
        ))}
      </Stack.Group>
    </Host>
  );
};

const styles = StyleSheet.create({
  tabBarStyles: {
    height: 100,
    paddingBottom: 10,
    backgroundColor: appColors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 0,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: appColors.orange,
    borderRadius: 50,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DashboardStack;
