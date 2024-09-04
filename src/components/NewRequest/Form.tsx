import { View, Alert, TextInput, Button, TouchableOpacity } from "react-native";
import React from "react";

const Form = ({
    setModalVisible,
  }: {
    setModalVisible: (value: boolean) => void;
  }) => {
  return (
    <View>
      <TextInput
        placeholder="First Name"
        placeholderTextColor={"#66635A"}
        inputMode="text"
        className="mx-3  bg-[#D6D6D666] p-5 rounded-lg mb-5"
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor={"#66635A"}
        inputMode="text"
        className="mx-3  bg-[#D6D6D666] p-5 rounded-lg mb-5"
      />
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor={"#66635A"}
        inputMode="tel"
        className="mx-3  bg-[#D6D6D666] p-5 rounded-lg mb-5"
      />
      <TouchableOpacity className="bg-[#F6411B] mx-3 py-2 rounded-lg mt-[10%]">
        <Button
          title="Create Request"
          color="#FFFFFF"
          onPress={() => setModalVisible(true)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Form;
