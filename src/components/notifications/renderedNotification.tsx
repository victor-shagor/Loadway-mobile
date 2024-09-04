import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Modal,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { GeneralNotificationsProps } from "@src/screens/notifications/data";
import { appColors } from "@src/constants/colors";
import { renderIcon } from "../common/renderIcon";
import { IconProvider, IconTypes } from "@src/constants/data";

export const Divider = () => {
  return <View style={styles.divider} />;
};
export const WineDot = () => {
  return <View style={styles.dot} />;
};

export const RenderedGeneralNotification = ({
  item,
}: {
  item: GeneralNotificationsProps;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Image source={item.userImage} style={{ width: 35, height: 35 }} />
        <View style={{ gap: 4 }}>
          <ThemedText type="default">
            <ThemedText type="title">{item.name}</ThemedText> sent you a chat
          </ThemedText>
          <ThemedText>{item.time}</ThemedText>
        </View>
      </View>

      <WineDot />
    </View>
  );
};

export const RenderedMaintainanceNotification = ({
  item,
}: {
  item: GeneralNotificationsProps;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.iconContainer}>
          {renderIcon(
            item.icon as IconTypes,
            item.iconProvider as IconProvider,
            18,
            appColors.deepWine
          )}
        </View>
        <View style={{ gap: 4, flex: 0.8 }}>
          <ThemedText type="default" ellipsizeMode="tail" numberOfLines={1}>
            {item.title}
          </ThemedText>
          <ThemedText>{item.time}</ThemedText>
        </View>
      </View>

      <WineDot />
    </View>
  );
};

export const RenderedAlertNotification = ({
  item,
}: {
  item: GeneralNotificationsProps;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { height } = useWindowDimensions();

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.container, { marginVertical: 15 }]}
      >
        <View style={{ gap: 4, flex: 0.8 }}>
          <ThemedText type="title">{item.name}</ThemedText>
          <ThemedText ellipsizeMode="tail" numberOfLines={1}>
            {item.title}
          </ThemedText>
          <ThemedText>{item.time}</ThemedText>
        </View>

        <WineDot />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalCenteredView}>
          <View
            style={[styles.modalContentContainer, { maxHeight: height * 0.4 }]}
          >
            <ImageBackground
              source={item.modalImage}
              resizeMode="cover"
              imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              style={styles.modalBackgroundImage}
            >
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="close" size={24} color={appColors.black} />
              </TouchableOpacity>
            </ImageBackground>

            <View style={styles.modalTextContentContainer}>
              <ThemedText type="title">{item.name}</ThemedText>
              <ThemedText>{item.title}</ThemedText>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    flex: 0.7,
    height: 2,
    backgroundColor: appColors.gray,
  },
  dot: {
    width: 7,
    height: 7,
    backgroundColor: appColors.deepWine,
    borderRadius: 50,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    minHeight: 70,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    backgroundColor: appColors.gray,
    borderRadius: 100,
  },

  modalCenteredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  modalContentContainer: {
    width: "100%",
    height: "100%",
    maxWidth: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalBackgroundImage: {
    alignItems: "flex-end",
    flex: 0.6,
    padding: 10,
  },

  modalTextContentContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 0.4,
    gap: 10,
    padding: 10,
  },
});
