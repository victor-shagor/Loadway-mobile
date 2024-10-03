import { createContext, useContext } from "react";

export type ChatContextType = {
  chats: any;
  setChats: (value: string) => void;
  messages: any;
  setMessages: (value: any) => void
};

const ChatContext = createContext<ChatContextType | null>(null);

export default ChatContext;

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("chat must be used within an requestProvider");
  }
  return context;
};

export const useChatContext = () => {
  const context = useChat()!;
  if (!context) {
    throw new Error("An error occurred");
  }

  return context;
};