import { ImageProps } from "react-native";
import { User } from "./User";

export interface ChatProps {
  image: ImageProps;
  name: string;
  message: string;
  time: string;
  messageCount?: string;
  state?: string;
}
export interface ComplaintProps {
  attachment: string[];
  createdAt: string;
  description: string;
  id: string;
  personnel: string;
  priorityLevel: string;
  response: null;
  status: string;
  statusHistory: { status: string; timestamp: string }[];
  title: string;
  updatedAt: string;
  user: User;
}

export interface ChatRenderItemProps {
  index: number;
  chatProps: ChatProps;
}
export interface ComplaintRenderItemProps {
  index: number;
  complainProps: ComplaintProps;
  complaintsArray: ComplaintProps[];
}

export interface ComplaintPaginationProps {
  currentPage: number;
  nextPage: number;
  perPage: number;
  previousPage: number;
  totalCount: number;
  totalPages: number;
}

export interface ComplaintAPIProps {
  complaints?: ComplaintProps[];
  pagination?: ComplaintPaginationProps;
}
