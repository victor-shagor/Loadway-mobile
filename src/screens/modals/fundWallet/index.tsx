import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";
import CustomButton from "@src/components/CustomButton";
import axios from "@src/api/axiosClient";
import Toast from "react-native-toast-message";
import Pay from "./paystackWebView";
import useOnboardingContext from "@src/utils/Context";

export const FundWalletModal = ({close}: {close: ()=> void}) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [ref, setRef] = useState("");
  const [authorizationUrl, setAuthorizationUrl] = useState<string | null>(null);
  const { currentUser } = useOnboardingContext();

  const clickBtn = async () => {
    try {
      setLoading(true);
      const url = `/transaction/initialize`;
      const payload = { amount: Number(amount), email: currentUser?.email };
      const response = await axios.post(url, payload);
      const authUrl = response?.data?.data?.authorization_url;
      const reference = response?.data?.data?.reference
      setRef(reference)
      if (authUrl) {
        setAuthorizationUrl(authUrl);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to retrieve authorization URL.",
        });
      }
    } catch (error: any) {

      console.log(error?.response?.data?.message);
      console.log(error?.response);
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while processing your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    // Remove any commas before updating the state
    const rawValue = value.replace(/,/g, '');

    // Only allow numeric values
    if (!isNaN(Number(rawValue))) {
      setAmount(rawValue);
    }
  };

  const formatAmount = (value: string) => {
    // Add commas to the number
    return value ? Number(value).toLocaleString('en-US') : '';
  };

  if (authorizationUrl) {
    return (
      <Pay
      close={close}
        amount={Number(amount)} 
        payStackKey="sk_live_a6115d0b2a1fac26e17d15627d6fb0358deba238"
        reference={ref}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
        <View style={{ gap: 10 }}>
        <ThemedText type="title" style={{ color: appColors.deepGray }}>
        Enter an Amount
      </ThemedText>
        <TextInput
          keyboardType="numeric"
          placeholder="Amount"
          placeholderTextColor={appColors.lightGray}
          inputMode="numeric"
          style={[styles.input]}
          spellCheck
          value={formatAmount(amount)}
          onChangeText={handleChange}
        />
        </View>
        <CustomButton 
          value={"Fund"}
          buttonStyle={styles.buttonStyle} 
          onPress={clickBtn}
          isLoading={loading}
          disable={(!amount|| Number(amount) < 100) ? true : false}
        />
      </View>
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
  buttonStyle:{
    marginVertical: 30
  }
});
export default FundWalletModal;
