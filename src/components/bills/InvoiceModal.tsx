import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { ThemedText } from "../ThemedText";
import {
  TransactionCategory,
  transactionDataProps,
} from "@src/models/transactions";
import { appColors } from "@src/constants/colors";
import { convertDate } from "@src/utils/convertDate";

interface InvoiceContentContainerProps extends ViewProps {
  header: string;
  content: string;
}

const InvoiceContentContainer = ({
  header,
  content,
  ...rest
}: InvoiceContentContainerProps) => {
  return (
    <View style={{ flex: 1, gap: 2 }} {...rest}>
      <ThemedText type="small" style={{ color: appColors.gray }}>
        {header}
      </ThemedText>
      <ThemedText
        type="title"
        style={{ maxWidth: content.length > 20 ? "80%" : "100%" }}
      >
        {content}
      </ThemedText>
    </View>
  );
};

const ItemInvoiceModal = ({ item }: { item: transactionDataProps }) => {
  return (
    <View style={styles.itemInvoiceModalContainer}>
      <View style={{ gap: 20 }}>
        <View style={styles.contentContainer}>
          <InvoiceContentContainer
            header={"INVOICE NUMBER"}
            content={item.reference}
          />
          <InvoiceContentContainer
            style={{ flex: 0.5 }}
            header={"INVOICE DATE"}
            content={convertDate(item.createdAt)}
          />
        </View>

        <View style={styles.contentContainer}>
          <InvoiceContentContainer
            header={"NARRATION"}
            content={item.narration}
          />
          <InvoiceContentContainer
            style={{ flex: 0.5 }}
            header={"STATUS"}
            content={item.status}
          />
        </View>

        <View style={styles.contentContainer}>
          <InvoiceContentContainer
            header={"AMOUNT"}
            content={`N${item.amount.toLocaleString()}`}
          />
          <InvoiceContentContainer
            style={{ flex: 0.5 }}
            header={"TYPE"}
            content={item.type}
          />
        </View>

        {item.category.toLowerCase() ===
          TransactionCategory.ELECTRICITY.toLowerCase() && (
          <>
            <View style={styles.contentContainer}>
              <InvoiceContentContainer
                header={"UNIT COST"}
                content={`N${item.metadata.costOfUnit.toLocaleString()}`}
              />
              <InvoiceContentContainer
                style={{ flex: 0.5 }}
                header={"AMOUNT PAID"}
                content={item.metadata.paidamount.toLocaleString()}
              />
            </View>

            <View style={styles.contentContainer}>
              <InvoiceContentContainer
                header={"TOKEN"}
                content={item.metadata.token}
              />
              <InvoiceContentContainer
                style={{ flex: 0.5 }}
                header={"MERCHANT ID"}
                content={item.metadata.merchantId}
              />
            </View>

            <View style={styles.contentContainer}>
              <InvoiceContentContainer
                header={"UNIT"}
                content={item.metadata.unit.toString()}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemInvoiceModalContainer: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: appColors.gray,
  },
});

export default ItemInvoiceModal;
