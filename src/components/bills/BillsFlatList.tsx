import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useRef } from "react";
import { QuicklinkProps } from "@src/constants/data";
import { renderIcon } from "../common/renderIcon";
import { appColors } from "@src/constants/colors";
import CustomModal from "../CustomModal";
import BuyElectricity from "@src/screens/modals/electricity";
import { Modalize } from "react-native-modalize";

const Item = ({ item }: { item: QuicklinkProps }) => {
  return (
    <View className="">
      <View className="">
        <View
          className=" items-center px-4 flex-row gap-[8%]"
        >
          <View style={styles.iconContainer}>
            {renderIcon(item.icon, item.iconProvider, 24, appColors.orange)}
          </View>
          <View>
            <Text className=" text-[#191508] text-[18px] font-semibold text-center">
              {item.name}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const BillsFlatList = ({ data }: { data: QuicklinkProps[] }) => {
  const modalizeRef = useRef<Modalize>(null);
  return (
    <View className="mb-5 flex-row justify-center items-center">
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => {
          return (
            <CustomModal
              modalTitle="Buy Electricity"
              modalizeRef={modalizeRef}
              triggerItem={<Item item={item} />}
              triggerItemStyle={{ alignItems: "center", gap: 5 }}
              modalContent={
                <BuyElectricity close={() => modalizeRef.current?.close()} />
              }
            />
          );
        }}
        className="bg-white rounded-xl py-5 mx-4 mt-3 shadow-sm shadow-slate-700"
      />
    </View>
  );
};

export default BillsFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  quickLinksContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 80,
    borderColor: appColors.gray,
    borderRadius: 10,
    padding: 10,
    backgroundColor: appColors.white,
    flex: 1,
  },
  iconContainer: {
    backgroundColor: appColors.iconGray,
    height: 50,
    width: 50,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  recentChatsContainer: {
    gap: 12,
  },
});
