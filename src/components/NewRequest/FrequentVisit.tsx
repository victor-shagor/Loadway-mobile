import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { ImageProps } from "react-native";

export type FrequentRequestDataType = {
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  image: ImageProps | undefined;
  id: number;
};

export type FrequentVisitProps = {
  data: FrequentRequestDataType[];
};

const FrequentVisit = ({ data }: FrequentVisitProps) => {
  return (
    <>
      <View className="w-[95vw]">
        <View>
          <Text className="text-[#66635A] text-[14px] font-semibold p-[5%]">
            Frequent Visits
          </Text>
        </View>
        <ScrollView className=" flex-row" horizontal showsHorizontalScrollIndicator={false}>
          {data.map((data, index) => {
            const { image, firstName, lastName, phoneNumber } = data;
            return (
              <View
                key={index}
                className=" bg-white shadow-sm w-[32vw] flex 
                 justify-center items-center p-4 rounded-lg mx-4"
              >
                <Image source={image} className="w-[20vw] h-[9.5vh]" />
                <Text className="text-[#66635A] text-[14px] font-semibold py-5">
                  {firstName} {lastName}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default FrequentVisit;
