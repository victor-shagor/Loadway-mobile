import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ThemedText } from "@src/components/ThemedText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { appColors } from "@src/constants/colors";
import { ChatProps } from "@src/models/chat";
import images from "@src/constants/images";
import useOnboardingContext from "@src/utils/Context";
import EmptyMessage from "./emptyMessage";
import CustomModal from "../CustomModal";
import { SafeAreaView } from "../layout/safeAreaView";

const UserChats: ChatProps[] = [
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
    message: "Message from user2",
    time: "1hr",
  },
];

const SearchInput = () => {
  return (
    <View style={styles.searchInputContainer}>
      <View style={styles.searchInput}>
        <AntDesign
          name="search1"
          size={24}
          color={appColors.lightGray}
          style={{ alignSelf: "center" }}
        />
        <TextInput
          keyboardType={"default"}
          onSubmitEditing={(event) => console.log(event.nativeEvent.text)}
          placeholder={"Search"}
          placeholderTextColor={appColors.deepGray}
          onChangeText={(e) => console.log(e)}
          style={{ flex: 1 }}
        />
      </View>

      <TouchableOpacity>
        <Ionicons name="filter" size={24} color={appColors.lightGray} />
      </TouchableOpacity>
    </View>
  );
};

const Chat = () => {
  // const { currentUser } = useOnboardingContext();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        {UserChats.length < 1 ? (
          <EmptyMessage message={"You have no messages"} />
        ) : (
          <View style={{ position: "relative", flex: 1 }}>
            <FlatList
              data={UserChats}
              renderItem={({ item }) => (
                <View>
                  <ThemedText>{item.name}</ThemedText>
                </View>
              )}
              keyExtractor={(item) => item.name}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={<SearchInput />}
              ListHeaderComponentStyle={{ flex: 1 }}
              contentContainerStyle={{ gap: 10 }}
            />

            <View style={{ flex: 1 }}>
              {/* <View style={styles.customModalWrapper}> */}
              <CustomModal
                triggerItem={
                  <ThemedText style={{ color: "red" }}>Click Me</ThemedText>
                }
                triggerItemStyle={{ backgroundColor: "red" }}
                modalContent={
                  <View>
                    <ThemedText>Modal</ThemedText>
                  </View>
                }
              />
            </View>
          </View>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 0.9,
    backgroundColor: appColors.gray,
    padding: 8,
    gap: 15,
    minHeight: 56,
    borderRadius: 10,
  },
  // customModalWrapper: {
  //   position: "absolute",
  //   right: 20,
  //   top: "50%",
  //   bottom: "50%",
  // },
});

export default Chat;
