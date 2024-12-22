import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";
import CustomButton from "@src/components/CustomButton";
import axiosInstance from "@src/api/axiosClient";
import Toast from "react-native-toast-message";
import { Image } from "react-native";
import images from "@src/constants/images";
import { useNavigation } from "@react-navigation/native";

const BuyElectricity = ({ close }: any) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const handleChange = (value: string) => {
    // Remove any commas before updating the state
    const rawValue = value.replace(/,/g, "");

    // Only allow numeric values
    if (!isNaN(Number(rawValue))) {
      setAmount(rawValue);
    }
  };

  const formatAmount = (value: string) => {
    // Add commas to the number
    return value ? Number(value).toLocaleString("en-US") : "";
  };
  const navigation =
    useNavigation<any>();

  const onPressBtn = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/user/electricity/buy", { amount: Number(amount) });
      setModalVisible(true);
      setLoading(false);
    } catch (error: any) {
      console.log(error?.response?.data?.message);

      setStep(1);
      close();
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "An error occurred while processing your requests.",
      });
    }
  };

  const onNavigate = () => {
    close();
    setModalVisible(false);
    navigation.navigate("PaymentHistory")
  }

  return (
    <>
    {step === 1 && (
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
          value={"Buy"}
          buttonStyle={styles.buttonStyle}
          onPress={() => setStep(2)}
          isLoading={loading}
          disable={!amount || Number(amount) < 100 ? true : false}
        />
      </View>
    </View>
    )}
    {step === 2 && (
      <View style={{height: 200, paddingHorizontal: 20, paddingVertical: 25, gap: 10, justifyContent:'space-between', marginBottom: 10}}>
        <Text>Are you sure you want to buy electricity of ₦{formatAmount(amount)}?</Text>
          <CustomButton value="Yes, continue" onPress={onPressBtn} isLoading={loading} disable={loading}/>
          <CustomButton bgColor="#F6411B1A" textColor={appColors.orange} value="No, go back" onPress={() => setStep(1)} />
      </View>
    )}
      <SuccessModal modalVisible={modalVisible} onPressBtn={onNavigate}/>
    </>
  );
};

const SuccessModal = ({ modalVisible, onPressBtn }: any) => {


  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalCenteredView}>
        <View style={styles.modalTextContentContainer}>
          <Image source={images.alert.checkmark}/>
          <ThemedText
            style={{ color: "white", textAlign: "center" }}
            type="title"
          >
            Transaction Successful
          </ThemedText>
          <View>
          <ThemedText style={{ color: "white", textAlign: "center" }}>
            Your transaction is complete.
          </ThemedText>
          <ThemedText style={{ color: "white", textAlign: "center" }}>
            Please check the transaction history
            page for your Electricity Token Pin
          </ThemedText>
          </View>
          <CustomButton
            value={"Procceed To History"}
            buttonStyle={{  width: '100%' }}
            onPress={onPressBtn}
            bgColor="white"
            textColor={appColors.orange}
          />
        </View>
      </View>
    </Modal>
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
  buttonStyle: {
    marginVertical: 30,
  },
  modalCenteredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    backgroundColor: "#F6411B",
    paddingHorizontal: 20,
    width: "100%"
  },
  modalContentContainer: {
    width: "100%",
    height: "100%",
    maxWidth: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalBackgroundImage: {
    alignItems: "flex-end",
    flex: 0.6,
    padding: 10,
    paddingBottom: 5,
  },

  modalTextContentContainer: {
    alignItems: "center",
    justifyContent: "center",
    // flex: 1,
    gap: 25,
    padding: 10,
    width: "100%",
  },
});
export default BuyElectricity;
