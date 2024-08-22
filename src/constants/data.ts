import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons/";
import { ImageProps } from "react-native";
import images from "@src/constants/images";
import { RootStackParamList } from "@src/components/home/quickLinks";
import { ChatProps, ComplaintProps } from "@src/models/chat";

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

export const UserChats: ChatProps[] = [
  {
    name: "User1",
    image: images.user.propertyManager,
    message: "Sent a document",
    time: "1hr",
    messageCount: "1",
  },
  {
    name: "User2",
    image: images.user.cso,
    message:
      "A very long message from user2. lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis officiis aliquam adipisci tempore hic obcaecati laboriosam, eveniet corporis. Ratione quam dolores voluptate beatae nam! Esse sit quidem distinctio sint. Vero.",
    time: "1hr",
  },
];

export const UserComplaints: ComplaintProps[] = [
  {
    name: "Leak in the kitchen",
    image: images.user.complaint,
    time: "1hr",
    state: "PENDING",
  },
  {
    name: "Leak in the kitchen2",
    image: images.user.complaint,
    time: "1hr",
    state: "CLOSED",
  },
];
