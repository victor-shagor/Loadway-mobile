import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";
import { UserComplaints } from "@src/constants/data";
import { ComplaintRenderItemProps } from "@src/models/chat";
import ComplaintModal from "@src/screens/modals/messages/complaints";
import CustomModal from "../CustomModal";
import EmptyMessage from "./emptyMessage";
import SearchInput from "./searchInput";
import { Modalize } from "react-native-modalize";

const ComplaintRenderItem = ({
  complainProps,
  index,
}: ComplaintRenderItemProps) => {
  return (
    <View style={styles.chatMessageContainer}>
      <Image source={complainProps.image} style={{ width: 50, height: 50 }} />

      <View
        style={[
          styles.chatMessage,
          {
            borderBottomWidth: index !== UserComplaints.length - 1 ? 1 : 0,
            borderBottomColor: appColors.gray,
          },
        ]}
      >
        <View style={{ gap: 2, flex: 1 }}>
          <ThemedText type="title">{complainProps.name}</ThemedText>
          <View
            style={[
              styles.complaintStateStyle,
              {
                backgroundColor:
                  complainProps.state === "PENDING"
                    ? appColors.pendingBrown
                    : appColors.closedGreen,
              },
            ]}
          >
            <ThemedText
              type="title"
              style={{
                color:
                  complainProps.state === "PENDING"
                    ? appColors.brown
                    : appColors.green,
                fontSize: 11,
              }}
            >
              {complainProps.state}
            </ThemedText>
          </View>
        </View>

        <ThemedText type="small" style={{ color: appColors.deepGray }}>
          {complainProps.time}
        </ThemedText>
      </View>
    </View>
  );
};

const Complaints = () => {

  const modalizeRef = useRef<Modalize>(null);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <>
          <FlatList
            data={UserComplaints}
            renderItem={({ item, index }) => (
              <ComplaintRenderItem complainProps={item} index={index} />
            )}
            keyExtractor={(item) => item.name}
            ListEmptyComponent={
              <EmptyMessage message={"You have made no complaints"} />
            }
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<SearchInput />}
            ListHeaderComponentStyle={{ flex: 1, marginBottom: 20 }}
          />

          <CustomModal
          modalizeRef={modalizeRef}
            triggerItem={
              <>
                <AntDesign name="plus" size={15} color={appColors.white} />
                <ThemedText style={{ color: appColors.white }}>
                  New Complaint
                </ThemedText>
              </>
            }
            triggerItemStyle={styles.modalTriggerStyle}
            modalTitle="Make Complaints"
            modalContent={<ComplaintModal />}
          />
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  chatMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 80,
    padding: 10,
    flex: 1,
    gap: 15,
  },
  chatMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    flex: 1,
    paddingBottom: 5,
  },
  messageCountContainer: {
    backgroundColor: appColors.orange,
    padding: 4,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTriggerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    flex: 1,
    position: "absolute",
    top: "70%",
    right: 0,
    borderRadius: 50,
    backgroundColor: appColors.orange,
    padding: 10,
  },
  complaintStateStyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    borderRadius: 8,
    maxWidth: "30%",
  },
});

export default Complaints;
