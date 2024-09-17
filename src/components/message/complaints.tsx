import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  RefreshControl,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import { getAllComplaints } from "@src/api/complaints";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";
import {
  ComplaintProps,
  ComplaintRenderItemProps,
} from "@src/models/messaging";
import { ComplaintAPIProps } from "@src/models/messaging";
import { updateState } from "@src/utils/updateState";
import ComplaintModal from "@src/screens/modals/messages/complaints";
import CustomModal from "../CustomModal";
import EmptyMessage from "./emptyMessage";
import SearchInput from "./searchInput";
import images from "@src/constants/images";

export interface ComplaintStateProps {
  isLoading: boolean;
  data: ComplaintAPIProps | null;
}

const ComplaintRenderItem = ({
  complainProps,
  index,
  complaintsArray,
}: ComplaintRenderItemProps) => {
  return (
    <View style={styles.chatMessageContainer}>
      <Image
        source={{ uri: complainProps.user.profilePicture }}
        style={{ width: 50, height: 50 }}
      />

      <View
        style={[
          styles.chatMessage,
          {
            borderBottomWidth: index !== complaintsArray?.length - 1 ? 1 : 0,
            borderBottomColor: appColors.gray,
          },
        ]}
      >
        <View style={{ gap: 2, flex: 1 }}>
          <ThemedText type="title">{complainProps.title}</ThemedText>
          <View
            style={[
              styles.complaintStateStyle,
              {
                backgroundColor:
                  complainProps.status === "PENDING"
                    ? appColors.pendingBrown
                    : appColors.closedGreen,
              },
            ]}
          >
            <ThemedText
              type="title"
              style={{
                color:
                  complainProps.status === "PENDING"
                    ? appColors.brown
                    : appColors.green,
                fontSize: 11,
              }}
            >
              {complainProps.status}
            </ThemedText>
          </View>
        </View>

        <ThemedText type="small" style={{ color: appColors.deepGray }}>
          {/* {complainProps.time} */}
        </ThemedText>
      </View>
    </View>
  );
};

const Complaints = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [complaints, setComplaints] = useState<ComplaintStateProps>({
    isLoading: false,
    data: null,
  });
  const [filteredComplaints, setFilteredComplaints] = useState<
    ComplaintProps[]
  >([]);
  const modalizeRef = useRef<Modalize>(null);

  const handleCloseModal = () => {
    modalizeRef.current?.close();
  };

  const handleUpdateComplaints = (updates: Partial<ComplaintStateProps>) => {
    setComplaints((prev) => updateState(prev, updates));
  };

  const getComplaints = useCallback(async () => {
    handleUpdateComplaints({ isLoading: true });

    try {
      const response = await getAllComplaints();
      handleUpdateComplaints({ data: response });
      setFilteredComplaints(response.complaints as ComplaintProps[]);
    } catch (error) {
      console.log(error);
    } finally {
      handleUpdateComplaints({ isLoading: false });
    }
  }, []);

  const onRefreshComplaints = useCallback(async () => {
    setRefreshing(true);

    try {
      const response = await getAllComplaints();
      handleUpdateComplaints({ data: response });
      setFilteredComplaints(response.complaints as ComplaintProps[]);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    getComplaints();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <>
          <FlatList
            data={complaints.data?.complaints}
            renderItem={({ item, index }) => (
              <ComplaintRenderItem
                complainProps={item}
                index={index}
                complaintsArray={
                  complaints.data?.complaints as ComplaintProps[]
                }
              />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <>
                {complaints.isLoading ? (
                  <ActivityIndicator size={18} />
                ) : !complaints.isLoading &&
                  complaints.data?.complaints?.length! < 1 ? (
                  <EmptyMessage message={"You have made no complaints"} />
                ) : null}
              </>
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefreshComplaints()}
              />
            }
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <SearchInput
                searchArrayCopy={filteredComplaints as ComplaintProps[]}
                updateSearchedArray={handleUpdateComplaints}
              />
            }
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
            modalContent={
              <ComplaintModal handleCloseModal={handleCloseModal} />
            }
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
