import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons/";
import { ImageProps } from "react-native";
import images from "@src/constants/images";
import { QuickLinksRootStackParamList } from "@src/components/home/quickLinks";
import { ChatProps } from "@src/models/messaging";
import ComplaintIcon from "@src/components/icons/ComplaintIcon";
import ElectricityIcon from "@src/components/icons/ElectricityIcon";
import GuestIcon from "@src/components/icons/GuestIcon";

export type IconTypes =
  | keyof typeof AntDesign.glyphMap
  | keyof typeof Feather.glyphMap
  | keyof typeof MaterialCommunityIcons.glyphMap
  | keyof typeof Entypo.glyphMap
  | keyof typeof FontAwesome.glyphMap;

export type IconProvider =
  | "AntDesign"
  | "Feather"
  | "MaterialCommunityIcons"
  | "Entypo"
  | "FontAwesome";

export interface QuicklinkProps {
  name: string;
  href: keyof QuickLinksRootStackParamList;
  icon: any;
  bgColor: string;
  params?: Record<string, any>;
  iconColor: string;
}
export interface HousingBillsProps {
  bill_type: string;
  status: "ALREADY DUE" | "DUE IN A FEW DAYS";
  amount: number;
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

export type transactionProps = {
  name: string;
  href: keyof QuickLinksRootStackParamList;
  price: string;
  date: string;
  code?: string;
  time?: string;
};

export interface getHelp {
  icon: IconTypes;
  title: string;
  desc: string;
  iconProvider: IconProvider;
  color: string;
  id: number;
}
export interface getHelpDataContact {
  icon: string;
  title: string;
  iconProvider: IconProvider;
}

// export type paymentHistoryProps = {
//   name: string;
//   href: keyof RootStackParamList;
//   price: string;
//   date: string;
//   code: string;
//   time: string;
// };
export type HousingBillsnProps = {
  name: string;
  price: string;
  color: string;
};

export const quickLinksArray: QuicklinkProps[] = [
  {
    name: "Visitors",
    href: "GateAccess",
    icon: GuestIcon,
    bgColor: "#E8E23730",
    iconColor: "#E1B13A",
  },
  {
    name: "Requests",
    href: "Message",
    icon: ComplaintIcon,
    bgColor: "#3778E830",
    params: { complaint: true },
    iconColor: "#7B65F4",
  },
  {
    icon: ElectricityIcon,
    name: "Electricity",
    href: "Electricity",
    bgColor: "#8DE83730",
    iconColor: "#90D25D",
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
    time: "12hr",
    messageCount: "1",
  },
  {
    name: "User2",
    image: images.user.cso,
    message:
      "A very long message from user2. lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis officiis aliquam adipisci tempore hic obcaecati laboriosam, eveniet corporis. Ratione quam dolores voluptate beatae nam! Esse sit quidem distinctio sint. Vero.",
    time: "1hr",
    messageCount: "10",
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
];
export const QuickLinkBillsData: QuicklinkProps[] = [
  {
    icon: "zap",
    name: "Buy Electricity",
    href: "Electricity",
    iconProvider: "Feather",
  },
];

export const HousingBillsData: HousingBillsProps[] = [
  {
    bill_type: "Rent",
    status: "ALREADY DUE",
    amount: 2500000,
  },
  {
    bill_type: "Security",
    status: "DUE IN A FEW DAYS",
    amount: 20000,
  },
  {
    bill_type: "Estate Dues",
    status: "DUE IN A FEW DAYS",
    amount: 16000,
  },
  {
    bill_type: "Utilities",
    status: "DUE IN A FEW DAYS",
    amount: 300000,
  },
];

export const transactionData: transactionProps[] = [
  {
    name: "Electricity",
    href: "Electricity",
    price: "-N20,000",
    date: "Jan 01 2023, 11:00AM",
  },
  {
    name: "Wallet funding",
    href: "Electricity",
    price: "+N20,000",
    date: "Jan 01 2023, 11:00AM",
  },
  {
    name: "Electricity",
    href: "Electricity",
    price: "-N20,000",
    date: "Jan 01 2023, 11:00AM",
  },
];
export const HousingBillData: HousingBillsnProps[] = [
  {
    name: "Rent",
    price: "N2,500,000",
    color: "#805566",
  },
  {
    name: "Security",
    price: "N500,000",
    color: "#D4CAA6",
  },
  {
    name: "Estate Dues",
    price: "N16,000",
    color: "#C4A485",
  },
  {
    name: "Utilities",
    price: "N300,000",
    color: "#FEF2C6",
  },
];

export const paymentHistoryData: transactionProps[] = [
  {
    name: "Electricity",
    href: "Electricity",
    price: "-N20,000",
    date: "30.02.2023",
    code: "CS-123456",
    time: "10:00am",
  },
  {
    name: "Wallet funding",
    href: "Electricity",
    price: "-N20,000",
    date: "30.02.2023",
    code: "CS-123456",
    time: "10:00am",
  },
  {
    name: "Electricity",
    href: "Electricity",
    price: "-N20,000",
    date: "30.02.2023",
    code: "CS-123456",
    time: "10:00am",
  },
  {
    name: "Wallet funding",
    href: "Electricity",
    price: "-N20,000",
    date: "30.02.2023",
    code: "CS-123456",
    time: "10:00am",
  },
];

export const getHelpData: getHelp[] = [
  {
    id: 1,
    icon: "shield-cross-outline",
    title: "Building Security",
    desc: "Complain Building Office",
    iconProvider: "MaterialCommunityIcons",
    color: "#F2D8C0",
  },
  {
    id: 2,
    icon: "plus-circle-outline",
    title: "Fire Station",
    desc: "Find Nearest Fire Station",
    iconProvider: "MaterialCommunityIcons",
    color: "#FAA08D",
  },
  {
    id: 3,
    icon: "shield-cross-outline",
    title: "Police Station",
    desc: "Locate Your Area Police ",
    iconProvider: "MaterialCommunityIcons",
    color: "#A0808C",
  },
  {
    id: 4,
    icon: "medical-bag",
    title: "Medical Assistance",
    desc: "Find Nearest Hospitals",
    iconProvider: "MaterialCommunityIcons",
    color: "#FCDE71",
  },
];
export const getHelpDataContact: getHelpDataContact[] = [
  {
    icon: "phone",
    title: "Call your security",
    iconProvider: "Feather",
  },
  {
    icon: "copy",
    title: "Call your property manager",
    iconProvider: "Feather",
  },
];

export const complaintCategories = [
  {
    label: "Plumbing",
    value: "Plumbing",
  },
  {
    label: "Electrical",
    value: "Electrical",
  },
  {
    label: "Painting",
    value: "Painting",
  },
  {
    label: "Cleaning",
    value: "Cleaning",
  },
];

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
