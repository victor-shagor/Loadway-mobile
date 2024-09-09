import images from "@src/constants/images";
import { ImageProps } from "react-native";
import { IconTypes, IconProvider } from "@src/constants/data";

export interface GeneralNotificationsProps {
  userImage?: ImageProps;
  name?: string;
  time?: string;
  title?: string;
  icon?: IconTypes;
  iconProvider?: IconProvider;
  modalImage?: ImageProps;
}

export const generalNotification: GeneralNotificationsProps[] = [
  {
    userImage: images.user.propertyManager,
    name: "David",
    time: "1hr",
  },
  {
    userImage: images.user.propertyManager,
    name: "Seun",
    time: "1hr",
  },
];

export const maintainanceNotification: GeneralNotificationsProps[] = [
  {
    title: "Your monthly maintenance is pending, kindly fix it.",
    time: "8:00AM",
    icon: "wrench",
    iconProvider: "FontAwesome",
  },
  {
    title: "Your monthly maintenance is pending, kindly fix it.",
    time: "8:00AM",
    icon: "wrench",
    iconProvider: "FontAwesome",
  },
];

export const alertsNotification: GeneralNotificationsProps[] = [
  {
    name: "URGENT",
    title:
      "A water leak has been detected in one of the pipes on your street. Please note that we are aware and on top of the matter. A fix will be scheduled as soon as possible",
    time: "1hr ago",
    modalImage: images.notification.leakage,
  },
  {
    name: "SECURITY REMINDER",
    title:
      "Be vigilant. Report any suspicious acts or movements around you. Be sure to contact the security officers of any unpleasant events",
    time: "1hr ago",
    modalImage: images.notification.security,
  },
];
