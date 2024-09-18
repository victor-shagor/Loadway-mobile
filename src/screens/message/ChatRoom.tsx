import {
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ThemedText } from "@src/components/ThemedText";
import { renderIcon } from "@src/components/common/renderIcon";

export type ChatRoomIndividualChatProps = {
  type?: "default" | "title" | "small";
  text: string;
  candidate: "You" | "Security" | "Property Manager";
  time: any;
  backgroundColor: string;
  TextColor: string;
};

const ChatRoom = () => {
  return (
    <View className=" bg-white h-screen">
      <ScrollView className="">
        <ChatRoomIndividualChat
          text=" Lorem ipsum dolor sit amet consectetur. Nibh pharetra sed nisi molestie
        gravida sit volutpat."
          candidate="You"
          time="12pm"
          backgroundColor="#d4d4d47a"
          TextColor="#3F3C31"
        />
        <ChatRoomIndividualChat
          text=" Lorem ipsum dolor sit amet consectetur. Nibh pharetra sed nisi molestie
        gravida sit volutpat."
          candidate="Security"
          time="12pm"
          backgroundColor="#F6411B"
          TextColor="#FFFFFF"
        />
        <ChatRoomIndividualChat
          text=" Lorem ipsum dolor sit amet consectetur. Nibh pharetra sed nisi molestie
        gravida sit volutpat."
          candidate="Security"
          time="12pm"
          backgroundColor="#F6411B"
          TextColor="#FFFFFF"
        />
        <ChatRoomIndividualChat
          text=" Lorem ipsum dolor sit amet consectetur. Nibh pharetra sed nisi molestie
        gravida sit volutpat."
          candidate="Security"
          time="12pm"
          backgroundColor="#F6411B"
          TextColor="#FFFFFF"
        />
        <ChatRoomIndividualChat
          text=" Lorem ipsum dolor sit amet consectetur. Nibh pharetra sed nisi molestie
        gravida sit volutpat."
          candidate="Security"
          time="12pm"
          backgroundColor="#F6411B"
          TextColor="#FFFFFF"
        />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="bg-blue-900"
      >
        <View  
         className="bg-white w-screen fixed bottom-[10vh] 
         pt-[2vh] pb-[4vh] flex-row">
          <TextInput
            placeholder="Write a message..."
            keyboardType="default"
            placeholderTextColor={"#8C8A83E5"}
            className=" w-[90vw] h-[7vh] border-[0.5px] border-[#8c8a8342]
            bg-[#d4d4d452] rounded-xl px-[2vw] mx-[5.2vw]"
          />
          <TouchableOpacity 
           className=" bg-[#FF5722] w-[10vw] h-[4vh] rounded-lg flex-row items-center
           right-[20vw] top-[1.5vh] justify-center pt-[1px]">
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
  text,
  candidate,
  time,
  backgroundColor,
  TextColor
}: ChatRoomIndividualChatProps) => {
  const flowRight = candidate !== "You" ? "-5%" : "-20%";
  const flowRightSmallText = candidate !== "You" ? "-7%" : "-75%";

  return (
    <View className="">
      <View
        className="w-[75vw] mt-[5vh] p-[4vw] rounded-xl"
        style={{ right: flowRight, backgroundColor }}
      >
        <ThemedText type="default" 
        className="text-[14px]" 
        style={{ color: TextColor}}
        >
          {text}
        </ThemedText>
      </View>
      <ThemedText
        type="small"
        className=" text-[#66635A] mt-[1vh]"
        style={{ right: flowRightSmallText }}
      >
        {candidate} &#x2022; {time}
      </ThemedText>
    </View>
  );
};
