import { ImageProps } from "react-native";

export interface ChatProps {
  image: ImageProps;
  name: string;
  message: string;
  time: string;
  messageCount?: string;
  state?: string;
}
export type ComplaintProps = Pick<
  ChatProps,
  "image" | "name" | "state" | "time"
>;

export interface ChatRenderItemProps {
  index: number;
  chatProps: ChatProps;
}
export interface ComplaintRenderItemProps {
  index: number;
  complainProps: ComplaintProps;
}
