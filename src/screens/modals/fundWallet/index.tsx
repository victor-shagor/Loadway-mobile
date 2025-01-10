import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
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
import WebView from "react-native-webview";

type FundWalletModalProps = {
  close: () => void;
  type?: "wallet" | "bill";
  isExternalDeficit?: boolean;
  externalDeficit?: number;
  bills?: Array<string>;
  handlePay: (amount: number, ref: string) => void;
};

export const FundWalletModal = ({
  close,
  type = "wallet",
  handlePay
}: FundWalletModalProps) => {
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState("");
  const [authorizationUrl, setAuthorizationUrl] = useState<string | null>(null);

  const { currentUser, setCurrentUser } = useOnboardingContext();

  const handlePay = async (navState: any) => {
    console.log("nastate", navState);
    if (navState.url.includes("success")) {
      // Handle success
      close();
      setAuthorizationUrl(null);
      const url = `/transaction/verify/${ref}`;
      const res = await axios.get(url);
      if (res.data?.success) {
        setCurrentUser({
          ...currentUser,
          wallet: {
            balance:
              Number(currentUser?.wallet?.balance || 0) +
              Number(form?.getFieldValue("amount")),
          },
        });
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
              leftIcon="check-circle"
            />
          ),
          right: <View></View>,
        });
      }
    } else if (navState.url.includes("cancel")) {
      // Handle failure
      setAuthorizationUrl(null);
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
            message="Transaction failed. Please try again."
            leftIcon="alert-circle"
            color="#fff"
          />
        ),
      });
      try {
        const url = `/transaction/cancel/${ref}`;
        await axios.get(url);
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  console.log("authorizationUrl", authorizationUrl);
  console.log("ref", ref);

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
      mutation.mutate(data as any);
    },
  });

  if (authorizationUrl) {
    if(Platform.OS === "android") {
      handlePay(Number(form?.getFieldValue("amount")), ref);
      return
    }
    return (
      <Pay
       amount={Number(form?.getFieldValue("amount"))}
       setAuthorizationUrl={setAuthorizationUrl}
       authorizationUrl={authorizationUrl}
       close={close}
       reference={ref}
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

  return (
    <View className="py-10 px-[5vw]" style={{ gap: 20 }}>
      <View>
        <Text className="text-black text-xl font-medium pb-1.5 text-center">
          {type === "bill" ? "POWER TOPUP" : "FUND WALLET"}
        </Text>
        <form.Field
          name="amount"
          validators={{
            onChange: z.string().refine(
              (value) => {
                return /^\d+$/.test(value);
              },
              {
                message: "Please enter a valid amount",
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
                    <Text className="flex-1">350/KWH: 000</Text>
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
                  <Text className="text-white text-center text-lg">Fund</Text>
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
