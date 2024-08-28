import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { ThemedText } from "@src/components/ThemedText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { appColors } from "@src/constants/colors";
import { UserChats } from "@src/constants/data";
import { ChatRenderItemProps } from "@src/models/chat";
import ChatModal from "@src/screens/modals/messages/chat";
import EmptyMessage from "./emptyMessage";
import CustomModal from "../CustomModal";
import SearchInput from "./searchInput";
import { Modalize } from "react-native-modalize";

const ChatRenderItem = ({ chatProps, index }: ChatRenderItemProps) => {
  return (
    <View style={styles.chatMessageContainer}>
      <Image source={chatProps.image} style={{ width: 50, height: 50 }} />
      <View
        style={[
          styles.chatMessage,
          {
            borderBottomWidth: index !== UserChats.length - 1 ? 1 : 0,
            borderBottomColor: appColors.gray,
          },
        ]}
      >
        <View style={{ gap: 2, flex: 1 }}>
          <ThemedText type="title">{chatProps.name}</ThemedText>
          <ThemedText
            style={{ width: "100%", maxWidth: "80%" }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {chatProps.message}
          </ThemedText>
        </View>

        <View style={{ alignItems: "center", gap: 10 }}>
          <ThemedText type="small">{chatProps.time}</ThemedText>
          {chatProps.messageCount && (
            <View style={styles.messageCountContainer}>
              <ThemedText style={{ color: appColors.white }}>
                {chatProps.messageCount}
              </ThemedText>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const Chat = () => {

  const modalizeRef = useRef<Modalize>(null);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <>
          <FlatList
            data={UserChats}
            renderItem={({ item, index }) => (
              <ChatRenderItem chatProps={item} index={index} />
            )}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyMessage message={"You have no messages"} />
            }
            ListHeaderComponent={<SearchInput />}
            ListHeaderComponentStyle={{ flex: 1, marginBottom: 20 }}
          />

          <CustomModal
          modalizeRef={modalizeRef}
            triggerItem={
              <>
                <AntDesign name="plus" size={15} color={appColors.white} />
                <ThemedText style={{ color: appColors.white }}>
                  New Chat
                </ThemedText>
              </>
            }
            triggerItemStyle={styles.modalTriggerStyle}
            modalTitle="New Chat"
            modalContent={<ChatModal />}
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
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
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
