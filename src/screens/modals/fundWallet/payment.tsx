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
import { getCurrentUser } from "@src/api/user";
import { useNavigation } from "@react-navigation/native";

type FundWalletModalProps = {
  close: () => void;
  type?: "wallet" | "bill";
  isExternalDeficit?: boolean;
  externalDeficit?: number;
  bills?: Array<string>;
  amount?: number;
  totalDue?: number;
  refeshData?: () => void;
};

export const PaymentModal = ({
  close,
  type = "bill",
  isExternalDeficit,
  externalDeficit = 0,
  bills = [],
  amount,
  totalDue,
  refeshData,
}: FundWalletModalProps) => {
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState("");
  const [authorizationUrl, setAuthorizationUrl] = useState<string | null>(null);
  const navigation = useNavigation();

  const { currentUser, setCurrentUser } = useOnboardingContext();

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
            leftIcon="alert-circle"
            color="#fff"
          />
        ),
        right: <View></View>,
      });
      close();
    },
    onSuccess: async (data: any) => {
      const user = await getCurrentUser();
      setCurrentUser(user);
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
            leftIcon="check-circle"
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
              leftIcon="alert-circle"
              color="#fff"
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
            leftIcon="alert-circle"
            color="#fff"
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

  const handleSuccess = async () => {
    if (type === "bill") {
      payBillMutation.mutate();
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    } else {
      close();
    }
  };
  if (authorizationUrl) {
    return navigation.navigate("WebView", {
      amount: Number(form?.getFieldValue("amount")),
      reference: ref,
      authorizationUrl,
      setAuthorizationUrl,
      close,
      onSuccess: type === "bill" ? handleSuccess : undefined,
    });
    // <Pay
    //   authorizationUrl={authorizationUrl}
    //   setAuthorizationUrl={setAuthorizationUrl}
    //   close={close}
    //   amount={externalDeficit}
    //   reference={ref}
    //   onSuccess={() => {
    //     if (type === "bill") {
    //       payBillMutation.mutate();
    //       queryClient.invalidateQueries({ queryKey: ["transactions"] });
    //       queryClient.invalidateQueries({ queryKey: ["bills"] });
    //     } else {
    //       close();
    //     }
    //   }}
    // />
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center h-48">
        <ActivityIndicator size="large" color={appColors.orange} />
        <Text className="text-black text-xl font-medium pb-1.5 text-center">
          Processing
        </Text>
      </View>
    );
  }

  if (isExternalDeficit) {
    return (
      <View className="py-10 px-[5vw]" style={{ gap: 20 }}>
        <InSufficientBalance
          amount={amount}
          deficit={externalDeficit}
          handleAddFunds={handleAddFunds}
          handleBuy={() => close()}
          isExternalDeficit={isExternalDeficit}
          totalDue={totalDue}
          refeshData={refeshData}
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
        amount: totalDue || 0,
        walletBalance: currentUser?.wallet.balance || 0,
        date: timestampDisplay(new Date()).formattedDate,
        time: timestampDisplay(new Date()).formattedTime,
        status: "success",
      }}
    />
  );
};

export default PaymentModal;
