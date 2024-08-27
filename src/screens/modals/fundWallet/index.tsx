import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";
import CustomButton from "@src/components/CustomButton";
import { BaseUrl } from "@src/utils/Base_url";
import axios from "axios";
import Toast from "react-native-toast-message";
import Pay from "./paystackWebView";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FundWalletModal = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("0");
  const [authorizationUrl, setAuthorizationUrl] = useState<string | null>(null);

  const data = AsyncStorage.getItem("accessToken")

  const clickBtn = async () => {
    try {
      setLoading(true);
      const url = `${BaseUrl}/transaction/initialize`;
      const payload = { amount: Number(amount), email: "tenant@gmail.com" };
      const response = await axios.post(url, payload);
      const authUrl = response.data?.data?.authorization_url;
      
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
      console.log("Error", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while processing your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authorizationUrl) {
    return (
      <Pay
        amount={Number(amount)} 
        email="tenant@gmail.com" 
        payStackKey="pk_test_bbfd7557d09d937608350e54c02212beeb7c0cfd"
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
          value={amount}
          onChangeText={(value)=>setAmount(value)}
        />
        </View>
        <CustomButton 
          value={"Fund"}
          buttonStyle={styles.buttonStyle} 
          onPress={clickBtn}
          isLoading={loading}
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
