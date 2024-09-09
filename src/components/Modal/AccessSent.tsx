import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import images from "@src/constants/images";
import { renderIcon } from "../common/renderIcon";
import { appColors } from "@src/constants/colors";
import { useNavigation } from "@react-navigation/native";

const AccessSent = ({
  modalVisible,
  setModalVisible,
  access,
  handleAddToFrequent,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  access: any;
  handleAddToFrequent: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const {navigate} = useNavigation();

  const navigateToRequests = () => {
    navigate("GateAccess");
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      await handleAddToFrequent();
      setModalVisible(false);
      navigateToRequests();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}>
          <View className=" flex-1 flex-row h-screen justify-center items-center">
            <View className=" bg-[#FFFFFF] rounded-2xl w-[85vw]">
              <View
                className="flex-row justify-center items-center border-b-2
               border-[#0000001f] w-[100%] relative
              "
              >
                <Text
                  className="text-[#151107] text-[18px] font-semibold py-3
                 "
                >
                  Access sent
                </Text>
                <TouchableOpacity
                  className=" absolute right-[5]"
                  onPress={() => {
                    setModalVisible(false);
                    navigateToRequests();
                  }}
                >
                  {renderIcon(
                    "close",
                    "MaterialCommunityIcons",
                    28,
                    appColors.black
                  )}
                </TouchableOpacity>
              </View>
              <View
                className=" flex-row items-center justify-center
                mt-[3vh]
                "
              >
                <View
                  className="w-[50vw] bg-[#D9D9D947] border-2 border-[#0000004D]
                 rounded-lg
                 "
                >
                  <View className=" flex-row justify-center items-center mt-3">
                    <Image
                      source={images.newRequest.avatar}
                      className=" w-[26vw] h-[12vh]"
                    />
                  </View>
                  <Text className="text-[#191508] text-[16px] font-semibold text-center mt-2">
                    {access?.firstName} {access?.lastName}
                  </Text>
                  <Text className="text-[#66635A] text-[15px] font-medium text-center my-2">
                    {access?.phoneNumber}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                className="bg-[#F6411B] mx-3 py-4 rounded-lg mb-[10%] mt-[20%]"
                disabled={loading}
                onPress={onSubmit}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-white text-center font-semibold">
                    Add to frequent list
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AccessSent;
