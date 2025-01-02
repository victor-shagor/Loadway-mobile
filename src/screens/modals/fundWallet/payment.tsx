import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { appColors } from "@src/constants/colors";
import axios from "@src/api/axiosClient";
import Pay from "./paystackWebView";
import useOnboardingContext from "@src/utils/Context";
import { useMutation } from "@tanstack/react-query";
import { ToastService } from "react-native-toastier";
import AppToast from "@src/components/common/AppToast";
import { timestampDisplay } from "@src/utils/helper";
import InSufficientBalance from "./InSufficientBalance";
import { payBills } from "@src/api/bills";
import { queryClient } from "@src/providers/get-query-client";
import Receipt from "./Receipt";

type FundWalletModalProps = {
  close: () => void;
  type?: "wallet" | "bill";
  isExternalDeficit?: boolean;
  externalDeficit?: number;
  bills?: Array<string>;
};

export const PaymentModal = ({
  close,
  type = "bill",
  isExternalDeficit,
  externalDeficit = 0,
  bills = [],
}: FundWalletModalProps) => {
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState("");
  const [authorizationUrl, setAuthorizationUrl] = useState<string | null>(null);

  const { currentUser } = useOnboardingContext();

  useEffect(() => {
    (async () => {
      await payBillMutation.mutateAsync();
    })();
  }, []);

  const payBillMutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      return await payBills({
        bills,
      });
    },
    mutationKey: ["bills"],
    onError: (error: any) => {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#ef4444",
        },
        children: (
          <AppToast
            message={error?.response?.data?.message || "An error occurred"}
            leftIcon='alert-circle'
            color='#fff'
          />
        ),
        right: <View></View>,
      });
      close();
    },
    onSuccess: async (data: any) => {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#FFF1C6",
        },
        children: (
          <AppToast
            message={data?.message || "Payment successful"}
            leftIcon='check-circle'
          />
        ),
        right: <View></View>,
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const initiateTransaction = async (amount: any) => {
    try {
      setLoading(true);
      const url = `/transaction/initialize`;
      const payload = { amount: Number(amount), email: currentUser?.email };
      const response = await axios.post(url, payload);
      const authUrl = response?.data?.data?.authorization_url;
      const reference = response?.data?.data?.reference;
      setRef(reference);
      if (authUrl) {
        setAuthorizationUrl(authUrl);
      } else {
        ToastService.show({
          position: "top",
          contentContainerStyle: {
            top: 70,
            borderRadius: 100,
            backgroundColor: "#ef4444",
          },
          children: (
            <AppToast
              message={"Failed to retrieve authorization URL."}
              leftIcon='alert-circle'
              color='#fff'
            />
          ),
          right: <View></View>,
        });
      }
    } catch (error: any) {
      ToastService.show({
        position: "top",
        contentContainerStyle: {
          top: 70,
          borderRadius: 100,
          backgroundColor: "#ef4444",
        },
        children: (
          <AppToast
            message={
              error?.message ||
              "An error occurred while processing your request"
            }
            leftIcon='alert-circle'
            color='#fff'
          />
        ),
        right: <View></View>,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddFunds = () => {
    initiateTransaction(externalDeficit);
  };

  if (authorizationUrl) {
    return (
      <Pay
        close={close}
        amount={externalDeficit}
        payStackKey='sk_live_a6115d0b2a1fac26e17d15627d6fb0358deba238'
        reference={ref}
        onSuccess={() => {
          if (type === "bill") {
            payBillMutation.mutate();
          } else {
            close();
          }
        }}
      />
    );
  }

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center h-48'>
        <ActivityIndicator size='large' color={appColors.orange} />
        <Text className='text-black text-xl font-medium pb-1.5 text-center'>
          Processing
        </Text>
      </View>
    );
  }

  if (isExternalDeficit) {
    return (
      <View className='py-10 px-[5vw]' style={{ gap: 20 }}>
        <InSufficientBalance
          deficit={externalDeficit}
          handleAddFunds={handleAddFunds}
          handleBuy={() => close()}
          isExternalDeficit={isExternalDeficit}
        />
      </View>
    );
  }

  return (
    <Receipt
      onClose={() => {
        queryClient.invalidateQueries({ queryKey: ["bills"] });
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        close();
      }}
      data={{
        amount: currentUser?.duesSum || 0,
        walletBalance: currentUser?.wallet.balance || 0,
        date: timestampDisplay(new Date()).formattedDate,
        time: timestampDisplay(new Date()).formattedTime,
        status: "success",
      }}
    />
  );
};

export default PaymentModal;
