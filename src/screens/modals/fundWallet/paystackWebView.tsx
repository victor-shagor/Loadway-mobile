import React from "react";
import { Paystack } from "react-native-paystack-webview";
import { View } from "react-native";
import axios from "@src/api/axiosClient";
import useOnboardingContext from "@src/utils/Context";
import { ToastService } from "react-native-toastier";
import AppToast from "@src/components/common/AppToast";

export default function Pay({
  amount,
  payStackKey,
  reference,
  close,
}: {
  amount: number;
  payStackKey: string;
  reference: string;
  close: () => void;
}) {
  const { setCurrentUser, currentUser } = useOnboardingContext();
  return (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey={"pk_live_9ee219c531785269cf13247493eb3b11c789b22a"} // Replace with your actual API key
        amount={Number(amount)} // Assuming Paystack expects amount in kobo/lowest currency unit
        billingEmail={currentUser?.email || ""}
        channels={["card", "bank", "ussd", "qr", "mobile_money"]}
        activityIndicatorColor='green'
        refNumber={reference}
        onCancel={async (error) => {
          console.log(error);
          close();
          ToastService.show({
            position: "top",
            contentContainerStyle: {
              top: 70,
              borderRadius: 100,
              backgroundColor: "#ef4444",
            },
            children: (
              <AppToast
                message={"Request cancelled"}
                leftIcon='alert-circle'
                color='#fff'
              />
            ),
            right: <View></View>,
          });
          try {
            const url = `/transaction/cancel/${reference}`;
            await axios.get(url);
          } catch (error) {
            console.log(error);
          }
        }}
        onSuccess={async (response) => {
          console.log(response);
          const url = `/transaction/verify/${response.data.transactionRef.reference}`;
          const res = await axios.get(url);
          if (res.data?.success) {
            setCurrentUser({
              ...currentUser,
              wallet: {
                balance: Number(currentUser?.wallet?.balance || 0) + amount,
              },
            });
            close();

            ToastService.show({
              position: "top",
              contentContainerStyle: {
                top: 70,
                borderRadius: 100,
                backgroundColor: "#FFF1C6",
              },
              children: (
                <AppToast
                  message={"Transaction successful"}
                  leftIcon='check-circle'
                />
              ),
              right: <View></View>,
            });
          }
        }}
        autoStart
      />
    </View>
  );
}
