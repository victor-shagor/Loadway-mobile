import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ThemedText } from "@src/components/ThemedText";
import { renderIcon } from "@src/components/common/renderIcon";
import { useChatContext } from "@src/context/chats";
import { useRoute } from "@react-navigation/native";
import { getMessages, updateMessages } from "@src/api/chats";
import EmptyMessage from "@src/components/message/emptyMessage";
import useOnboardingContext from "@src/utils/Context";
import { Chats } from "@src/models/messaging";
import { socket } from "@src/App";
import dayjs from "dayjs";

export type ChatRoomIndividualChatProps = {
  last?: boolean;
  chatProps: {
    content: string;
    authorId: string;
    createdAt: any;
    chat: Chats;
  };
  showTime: boolean;
};

const groupMessages = (messages: any) => {
  return messages.reduce((groups: any, message: any) => {
    const messageDate = dayjs(message.createdAt)
      .startOf("day")
      .format("YYYY-MM-DD");
    if (!groups[messageDate]) {
      groups[messageDate] = [];
    }
    groups[messageDate].push(message);
    return groups;
  }, {});
};

const ChatRoom = () => {
  const { messages, setMessages } = useChatContext();
  const { params } = useRoute();

  const chatId = params?.chatId;
  const recipientId = params?.recipientId;

  const [text, setText] = useState("");
  const { currentUser } = useOnboardingContext();
  const [initialScrollDone, setInitialScrollDone] = useState(false);

  const handleSubmit = () => {
    console.log(text);
    const data = {
      recipientId,
      message: text,
      authorId: currentUser?.id,
      chatId,
    };
    socket.emit("message", data);
    setText("");
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      // Add a slight delay to ensure the keyboard is fully visible before scrolling
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 50);
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {

    // Fetch initial messages
    (async () => {
      const [newChats] = await Promise.all([getMessages(chatId), updateMessages(chatId)]) ;
      setMessages(newChats);
    })();

    // Listen for new messages
    socket.on("newMessage", (newMessage) => {
      // Add new message to the messages arrays
      setMessages((prevMessages: any) => [...prevMessages, newMessage]);
      
    });

    // Cleanup listener when component unmounts
    return () => {
      socket.off("newMessage");
    };
  }, [chatId]);

  const flatListRef = useRef<FlatList>(null);

  const groupedMessages = groupMessages(messages);
  const groupedMessageDates = Object.keys(groupedMessages);

  const formatMessageDate = (date: any) => {
    const today = dayjs().startOf("day");
    const messageDate = dayjs(date);
    if (messageDate.isSame(today, "day")) {
      return "Today";
    } else if (messageDate.isSame(today.subtract(1, "day"), "day")) {
      return "Yesterday";
    } else if (messageDate.year() === today.year()) {
      return messageDate.format("ddd, DD MMM");
    } else {
      return messageDate.format("DD MMM YYYY");
    }
  };

  return (
    <View className=" bg-[#f1f1f1] h-screen">
      <FlatList
        ref={flatListRef}
        data={groupedMessageDates}
        renderItem={({ item: date }) => (
          <View>
            {/* Display the grouped date */}
            <ThemedText className="text-center text-gray-500 font-semibold my-2">
              {formatMessageDate(date)}
            </ThemedText>

            {/* Render each message under the date */}
            {groupedMessages[date]?.map((message, index) => {
              const previousMessage = groupedMessages[date][index - 1];
              const showTime =
                !previousMessage ||
                !dayjs(message.createdAt).isSame(
                  previousMessage.createdAt,
                  "minute"
                );
              return (
                <ChatRoomIndividualChat
                  key={index}
                  chatProps={message}
                  last={index === groupedMessages[date].length - 1}
                  showTime={showTime}
                />
              );
            })}
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyMessage message={"You have no messages"} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        onContentSizeChange={(contentWidth, contentHeight) => {
          if (!initialScrollDone) {
            flatListRef.current?.scrollToOffset({
              offset: messages.length * contentHeight,
              animated: false,
            });
            setInitialScrollDone(true); // Mark initial scroll as done
          } else {
            // Scroll with animation for new messages
            flatListRef.current?.scrollToOffset({
              offset: messages.length * contentHeight,
              animated: true,
            });
          }
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          className="bg-white w-screen fixed bottom-[12vh] 
         pt-[2vh] pb-[4vh] flex-row mt-5"
        >
          <TextInput
          onFocus={() => {
            setTimeout(() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }, 50); // Delay scroll after focus
          }}
            placeholder="Write a message..."
            keyboardType="default"
            value={text}
            onChangeText={(text) => setText(text)}
            placeholderTextColor={"#8C8A83E5"}
            className=" w-[90vw] h-[7vh] border-[0.5px] border-[#8c8a8342]
            bg-[#d4d4d452] rounded-xl px-[2vw] mx-[5.2vw]"
          />
          <TouchableOpacity
            onPress={handleSubmit}
            className=" bg-[#FF5722] w-[10vw] h-[4vh] rounded-lg flex-row items-center
           right-[20vw] top-[1.5vh] justify-center pt-[1px]"
          >
            {renderIcon("send", "Feather", 25, "#FFF")}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
//
export default ChatRoom;

export const ChatRoomIndividualChat = ({
  chatProps,
  last,
  showTime,
}: ChatRoomIndividualChatProps) => {
  const { currentUser } = useOnboardingContext();
  const { content, authorId, createdAt, chat } = chatProps;
  const candidate =
    authorId === currentUser?.id
      ? "You"
      : chat?.adminRole === "SECURITY"
      ? "Security"
      : "Property Manager";
  const backgroundColor = candidate === "You" ? "#F6411B" : "#ffffff";
  const textColor = candidate === "You" ? "#ffffff" : "#333333";
  const flowRight = candidate !== "You" ? "-5%" : "-20%";
  const flowRightSmallText = candidate !== "You" ? "-7%" : "-75%";
  const timeColor = candidate === "You" ? "#fcc8bd" : "#33333387";

  const time = createdAt ? dayjs(createdAt).format("HH:mm") : "";

  return (
    <View>
      <View
        className="w-[75vw] mt-[1vh] p-[5vw] rounded-xl"
        style={{ right: flowRight, backgroundColor }}
      >
        <View style={{ flexDirection: "row" }}>
          <ThemedText
            type="default"
            className="text-[14px]"
            style={{ color: textColor, flex: 6 }}
          >
            {content}
          </ThemedText>
          <ThemedText
            type="small"
            // className="text-[#66635A]"
            style={{ flex: 1, alignSelf: "flex-end", color: timeColor }}
          >
            {time}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};
