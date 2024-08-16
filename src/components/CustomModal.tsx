import React, { ReactNode, useRef } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  Dimensions,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

const screenHeight = Dimensions.get("window").height;

interface CustomModalProps {
  triggerItem: ReactNode;
  triggerItemStyle?: StyleProp<ViewStyle>;
  modalContent: ReactNode;
}

const ModalButton = ({ ...rest }: TouchableOpacityProps) => {
  return <TouchableOpacity {...rest} />;
};

const CustomModal = ({
  modalContent,
  triggerItem,
  triggerItemStyle,
}: CustomModalProps) => {
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <ModalButton
        onPress={onOpen}
        children={triggerItem}
        style={triggerItemStyle}
      />

      <Portal>
        <Modalize ref={modalizeRef} modalHeight={screenHeight * 0.7}>
          {modalContent}
        </Modalize>
      </Portal>
    </>
  );
};

export default CustomModal;
