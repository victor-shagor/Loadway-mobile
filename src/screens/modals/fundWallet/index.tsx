import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
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
import InSufficientBalance from "./InSufficientBalance";

type FundWalletModalProps = {
  close: () => void;
  type?: "wallet" | "bill";
  isExternalDeficit?: boolean;
  externalDeficit?: number;
};

export const FundWalletModal = ({
  close,
  type = "wallet",
  isExternalDeficit,
  externalDeficit = 0,
}: FundWalletModalProps) => {
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState("");
  const [authorizationUrl, setAuthorizationUrl] = useState<string | null>(null);
  const { currentUser } = useOnboardingContext();

  const [deficit, setDeficit] = useState<number>(0);
  const [isAddFunds, setIsAddFunds] = useState(false);

  const initiateTransaction = async (amount: any) => {
    try {
      setLoading(true);
      if (type === "bill" && !isAddFunds) {
        const netDeficit =
          Number(amount) - Number(currentUser?.wallet?.balance);
        setDeficit(netDeficit);
        if (netDeficit > 0) {
          setIsAddFunds(true);
          return;
        }
      }
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
            leftIcon='alert-circle'
            color='#fff'
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

  const handleAddFunds = () => {
    initiateTransaction(isExternalDeficit ? externalDeficit : deficit);
  };

  if (authorizationUrl) {
    return (
      <Pay
        close={close}
        amount={
          isAddFunds
            ? isExternalDeficit
              ? externalDeficit
              : deficit
            : Number(form?.getFieldValue("amount"))
        }
        payStackKey='sk_live_a6115d0b2a1fac26e17d15627d6fb0358deba238'
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

  if (deficit > 0 || isExternalDeficit) {
    return (
      <View className='py-10 px-[5vw]' style={{ gap: 20 }}>
        <InSufficientBalance
          deficit={isExternalDeficit ? externalDeficit : deficit}
          handleAddFunds={handleAddFunds}
          handleBuy={() => {}}
          isExternalDeficit={isExternalDeficit}
        />
      </View>
    );
  }

  return (
    <View className='py-10 px-[5vw]' style={{ gap: 20 }}>
      <View>
        <Text className='text-black text-2xl font-medium pb-1.5 text-center'>
          {type === "bill" ? "POWER TOPUP" : "FUND WALLET"}
        </Text>
        <form.Field
          name='amount'
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
            <View className='mb-5'>
              <Text className='text-[#050402] text-xs font-medium pb-1'>
                AMOUNT
              </Text>
              <View className='bg-[#F1F1F1] rounded-lg h-14 items-center focus:border-[#FF3535CC] focus:border px-4 box-border flex-row'>
                <Text className='text-[#050402] text-sm mr-1 mt-1 font-medium pb-1'>
                  ₦
                </Text>
                <TextInput
                  placeholder='0.00'
                  value={field.state.value}
                  onChangeText={field.handleChange}
                  keyboardType='number-pad'
                  className='flex-1'
                />
              </View>
              <View>
                {field.state.meta.errors[0] && (
                  <Text className='text-red-500 text-xs absolute top-2'>
                    {
                      field.state.meta.errors[0]
                        .toString()
                        .split(",")[0] as string
                    }
                  </Text>
                )}
              </View>
              {type === "bill" && (
                <View className='flex-row mt-2 justify-end'>
                  {!field.state.meta.errors[0] && (
                    <Text className='flex-1'>350/KWH: 000</Text>
                  )}
                  <View className='flex-row shrink-0'>
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
                    size='small'
                    color='#fff'
                    style={{ marginRight: 8 }}
                  />
                ) : (
                  <Text className='text-white text-center text-lg'>
                    Make payment
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.modalBackground,
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 20,
  },
  input: {
    padding: 10,
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: appColors.gray,
    borderRadius: 6,
    height: 48,
  },
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  buttonStyle: {
    marginVertical: 30,
  },
});
export default FundWalletModal;
