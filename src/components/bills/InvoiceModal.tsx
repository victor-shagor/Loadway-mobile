import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  ViewProps,
  TouchableOpacity,
  Share,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons/";
import ViewShot from "react-native-view-shot";
import { ThemedText } from "../ThemedText";
import {
  TransactionCategory,
  transactionDataProps,
} from "@src/models/transactions";
import { appColors } from "@src/constants/colors";
import { convertDate } from "@src/utils/convertDate";
import { ToastNotification } from "@src/utils/toastMessage";

export interface InvoiceContentContainerProps extends ViewProps {
  header: string;
  content: string;
}

export const InvoiceContentContainer = ({
  header,
  content,
  ...rest
}: InvoiceContentContainerProps) => {
  return (
    <View style={{ flex: 1, gap: 2 }} {...rest}>
      <ThemedText type="small" style={{ color: appColors.deepGray }}>
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
  const receiptRef = useRef() as React.MutableRefObject<ViewShot>;

  const handleShareReceipt = async (receiptName: string) => {
    try {
      const uri = await receiptRef?.current.capture?.();

      const shareOptions = {
        title: "Receipt",
        message: `Receipt for ${receiptName}`,
        subject: Platform.OS === "ios" ? `Receipt for ${receiptName}` : "",
        url: uri,
        type: "image/png",
      };

      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log("Shared with activity type of", result.activityType);
          ToastNotification(
            "success",
            `${receiptName} receipt shared successfully`
          );
        } else {
          // console.log("Shared");
          ToastNotification(
            "success",
            `${receiptName} receipt shared successfully`
          );
        }
      } else if (result.action === Share.dismissedAction) {
        ToastNotification("error", "Share dismissed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View style={styles.itemInvoiceModalContainer}>
        <ViewShot
          ref={receiptRef}
          options={{ format: "png", quality: 0.9 }}
          style={{ backgroundColor: "white" }}
        >
          <View style={{ gap: 20, padding: 10 }}>
            {item.category.toLowerCase() ===
              TransactionCategory.ELECTRICITY.toLowerCase() && (
              <>
                <View style={styles.contentContainer}>
                  <InvoiceContentContainer
                    header={"TOKEN"}
                    content={item.metadata.token}
                  />
                </View>

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
                    header={"UNIT"}
                    content={item.metadata.unit.toString()}
                  />
                  <InvoiceContentContainer
                    style={{ flex: 0.5 }}
                    header={"MERCHANT ID"}
                    content={item.metadata.merchantId}
                  />
                </View>
              </>
            )}

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
          </View>
        </ViewShot>

        <View style={{ padding: 10 }}>
          <TouchableOpacity
            style={styles.shareBTN}
            onPress={() => handleShareReceipt(item.narration)}
          >
            <ThemedText
              type="title"
              style={{
                flex: 1,
                alignSelf: "center",
                color: appColors.deepGray,
              }}
            >
              Share Receipt
            </ThemedText>

            <View style={styles.shareBTNIcon}>
              <AntDesign name="sharealt" size={24} color={appColors.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemInvoiceModalContainer: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: appColors.gray,
  },
  shareBTN: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 8,
    height: 58,
    borderRadius: 10,
    width: "100%",
    backgroundColor: appColors.gray,
  },
  shareBTNIcon: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.15,
    borderRadius: 10,
    backgroundColor: appColors.orange,
    padding: 2,
  },
});

export default ItemInvoiceModal;
