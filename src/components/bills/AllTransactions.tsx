import React, { useRef } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Modalize } from "react-native-modalize";
import { renderIcon } from "../common/renderIcon";
import { appColors } from "@src/constants/colors";
import { formatNarration } from "@src/utils/helper";
import CustomModal from "../CustomModal";
import { transactionDataProps } from "@src/models/transactions";
import ItemInvoiceModal from "./InvoiceModal";

const Item = ({ item }: { item: transactionDataProps }) => {
  const modalizeRef = useRef<Modalize>(null);

  const color =
    item.type === "DEBIT"
      ? appColors.orange
      : item.type === "CREDIT"
      ? appColors.green
      : appColors.green;

  const icon =
    item.type === "DEBIT"
      ? "arrowup"
      : item.type === "CREDIT"
      ? "arrowdown"
      : "arrowdown";

  const dateString = item.updatedAt;
  const date = new Date(dateString);

  // ISO String representation (already formatted)
  const isoString = date.toISOString(); // 2024-08-28T11:06:01.143Z

  // Custom formatted date and time
  const formattedDate = date.toISOString().split("T")[0];
  const formattedTime = date.toISOString().split("T")[1].split(".")[0];
  const NewDate = `${formattedDate}, ${formattedTime}`;

  return (
    <CustomModal
      modalizeRef={modalizeRef}
      triggerItem={
        <View className=" flex-row justify-between py-5 gap-4">
          <View
            className="flex-[0.1] items-center justify-center rotate-45 p-3 rounded-2xl"
            style={{ backgroundColor: "rgba( 212, 212, 212, 0.16)" }}
          >
            {renderIcon(icon, "AntDesign", 24, color)}
          </View>

          <View className="flex-[0.7]">
            <Text className=" text-[#191508] text-[16px] text-left font-semibold pb-1">
              {formatNarration(item.narration)}
            </Text>
            <Text className=" text-[#66635A] text-[12px] font-medium">
              {item.reference?.substring(0, 5) || ""}
            </Text>
            <Text
              className=" text-[#66635A] text-[10px] font-medium 
                leading-4 tracking-widest
               "
            >
              {NewDate}
            </Text>
          </View>

          <View className="flex-[0.2]">
            <Text className="" style={{ color }}>
              &#8358;{item.amount.toLocaleString("en-US")}
            </Text>
          </View>
        </View>
      }
      modalTitle="Invoice Details"
      modalContent={<ItemInvoiceModal item={item} />}
    />
  );
};

const AllTransactions = ({ data }: { data: transactionDataProps[] }) => {
  return (
    <ScrollView style={{ marginBottom: 100 }}>
      <View className="p-4 bg-white rounded-xl">
        {data.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 0.1,
    borderColor: "rgba(165, 162, 156, 0.5)",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemInvoiceModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 100,
    padding: 20,
  },
});

export default AllTransactions;
