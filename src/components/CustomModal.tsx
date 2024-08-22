import React, { ReactNode, useRef } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  Dimensions,
  View,
  StyleSheet,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { ThemedText } from "./ThemedText";
import { appColors } from "@src/constants/colors";

const screenHeight = Dimensions.get("window").height;

interface CustomModalProps {
  triggerItem: ReactNode;
  triggerItemStyle?: StyleProp<ViewStyle>;
  modalTitle?: string;
  modalContent: ReactNode;
}

const ModalButton = ({ ...rest }: TouchableOpacityProps) => {
  return <TouchableOpacity {...rest} />;
};

const CustomModal = ({
  triggerItem,
  triggerItemStyle,
  modalTitle,
  modalContent,
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
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          avoidKeyboardLikeIOS
          handlePosition="inside"
          HeaderComponent={
            <View style={styles.header}>
              <ThemedText style={styles.headerTitle}>{modalTitle}</ThemedText>
            </View>
          }
          overlayStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          {modalContent}
        </Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: appColors.white,
    borderBottomWidth: 1,
    borderBottomColor: appColors.gray,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 70,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});
export default CustomModal;
