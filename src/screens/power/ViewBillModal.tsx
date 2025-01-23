import { View, Modal, Pressable, Image, Text } from "react-native";
import React from "react";
import images from "@src/constants/images";
import { formatMoney, timestampDisplay } from "@src/utils/helper";
import useOnboardingContext from "@src/utils/Context";

const ViewBillModal = ({
  modalVisible,
  closeModal,
  item,
}: {
  modalVisible: boolean;
  closeModal: () => void;
  item: any;
}) => {
  const { currentUser } = useOnboardingContext();
  return (
    <View>
      <Modal visible={modalVisible} transparent animationType='slide'>
        <View className='bg-black/40 flex-1 h-screen justify-center items-center'>
          <Pressable
            onPressIn={closeModal}
            className='flex-1 absolute w-full h-full'
          ></Pressable>
          <View className='bg-white w-[85vw] rounded-2xl items-center py-10 px-10'>
            <View style={{ gap: 12 }} className='w-full'>
              <View className='bg-[#8DE837]/30 w-14 h-14 justify-center items-center self-center rounded-full'>
                <Image source={images.quickLInks.electricity} />
              </View>
              <Text className='text-[#050402] text-center font-medium text-xl'>
                {item.code}
              </Text>
              <View className='w-full self-center' style={{ gap: 8 }}>
                <View className='flex-row justify-between items-center'>
                  <Text className='text-[#050402]/50 font-medium text-base'>
                    METER NO:
                  </Text>
                  <Text className='text-[#050402] font-medium text-base'>
                    {item.meterNumber}
                  </Text>
                </View>

                <View className='flex-row justify-between items-center'>
                  <Text className='text-[#050402]/50 font-medium text-base'>
                    AMOUNT:
                  </Text>
                  <Text className='text-[#050402] font-medium text-base'>
                    {formatMoney(Number(item.amount), "₦")}
                  </Text>
                </View>

                <View className='flex-row justify-between items-center'>
                  <Text className='text-[#050402]/50 font-medium text-base'>
                    FEE:
                  </Text>
                  <Text className='text-[#050402] font-medium text-base'>
                    {formatMoney(Number(200), "₦")}
                  </Text>
                </View>

                <View className='flex-row justify-between items-center'>
                  <Text className='text-[#050402]/50 font-medium text-base'>
                    TARIFF:
                  </Text>
                  <Text className='text-[#050402] font-medium text-base'>
                    {currentUser?.property?.tariff || 0}/kwh
                  </Text>
                </View>

                <View className='flex-row justify-between items-center'>
                  <Text className='text-[#050402]/50 font-medium text-base'>
                    UNITS:
                  </Text>
                  <Text className='text-[#050402] font-medium text-base'>
                    {item.units}
                  </Text>
                </View>

                <View className='flex-row justify-between items-center'>
                  <Text className='text-[#050402]/50 font-medium text-base'>
                    REFERENCE:
                  </Text>
                  <Text className='text-[#050402] font-medium text-base'>
                    {item.reference}
                  </Text>
                </View>

                <View className='flex-row justify-between items-center'>
                  <Text className='text-[#050402]/50 font-medium text-base'>
                    DATE:
                  </Text>
                  <Text className='text-[#050402] font-medium text-base'>
                    {timestampDisplay(item.createdAt).formattedDate}
                  </Text>
                </View>

                <View className='flex-row justify-between items-center'>
                  <Text className='text-[#050402]/50 font-medium text-base'>
                    TIME:
                  </Text>
                  <Text className='text-[#050402] font-medium text-base'>
                    {timestampDisplay(item.createdAt).formattedTime}
                  </Text>
                </View>

                <View className='flex-row justify-between items-center'>
                  <Text className='text-[#050402]/50 font-medium text-base'>
                    STATUS:
                  </Text>
                  <View
                    className={`py-2.5 px-3 rounded-full ${
                      item.status === "PENDING"
                        ? "bg-[#EFDCBA] text-[#4C3A1C]"
                        : item.status === "SUCCESS"
                        ? "bg-[#BAEFBC] text-[#264C1C]"
                        : "bg-[#FFC7C4] text-[#CF1919]"
                    }`}
                  >
                    <Text className='text-xs'>{item.status}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewBillModal;
