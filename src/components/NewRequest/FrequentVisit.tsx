import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { ImageProps } from "react-native";
import EmptyState from "../common/emptyState";

export type FrequentRequestDataType = {
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  image: ImageProps | undefined;
  id: number;
};

export type FrequentVisitProps = {
  data: FrequentRequestDataType[];
  setSelectedFrequent: (value: any) => void
};

const FrequentVisit = ({ data, setSelectedFrequent }: FrequentVisitProps) => {
  const renderItem = ({ item }: { item: FrequentRequestDataType }) => {
    const { firstName, lastName, phoneNumber } = item;
    const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
    return (
      <TouchableOpacity onPress={() => setSelectedFrequent({firstName, lastName, phoneNumber})}
        className=" bg-white shadow-sm w-[32vw] flex 
            justify-center items-center p-3 rounded-lg mx-2 mt-2 mb-2"
      >
        <View
          className="w-[20vw] h-[9.5vh] rounded-full bg-[#D6D6D666] justify-center items-center"
        >
          <Text className="text-[#66635A] text-[18px] font-semibold">
            {initials.toUpperCase()}
          </Text>
        </View>
        <Text className="text-[#66635A] text-[14px] font-semibold py-5">
          {firstName} {lastName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="w-[95vw] mb-10">
      <View>
        <Text className="text-[#66635A] text-[14px] font-semibold p-[5%]">
          Frequent Visits
        </Text>
      </View>
      {!data.length && (
        <View style={{ marginLeft: 10 }}>
          <EmptyState text="No Frequent visitors yet" />
        </View>
      )}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
};

export default FrequentVisit;
