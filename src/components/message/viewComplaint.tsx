import { timestampDisplay } from "@src/utils/helper";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { blurhash } from "@src/constants/data";
import images from "@src/constants/images";

const ViewComplaint = ({ complaint }: any) => {
  const timelinePlaceholderData = [
    {
      title: "SENT",
      description: "Complaint submitted, awaiting review",
      time: "Pending",
    },
    {
      title: "OPEN",
      description: "Complaint reviewed, awaiting action",
      time: "Pending",
    },
    {
      title: "ONGOING",
      description: "Complaint in progress, awaiting completion",
      time: "Pending",
    },
    {
      title: "CLOSED",
      description: "Complaint completed, awaiting feedback",
      time: "Pending",
    },
  ];
  const [timelineData, setTimelineData] = useState(timelinePlaceholderData);

  useEffect(() => {
    if (complaint && (complaint?.statusHistory || []).length > 0) {
      setTimelineData(
        timelineData.map((item, index) => {
          const { formattedDate, formattedTime } = timestampDisplay(
            complaint.statusHistory[index]?.timestamp
          );
          return {
            ...item,
            description:
              complaint.statusHistory[index]?.response ||
              timelinePlaceholderData[index].description,
            time: complaint.statusHistory[index]?.timestamp
              ? formattedDate + " | " + formattedTime
              : "Pending",
          };
        })
      );
    }
  }, [complaint]);

  return (
    <ScrollView className='px-4 py-10 pb-24 bg-[#F2F2F2] rounded-t-xl'>
      <View className='items-center pb-8' style={{ gap: 8 }}>
        <Image
          source={
            (complaint?.attachment || []).length > 0
              ? complaint?.attachment[0]
              : images.complaint.repair
          }
          contentFit='cover'
          className='w-20 h-20 rounded-full'
          placeholder={{ blurhash: blurhash }}
        />
        <Text className='text-[#050402] font-medium'>
          {complaint?.title || ""}
        </Text>
        <Text className='text-[#050402]/50 font-medium'>
          {complaint.description}
        </Text>
      </View>
      <View style={{ gap: 16 }}>
        {timelineData.map((item, index) => (
          <View key={index} className='flex-row' style={{ gap: 10 }}>
            <View>
              <View className='h-3 w-3 rounded-full bg-[#E85637]'></View>
              {index !== timelineData.length - 1 && (
                <View className='absolute left-[4.5px] h-[100px] w-0.5 bg-[#E85637]'></View>
              )}
            </View>
            <View style={{ gap: 4 }}>
              <Text className='font-bold'>{item.title}</Text>
              <Text className='text-[#050402]/50'>{item.description}</Text>
              <View className='bg-white px-3 py-2 self-start rounded-full'>
                <Text className='text-[#4C3A1C text-xs'>{item.time}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ViewComplaint;
