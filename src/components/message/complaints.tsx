import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Pressable,
  RefreshControl,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import { ComplaintProps } from "@src/models/messaging";
import { ComplaintAPIProps } from "@src/models/messaging";
import ComplaintModal from "@src/screens/modals/messages/complaints";
import CustomModal from "../CustomModal";
import ViewComplaint from "./viewComplaint";
import { useGetComplaintsQuery } from "@src/hooks/useComplaintQuery";
import { timestampDisplay } from "@src/utils/helper";
import { Image } from "expo-image";
import { blurhash } from "@src/constants/data";
import images from "@src/constants/images";

export interface ComplaintStateProps {
  isLoading: boolean;
  data: ComplaintAPIProps | null;
}

const Complaints = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching, refetch } =
    useGetComplaintsQuery(search);

  const [triggerItem, setTriggerItem] = useState({} as ComplaintProps);

  const modalizeRef = useRef<Modalize>(null);
  const clickModalizeRef = useRef<Modalize>(null);

  const handleCreateComplaint = async () => {
    modalizeRef.current?.close();
    refetch();
  };

  return (
    <View className='flex-1'>
      {isLoading || isFetching ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color='#F6411B' />
        </View>
      ) : (
        <FlatList
          data={data?.complaints || []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={isFetching || isLoading}
              onRefresh={refetch}
              colors={["#F6411B"]}
              tintColor={"#F6411B"}
            />
          }
          ListEmptyComponent={() => (
            <View className='flex-1 items-center justify-center pt-32 px-14 gap-4'>
              <View className='w-44 h-40'>
                <Image
                  source={images.complaint.emptyComplaints}
                  contentFit='cover'
                  className='w-full h-full'
                />
              </View>
              <View>
                <Text className='text-center font-medium text-lg text-[#050402]'>
                  Requests to your facility manager will show up here
                </Text>
              </View>
            </View>
          )}
          renderItem={(item) => (
            <Pressable
              onPress={() => {
                setTriggerItem(item.item);
                clickModalizeRef.current?.open();
              }}
              children={({ pressed }) => (
                <View
                  className={`${pressed ? "opacity-50" : ""} flex-row`}
                  style={{ gap: 8 }}
                >
                  <View className='w-16 h-16 bg-[#F2F2F2] rounded-full border-2 border-[#B42020] shrink-0 p-1'>
                    <Image
                      source={item.item.attachment[0] as any}
                      contentFit='cover'
                      className='w-full h-full rounded-full'
                      placeholder={{ blurhash: blurhash }}
                    />
                  </View>
                  <View className='flex-1'>
                    <View className='flex-row'>
                      <View className='flex-1'>
                        <Text>
                          {timestampDisplay(item.item.createdAt).formattedDate}{" "}
                          at{" "}
                          {timestampDisplay(item.item.createdAt).formattedTime}
                        </Text>
                        <Text className='font-bold text-base'>
                          {item.item.title}
                        </Text>
                      </View>
                      <View
                        className={`${
                          item.item.status === "PENDING"
                            ? "bg-[#EFDCBA]"
                            : "bg-[#BAEFBC]"
                        } shrink-0 items-center justify-center rounded-full px-2`}
                      >
                        <Text
                          className={`${
                            item.item.status === "PENDING"
                              ? "text-[#4C3A1C]"
                              : "text-[#264C1C]"
                          } font-medium text-xs`}
                        >
                          {item.item.status === "PENDING"
                            ? "PENDING"
                            : "RESOLVED"}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text numberOfLines={2} className='text-[#050402]/50 '>
                        {item.item.description}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        />
      )}
      <Pressable onPressIn={() => modalizeRef.current?.open()}>
        {({ pressed }) => (
          <View
            className={`${
              pressed ? "opacity-50" : ""
            } absolute bottom-28 right-[5vw] rounded-full w-[72px] h-[72px] flex justify-center items-center bg-[#F6411B]`}
          >
            <Feather name='plus' size={24} color='#fff' />
          </View>
        )}
      </Pressable>
      <View>
        <CustomModal
          modalizeRef={modalizeRef}
          modalContent={
            <ComplaintModal handleCreateComplaint={handleCreateComplaint} />
          }
        />

        <CustomModal
          modalizeRef={clickModalizeRef}
          modalContent={<ViewComplaint complaint={triggerItem} />}
        />
      </View>
    </View>
  );
};

export default Complaints;
