import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useCallback, useRef, useMemo } from "react";
import BottomSheet, { BottomSheetView, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import useOnboardingContext from "@src/utils/Context";
import PayAllBillCTAComponent from "./PayAllBillCTAComponent";

const PayBillModal = () => {
  // context

  const { setPayBillModal } = useOnboardingContext();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      console.log("handleSheetChanges", index);
      setPayBillModal(false);
    }
  }, []);

  // snapshot

  const snapshot = useMemo(() => ["85%"], []);

  // handleClosePress
  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <View
      className="h-screen"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={snapshot}
          enablePanDownToClose={true}
          // backgroundStyle={{ backgroundColor: '#f8ff'}}
        >
          <BottomSheetView
            style={styles.contentContainer}
          >
            <View className=" w-screen pb-2">
              <Text
                className="text-[#151107] font-semibold text-[18px] 
             text-center"
              >
                Pay All 🎉
              </Text>
            </View>
            <View className="bg-black h-[0.6%] mt-1 w-screen opacity-[0.1]"></View>
            <BottomSheetScrollView className="">
              <PayAllBillCTAComponent />
            </BottomSheetScrollView>
          </BottomSheetView>
        </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default PayBillModal;
