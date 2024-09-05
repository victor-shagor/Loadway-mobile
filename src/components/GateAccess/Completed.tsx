import { View, ScrollView } from "react-native";
import React from "react";
import Constant from "./Constant";
import Button from "./Button";
import images from "@src/constants/images";


const Completed = () => {
  const TemporaryData = [
    {
      id: 1,
      name: "Sam Larry",
      status: "Completed visit",
      date: "05, May 2023",
      code: "145ABC",
      image: images.gateAccess.avatar,
    },
  ];

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="relative h-screen flex-1">
        {TemporaryData.map((data) => {
          const { id, name, status, date, code, image } = data;
          return (
            <Constant
              key={id}
              name={name}
              status={status}
              date={date}
              code={code}
              image={image}
            />
          );
        })}
        <Button />
      </View>
    </ScrollView>
  );
};

export default Completed;
