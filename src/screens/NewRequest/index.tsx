import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import FrequentVisit from "@src/components/NewRequest/FrequentVisit";
import SelectContact from "@src/components/NewRequest/SelectContact";
import Form from "@src/components/NewRequest/Form";
import OrFill from "@src/components/NewRequest/OrFill";
import AccessSent from "@src/components/Modal/AccessSent";

const NewRequest = () => {
  const temporaryData = [
    {
      firstName: "David",
      lastName: "John",
      phoneNumber: "+2349017262820",
      image: require("@src/assets/icons/complaint-image.png"),
      id: Math.floor(Math.random() * 10),
    },
    {
      firstName: "Mark",
      lastName: "Jenny",
      phoneNumber: "+2349017262820",
      image: require("@src/assets/icons/complaint-image.png"),
      id: Math.floor(Math.random() * 10),
    },
    {
      firstName: "Dad",
      phoneNumber: "+2349017262820",
      image: require("@src/assets/icons/complaint-image.png"),
      id: Math.floor(Math.random() * 10),
    },
  ];

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ScrollView className=" flex-1">
      <View className=" bg-[#FAFAFA] h-screen">
        <FrequentVisit data={temporaryData} />
        <SelectContact />
        <OrFill />
        <Form setModalVisible={setModalVisible} />
        <AccessSent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </ScrollView>
  );
};

export default NewRequest;
