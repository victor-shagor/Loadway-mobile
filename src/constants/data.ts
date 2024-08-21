import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons/";
import { ImageProps } from "react-native";
import images from "@src/constants/images";
import { RootStackParamList } from "@src/components/home/quickLinks";

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
  href: keyof RootStackParamList;
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
};

export type transactionProps = {
  name: string;
  href: keyof RootStackParamList;
  price: string;
  date: string;
}

export const quickLinksArray: QuicklinkProps[] = [
  {
    icon: "unlock",
    name: "Gate Access",
    href: "GateAccess",
    iconProvider: "AntDesign",
  },
  {
    icon: "alert-circle",
    name: "Alert",
    href: "Emergency",
    iconProvider: "Feather",
  },
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


export const HousingBills: QuicklinkProps[] = [
  {
    icon: "unlock",
    name: "Rent",
    href: "GateAccess",
    iconProvider: "AntDesign",
  },
  {
    icon: "alert-circle",
    name: "Security",
    href: "Emergency",
    iconProvider: "Feather",
  },
  {
    icon: "chat-question-outline",
    name: "Estate Dues",
    href: "Message",
    iconProvider: "MaterialCommunityIcons",
  },
  {
    icon: "zap",
    name: "Utilities",
    href: "Electricity",
    iconProvider: "Feather",
  },
];
export const OtherBills: QuicklinkProps[] = [
  {
    icon: "zap",
    name: "Electricity",
    href: "GateAccess",
    iconProvider: "Feather",
  },
  {
    icon: "wifi",
    name: "Internet",
    href: "Emergency",
    iconProvider: "AntDesign",
  },
  {
    icon: "chat-question-outline",
    name: "Airtime",
    href: "Message",
    iconProvider: "MaterialCommunityIcons",
  },
  {
    icon: "satellite-variant",
    name: "Cable Tv",
    href: "Electricity",
    iconProvider: "MaterialCommunityIcons",
  },
];

export const transactionData: transactionProps[] = [
  {
    name: "Electricity",
    href: "Electricity",
    price: "-N20,000",
    date: "Jan 01 2023, 11:00AM"
  },
  {
    name: "Wallet funding",
    href: "Electricity",
    price: "+N20,000",
    date: "Jan 01 2023, 11:00AM"
  },
  {
    name: "Electricity",
    href: "Electricity",
    price: "-N20,000",
    date: "Jan 01 2023, 11:00AM"
  },
]