import { timestampDisplay } from "@src/utils/helper";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { blurhash } from "@src/constants/data";
import images from "@src/constants/images";
import ProfileIcon from "../icons/ProfileIcon";
import { useGetCurrentUserQuery } from "@src/hooks/useUserQuery";

const ViewComplaint = ({ complaint }: any) => {
  const { data: currentUser, isLoading, isFetched } = useGetCurrentUserQuery();

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

  if (isLoading || !isFetched) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' color='#F6411B' />
      </View>
    );
  }

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
        {(complaint?.statusHistory || []).map((item: any, index: any) => (
          <View key={index} className='flex-row' style={{ gap: 10 }}>
            <View>
              <View className='h-3 w-3 rounded-full bg-[#E85637]'></View>
              {(index < 1 ||
                index !== (complaint?.statusHistory || []).length - 1) && (
                <View className='absolute left-[4.5px] h-[109px] w-0.5 bg-[#E85637]'></View>
              )}
            </View>
            <View className='flex-1' style={{ gap: 4 }}>
              <View className='flex-row justify-between'>
                <View className='flex-1 flex-row items-center'>
                  <View className='w-10 h-10 items-center justify-center bg-[#FFC7C4] rounded-full mr-2'>
                    {index === 0 ? (
                      <Image source={currentUser?.profilePicture} contentFit="cover" className='w-10 h-10 rounded-full' />
                    ) : (
                      <View className='w-6 h-6'>
                        <ProfileIcon width={50} height={50} color='#00000080' />
                      </View>
                    )}
                  </View>
                  <Text className='text-[#050402] font-medium'>
                    {index === 0 ? "RESIDENT" : "P.MANAGER"}
                  </Text>
                </View>
                <View
                  className={`${
                    item?.status === "PENDING" ? "bg-[#EFDCBA]" : "bg-[#BAEFC9]"
                  } shrink-1 rounded-full h-10 px-3 justify-center items-center`}
                >
                  <Text className='text-[#050402]/50'>{item?.status}</Text>
                </View>
              </View>
              <Text className='text-[#050402]/50'>{item?.response}</Text>
              <View>
                <Text className='text-[#4C3A1C text-xs'>{item?.timestamp}</Text>
              </View>
            </View>
          </View>
        ))}

        <View className='flex-row' style={{ gap: 10 }}>
          <View>
            <View className='h-3 w-3 rounded-full bg-[#E85637]'></View>
          </View>
          <View className='flex-1' style={{ gap: 4 }}>
            <View className='flex-row justify-between'>
              <View className='flex-1 flex-row items-center'>
                <View className='w-10 h-10 items-center justify-center bg-[#FFC7C4] rounded-full mr-2'>
                  <View className='w-6 h-6'>
                    <ProfileIcon width={50} height={50} color='#00000080' />
                  </View>
                </View>
                <Text className='text-[#050402] font-medium'>P.MANAGER</Text>
              </View>
            </View>
            <Text className='text-[#050402]/50'>Awaiting response...</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewComplaint;
