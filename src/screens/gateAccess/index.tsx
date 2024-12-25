import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import AppTopTabBar, { TabItem } from "@src/components/common/AppTopTabBar";
import { useGateRequestQuery } from "@src/hooks/useGateAcessQuery";
import { Feather } from "@expo/vector-icons";
import { formatDate, getInitials } from "@src/utils/helper";
import images from "@src/constants/images";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomModal from "@src/components/CustomModal";
import GateAccessCard from "@src/components/GateAccess/GateAccessCard";
import { useMutation } from "@tanstack/react-query";
import { ToastService } from "react-native-toastier";
import { revokeGateAccess } from "@src/api/gateRequest";
import AppToast from "@src/components/common/AppToast";
import { queryClient } from "@src/providers/get-query-client";

type Props = {};

const GateAccessHome = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const tabs: Array<TabItem> = [
    {
      name: "",
      label: "ALL",
    },
    {
      name: "PENDING",
      label: "UPCOMING",
    },
    {
      name: "CONFIRMED",
      label: "COMPLETED",
    },
  ];

  const [activeTab, setActiveTab] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1000);
  const [selectedAccessCode, setSelectedAccessCode] = useState<any>({});
  const accessInfoModalRef = React.useRef<any>(null);

  const { data, isFetching, isLoading, isError } = useGateRequestQuery(
    page,
    pageSize,
    activeTab
  );

  const handleItemPress = (item: any) => {
    setSelectedAccessCode({
      ...item,
      guestName: item.firstName + " " + item.lastName,
      code: item.accessCode,
      address: item.location,
    });
    accessInfoModalRef.current?.open();
  };

  const handleRevokeAccess = async () => {
    await revokeGateAccessMutation.mutateAsync();
    accessInfoModalRef.current?.close();
  };

  const revokeGateAccessMutation = useMutation({
    mutationFn: async () => {
      return await revokeGateAccess(selectedAccessCode?.id || "");
    },
    mutationKey: ["addToFrequent"],
    onError: () => {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#ef4444",
        },
        children: (
          <AppToast
            message={"An error occurred"}
            leftIcon='alert-circle'
            color='#fff'
          />
        ),
        right: <View></View>,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["frequentVisitors"]
      });
      queryClient.invalidateQueries({
        queryKey: ["gateAccess"]
      });
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#FFF1C6",
        },
        children: (
          <AppToast
            message={"Revoked access successfully"}
            leftIcon='check-circle'
          />
        ),
        right: <View></View>,
      });
    },
  });

  return (
    <View className='flex-1 pt-3'>
      <View className='absolute z-10 w-full'>
        <AppTopTabBar
          activeTab={activeTab}
          tabs={tabs}
          onTabPressed={(tab) => setActiveTab(tab)}
        />
      </View>
      {isLoading || isFetching ? (
        <View className='flex-1 items-center justify-center py-16 mx-[5vw]'>
          <ActivityIndicator size='large' color='#F6411B' />
        </View>
      ) : (
        <View className='flex-1 pt-16 mx-[5vw]'>
          <FlatList
            data={data?.accessLogs || []}
            keyExtractor={(item) => item.accessCode}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={() => (
              <View className='flex items-center justify-center p-14 gap-4'>
                <View>
                  <Image
                    source={images.gateAccess.empty}
                    height={262}
                    width={143}
                  />
                </View>
                <View>
                  <Text className='text-center font-medium text-xl text-[#050402]'>
                    Create access code for
                  </Text>
                  <Text className='text-center font-medium text-xl text-[#050402]'>
                    people coming to visit you
                  </Text>
                </View>
              </View>
            )}
            renderItem={({ item }) => (
              <Pressable
                className='w-full'
                onPress={() => handleItemPress(item)}
              >
                {({ pressed }) => (
                  <View
                    className={`${
                      pressed ? "opacity-50" : ""
                    } flex-row gap-2 items-center`}
                  >
                    <View
                      className={`${
                        item.status === "CONFIRMED"
                          ? "bg-[#BAEFC2]"
                          : "bg-[#EFEDBA]"
                      } rounded-full h-14 w-14 items-center justify-center`}
                    >
                      {item.status === "CONFIRMED" ? (
                        <Feather name='check' size={24} color='#314C1C' />
                      ) : (
                        <Text className='text-[#B89130]'>
                          {getInitials(item.firstName + " " + item.lastName)}
                        </Text>
                      )}
                    </View>
                    <View className='flex-1'>
                      <Text className='font-medium text-lg'>
                        {item.firstName} {item.lastName}
                      </Text>
                      <View className='flex-row gap-2.5 items-center'>
                        <Text className='text-[#050402] text-xs font-medium'>
                          {formatDate(item.updatedAt).toString()}
                        </Text>
                        <Text className='text-[#050402] text-xs font-medium'>
                          {item.status}
                        </Text>
                      </View>
                    </View>
                    <View className='shrink-0 items-center justify-center bg-white rounded-full'>
                      <Text className='text-[#050402] font-medium text-lg py-2 px-2.5'>
                        {item.accessCode}
                      </Text>
                    </View>
                    {/* <View className='shrink-0'>
                    <Feather name='more-horizontal' size={16} color='black' />
                  </View> */}
                  </View>
                )}
              </Pressable>
            )}
          />
        </View>
      )}

        <Pressable
          onPressIn={() => {
            navigation.navigate("NewAccess");
          }}
        >
          {({ pressed }) => (
            <View
              className={`${
                pressed ? "opacity-50" : ""
              } absolute bottom-16 right-[5vw] rounded-full w-[72px] h-[72px] flex justify-center items-center bg-[#F6411B]`}
            >
              <Feather name='plus' size={24} color='#fff' />
            </View>
          )}
        </Pressable>


      <CustomModal
        modalizeRef={accessInfoModalRef}
        modalContent={
          <GateAccessCard
            accessCodeData={selectedAccessCode}
            revokeAccess={handleRevokeAccess}
          />
        }
      />
    </View>
  );
};

export default GateAccessHome;

const styles = StyleSheet.create({
  listContainer: {
    gap: 32,
  },
});
