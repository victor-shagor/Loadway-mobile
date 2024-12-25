import { View, Modal, Pressable } from "react-native";
import React, { ReactNode } from "react";

const AccessSent = ({
  modalVisible,
  closeModal,
  children,
}: {
  modalVisible: boolean;
  closeModal: () => void;
  children: ReactNode;
}) => {
  return (
    <View>
      <Modal visible={modalVisible} transparent animationType='slide'>
        <View className='bg-black/40 flex-1 h-screen justify-center items-center'>
          <Pressable
            onPressIn={closeModal}
            className='flex-1 absolute w-full h-full'
          ></Pressable>
          {children}
        </View>
      </Modal>
    </View>
  );
};

export default AccessSent;
