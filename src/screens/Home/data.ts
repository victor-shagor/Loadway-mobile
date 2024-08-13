import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons/";
import { ImageProps } from "react-native";
import images from "@src/constants/images";

export type IconTypes =
  | keyof typeof AntDesign.glyphMap
  | keyof typeof Feather.glyphMap
  | keyof typeof MaterialCommunityIcons.glyphMap;

export type IconProvider = "AntDesign" | "Feather" | "MaterialCommunityIcons";

export interface QuicklinkProps {
  icon: IconTypes;
  name: string;
  href?: string;
  iconProvider: IconProvider;
}

export interface RecentChatProps {
  image: ImageProps;
  name: string;
  itemSent: string;
}

export const quickLinksArray: QuicklinkProps[] = [
  { icon: "unlock", name: "Gate Access", href: "/", iconProvider: "AntDesign" },
  { icon: "alert-circle", name: "Alert", href: "/", iconProvider: "Feather" },
  {
    icon: "chat-question-outline",
    name: "Complaints",
    href: "/",
    iconProvider: "MaterialCommunityIcons",
  },
  {
    icon: "lightning-bolt-outline",
    name: "Buy Elecricity",
    href: "/",
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
