import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { appColors } from "@src/constants/colors";
import axios from "@src/api/axiosClient";
import Pay from "./paystackWebView";
import useOnboardingContext from "@src/utils/Context";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useMutation } from "@tanstack/react-query";
import { ToastService } from "react-native-toastier";
import AppToast from "@src/components/common/AppToast";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { formatMoney } from "@src/utils/helper";
import { buyElectricity } from "@src/api/bills";
import InSufficientBalance from "./InSufficientBalance";
import { queryClient } from "@src/providers/get-query-client";
import { getCurrentUser } from "@src/api/user";
import { useNavigation } from "@react-navigation/native";

type FundWalletModalProps = {
  close: () => void;
  type?: "wallet" | "bill";
  isExternalDeficit?: boolean;
  externalDeficit?: number;
  bills?: Array<string>;
};

export const FundWalletModal = ({
  close,
  type = "wallet",
}: FundWalletModalProps) => {
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState("");
  const [authorizationUrl, setAuthorizationUrl] = useState<string | null>(null);
  const [isInsufficientBalance, setIsInsufficientBalance] = useState(false);

  const navigation = useNavigation();

  const { currentUser, setCurrentUser } = useOnboardingContext();

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

  const mutation = useMutation({
    mutationFn: async (value: any) => {
      return await initiateTransaction(value.amount);
    },
    mutationKey: ["signIn"],
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
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleBuyElectricity = (value: any) => {
    if (Number(value) > Number(currentUser?.wallet?.balance || 0)) {
      setIsInsufficientBalance(true);
      setLoading(false);
    } else {
      buyElectricityMutation.mutate({
        amount: value,
      });
    }
  };

  const buyElectricityMutation = useMutation({
    mutationFn: (value: any) => {
      return buyElectricity({
        amount: Number(value.amount),
        propertyId: currentUser?.property?.id || "",
        userId: currentUser?.id || "",
      });
    },
    mutationKey: ["buyElectricity"],
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
            leftIcon="check-circle"
          />
        ),
        right: <View></View>,
      });
      queryClient.invalidateQueries({ queryKey: ["bills"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["electricityHistory"] });
      const user = await getCurrentUser();
      setCurrentUser(user);
    },
    onSettled: () => {
      setLoading(false);
      close();
    },
  });

  const form = useForm({
    defaultValues: {
      amount: "",
    },
    validatorAdapter: zodValidator(),

    onSubmit: async ({ value }) => {
      setLoading(true);
      const data = {
        amount: value.amount,
      };
      if (type === "bill") {
        handleBuyElectricity(data.amount);
      } else {
        mutation.mutate(data as any);
      }
    },
  });

  const handleSuccess = () => {
    buyElectricityMutation.mutate({
      amount: Number(form?.getFieldValue("amount")),
    });
  };

  if (authorizationUrl) {
    navigation.navigate("WebView", {
      amount: Number(form?.getFieldValue("amount")),
      reference: ref,
      authorizationUrl,
      setAuthorizationUrl,
      close,
      onSuccess: type === "bill" ? handleSuccess : undefined,
    });
    // return (
    //   <Pay
    //     amount={Number(form?.getFieldValue("amount")) }
    //     setAuthorizationUrl={setAuthorizationUrl}
    //     authorizationUrl={authorizationUrl}
    //     close={close}
    //     reference={ref}
    //     onSuccess={type === 'bill' ? handleSuccess: undefined}
    //   />
    // );
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

  const handleAddFunds = () => {
    initiateTransaction(
      Number(form?.getFieldValue("amount")) -
        Number(currentUser?.wallet?.balance || 0)
    );
  };

  const handleBuy = () => {
    buyElectricityMutation.mutate({
      amount: Number(currentUser?.wallet?.balance || 0),
    });
  };

  if (isInsufficientBalance) {
    return (
      <View className="py-10 px-[5vw]" style={{ gap: 20 }}>
        <InSufficientBalance
          amount={Math.max(Number(currentUser?.wallet?.balance || 0), 0)}
          deficit={
            Number(form?.getFieldValue("amount")) -
            Number(currentUser?.wallet?.balance || 0)
          }
          handleAddFunds={handleAddFunds}
          handleBuy={handleBuy}
          totalDue={Number(form?.getFieldValue("amount"))}
          type={type}
        />
      </View>
    );
  }

  return (
    <View className="py-10 px-[5vw]" style={{ gap: 20 }}>
      <View>
        <Text className="text-black text-xl font-medium pb-1.5 text-center">
          {type === "bill" ? "POWER TOPUP" : "FUND WALLET"}
        </Text>
        <form.Field
          name="amount"
          validators={{
            onChange: z
              .string()
              .refine(
                (value) => {
                  return /^\d+$/.test(value);
                },
                {
                  message: "Please enter a valid amount",
                }
              )
              .refine(
                (value) => {
                  if (type === "bill") {
                    return Number(value) > 200;
                  }
                  return true;
                },
                {
                  message: "Please enter an amount greater than 200",
                }
              ),
          }}
          children={(field) => (
            <View className="mb-5">
              <Text className="text-[#050402] text-xs font-medium pb-1">
                AMOUNT
              </Text>
              <View className="bg-[#F1F1F1] rounded-lg h-14 items-center focus:border-[#FF3535CC] focus:border px-4 box-border flex-row">
                <Text className="text-[#050402] text-sm mr-1 mt-1 font-medium pb-1">
                  ₦
                </Text>
                <TextInput
                  placeholder="0.00"
                  value={field.state.value}
                  onChangeText={field.handleChange}
                  keyboardType="number-pad"
                  className="flex-1"
                />
              </View>
              <View>
                {field.state.meta.errors[0] && (
                  <Text className="text-red-500 text-xs absolute top-2">
                    {
                      field.state.meta.errors[0]
                        .toString()
                        .split(",")[0] as string
                    }
                  </Text>
                )}
              </View>
              {type === "bill" && (
                <View className="flex-row mt-2 justify-end">
                  {!field.state.meta.errors[0] && (
                    <Text className="flex-1">
                      {formatMoney(
                        Number(currentUser?.property?.tariff || 0),
                        "₦"
                      )}
                      /KWH: 000
                    </Text>
                  )}
                  <View className="flex-row shrink-0">
                    <Text>BALANCE: </Text>
                    <Text>
                      {formatMoney(
                        Number(currentUser?.wallet?.balance || 0),
                        "₦"
                      )}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      </View>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Pressable
            disabled={!canSubmit || loading}
            onPress={form.handleSubmit}
          >
            {({ pressed }) => (
              <View
                className={`${
                  canSubmit
                    ? pressed
                      ? "bg-[#E8563780]"
                      : "bg-[#E85637]"
                    : "bg-[#E8563740]"
                } h-16 rounded-full justify-center items-center`}
              >
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color="#fff"
                    style={{ marginRight: 8 }}
                  />
                ) : (
                  <Text className="text-white text-center text-lg">
                    {type === "bill" ? "Make Payment" : "Fund Wallet"}
                  </Text>
                )}
              </View>
            )}
          </Pressable>
        )}
      />
    </View>
  );
};

export default FundWalletModal;
