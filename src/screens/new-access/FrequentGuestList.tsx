import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import React from "react";
import { getInitials } from "@src/utils/helper";
import { useGetFrequentVisitors } from "@src/hooks/useGateAcessQuery";
import images from "@src/constants/images";
import { Image } from "expo-image";
import CustomModal from "@src/components/CustomModal";
import GateAccessCard from "@src/components/GateAccess/GateAccessCard";
import { useMutation } from "@tanstack/react-query";
import { ToastService } from "react-native-toastier";
import AppToast from "@src/components/common/AppToast";
import { queryClient } from "@src/providers/get-query-client";
import { createGateAccess } from "@src/api/gateRequest";

const FrequentGuestList = () => {
  const { data, isLoading, isFetching } = useGetFrequentVisitors();
  const [accessCodeData, setAccessCodeData] = React.useState<any>({});
  const frequentInfoModalRef = React.useRef<any>(null);

  const handleOpenFrequentInfoModal = (item: any) => {
    setAccessCodeData({
      ...item,
      guestName: item.firstName + " " + item.lastName,
      code: item.accessCode,
      address: item.location,
    });
    mutation.mutate();
  };

  const mutation = useMutation({
    mutationFn: async () => {
      return await createGateAccess({
        firstName: accessCodeData?.firstName,
        lastName: accessCodeData?.lastName,
        phoneNumber: accessCodeData?.phoneNumber,
      });
    },
    mutationKey: ["createAccess"],
    onError: (error: any) => {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#ef4444",
        },
        children: (
          <AppToast
            message={error || "An error occurred"}
            leftIcon='alert-circle'
            color='#fff'
          />
        ),
        right: <View></View>,
      });
    },
    onSuccess: async (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["gateAccess"] });
      queryClient.invalidateQueries({ queryKey: ["frequentVisitors"] });
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#FFF1C6",
        },
        children: (
          <AppToast
            message={data?.message || "Access created successfully"}
            leftIcon='check-circle'
          />
        ),
        right: <View></View>,
      });
      setAccessCodeData({
        guestName: accessCodeData?.guestName,
        phoneNumber: accessCodeData?.phoneNumber,
        code: data?.data,
        address: accessCodeData?.address,
      });
      frequentInfoModalRef.current?.open();
    },
    onSettled: () => {},
  });

  return (
    <View className='flex-1 px-[5vw] gap-2.5 pb-12'>
      <Text>FREQUENT LIST</Text>
      <View className='bg-white rounded-lg p-5 flex-1'>
        {isLoading || isFetching ? (
          <View className='flex-1 items-center justify-center py-5 mx-[5vw] h-96'>
            <ActivityIndicator size='large' color='#F6411B' />
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ gap: 10 }}
            ListEmptyComponent={() => (
              <View className='flex items-center justify-center p-5 gap-4'>
                <View>
                  <Image
                    source={images.gateAccess.empty}
                    contentFit='cover'
                    className='h-40 w-20 '
                  />
                </View>
                <View>
                  <Text className='text-center font-medium text-lg text-[#050402]'>
                    Nobody has been added
                  </Text>
                  <Text className='text-center font-medium text-lg text-[#050402]'>
                    to your frequent list yet
                  </Text>
                </View>
              </View>
            )}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleOpenFrequentInfoModal(item)}
                children={({ pressed }) => (
                  <View
                    className={`${
                      pressed ? "opacity-50" : ""
                    } gap-4 flex-row items-center`}
                  >
                    <View className='items-center justify-center rounded-full h-14 w-14 bg-[#EFEDBA]'>
                      <Text className='text-xs text-[#B89130]'>
                        {getInitials(item.firstName + " " + item.lastName)}
                      </Text>
                    </View>
                    <View>
                      <Text className='text-[#050402] text-lg font-medium'>
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text className='text-[#050402]/50 text-xs font-medium'>
                        {item.phoneNumber}
                      </Text>
                    </View>
                  </View>
                )}
              />
            )}
          />
        )}
      </View>
      <CustomModal
        modalizeRef={frequentInfoModalRef}
        modalContent={
          <View className="justify-center items-center">
            <GateAccessCard accessCodeData={accessCodeData} />
          </View>
        }
      />
    </View>
  );
};

export default FrequentGuestList;
