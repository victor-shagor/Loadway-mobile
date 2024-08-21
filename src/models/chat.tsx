import { ImageProps } from "react-native";

export interface ChatProps {
  image: string | ImageProps;
  name: string;
  message: string;
  time: string;
  messageCount?: string;
}
