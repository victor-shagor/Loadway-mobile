import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@src/components/ThemedText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { appColors } from "@src/constants/colors";
import { UserChats } from "@src/constants/data";
import ChatModal from "@src/screens/modals/messages/chat";
import EmptyMessage from "./emptyMessage";
import SearchInput from "./searchInput";
import { Modalize } from "react-native-modalize";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChatRenderItemProps, Chats } from "@src/models/messaging";
import { getChats } from "@src/api/chats";
import images from "@src/constants/images";
import { useChatContext } from "@src/context/chats";
import { socket } from "@src/App";

export type paramList = {
  ChatRoom: any;
};

const ChatRenderItem = ({ chatProps, index }: ChatRenderItemProps) => {
  const naviagtion = useNavigation<StackNavigationProp<paramList>>();

  return (
    <>
      <TouchableOpacity onPress={() => naviagtion.navigate("ChatRoom", {chatId: chatProps.id, recipientId: chatProps.recipientId})}>
        <View style={styles.chatMessageContainer}>
          <Image
            source={images.user.propertyManager}
            style={{ width: 50, height: 50 }}
          />
          <View style={[styles.chatMessage]}>
            <View style={{ gap: 2, flex: 1 }}>
              <ThemedText type="title">
                {chatProps.adminRole === "SECURITY"
                  ? "SECURITY"
                  : "PROPERTY MANAGER"}
              </ThemedText>
              <ThemedText
                style={{ width: "100%", maxWidth: "80%" }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {chatProps.lastMessage ? chatProps.lastMessage : "No message yet"}
              </ThemedText>
            </View>

            <View style={{ alignItems: "center", gap: 10 }}>
              {/* <ThemedText type="small">{chatProps.time}</ThemedText> */}
              {chatProps.unread > 0  && (
                <View
                  style={styles.messageCountContainer}
                  className="w-[6.5vw] h-[3vh] rounded-full"
                >
                  <ThemedText
                    style={{ color: appColors.white }}
                    className="text-[12px]"
                  >
                    {chatProps.unread}
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={[
          {
            borderBottomWidth: index !== UserChats.length - 1 ? 0.5 : 0,
            marginLeft: 20,
            borderBottomColor: "#31312F33",
            width: "90%",
          },
        ]}
      />
    </>
  );
};

const Chat = () => {
  const modalizeRef = useRef<Modalize>(null);
  const { chats, setChats } = useChatContext();

  useFocusEffect(
    useCallback(() => {
      const fetchChats = async () => {
        const newChats = await getChats();
        setChats(newChats);
      };

      fetchChats();
    }, [setChats])
  );

  useEffect(() => {

    // Listen for new messages
    socket.on("newMessage", (newMessage) => {
      // Add new message to the messages array
       getChats().then(res => setChats(res));
    });

    // Cleanup listener when component unmounts
    return () => {
      socket.off("nessage");
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <>
          <FlatList
            data={chats}
            renderItem={({ item, index }) => (
              <ChatRenderItem chatProps={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyMessage message={"You have no messages"} /> // Shouldn't be empty since it is defined and constant. Rght?
            }
            ListHeaderComponent={<SearchInput />}
            ListHeaderComponentStyle={{ flex: 1, marginBottom: 20 }}
          />
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  chatMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 80,
    padding: 10,
    flex: 1,
    gap: 15,
  },
  chatMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    flex: 1,
    paddingBottom: 5,
  },
  messageCountContainer: {
    backgroundColor: appColors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTriggerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    flex: 1,
    position: "absolute",
    top: "70%",
    right: 0,
    borderRadius: 50,
    backgroundColor: appColors.orange,
    padding: 10,
  },
});

export default Chat;
