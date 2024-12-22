import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons/";
import { ImageProps } from "react-native";
import { QuickLinksRootStackParamList } from "../../components/home/quickLinks";
import images from "@src/constants/images";

export type IconTypes =
  | keyof typeof AntDesign.glyphMap
  | keyof typeof Feather.glyphMap
  | keyof typeof MaterialCommunityIcons.glyphMap
  | keyof typeof Entypo.glyphMap;

export type IconProvider =
  | "AntDesign"
  | "Feather"
  | "MaterialCommunityIcons"
  | "Entypo";

export interface QuicklinkProps {
  icon: IconTypes;
  name: string;
  href: keyof QuickLinksRootStackParamList;
  iconProvider: IconProvider;
}

export interface RecentChatProps {
  image: ImageProps;
  name: string;
  itemSent: string;
}

export interface RecentActivityProps {
  activityIcon: IconTypes;
  iconProvider: IconProvider;
  activityTag: string;
  activityTitle: string;
  activityDate: string;
  activityAmount?: string;
}

export const quickLinksArray: QuicklinkProps[] = [
  {
    icon: "unlock",
    name: "Gate Access",
    href: "GateAccess",
    iconProvider: "AntDesign",
  },
  // {
  //   icon: "alert-circle",
  //   name: "Emergency",
  //   href: "Emergency",
  //   iconProvider: "Feather",
  // },
  {
    icon: "chat-question-outline",
    name: "Complaints",
    href: "Message",
    iconProvider: "MaterialCommunityIcons",
  },
  {
    icon: "lightning-bolt-outline",
    name: "Buy Elecricity",
    href: "Electricity",
    iconProvider: "MaterialCommunityIcons",
  },
];

export const recentChatArray: RecentChatProps[] = [
  {
    image: images.user.propertyManager,
    name: "Property Manager",
    itemSent: "sent a document",
  },
  {
    image: images.user.cso,
    name: "CSO",
    itemSent: "sent an image",
  },
];

export const recentActivityArray: RecentActivityProps[] = [
  {
    activityIcon: "chat-question-outline",
    activityTag: "Complaint",
    activityTitle: "Water Leak",
    activityDate: "03, May 2023",
    activityAmount: "N20,000",
    iconProvider: "MaterialCommunityIcons",
  },
  {
    activityIcon: "chat-question-outline",
    activityTag: "Complaint",
    activityTitle: "Front Door Fix",
    activityDate: "03, May 2023",
    activityAmount: "N12,000",
    iconProvider: "MaterialCommunityIcons",
  },
  {
    activityIcon: "unlock",
    activityTag: "Gate access request",
    activityTitle: "John David",
    activityDate: "03, May 2023",
    activityAmount: "122ABC",
    iconProvider: "AntDesign",
  },
];
