import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { HousingBillsProps } from "./HousingBills";
import { getAccessToken } from "@src/utils/RetrieveAccessToken";
import { getUserDueBills, payUserBills, createHeaders } from "@src/utils/APIRoutes";
import { formatCamelCaseToTitleCase } from "@src/utils/helper";
import { BaseUrl } from "@src/utils/Base_url";
import useOnboardingContext from "@src/utils/Context";
import Toast from "react-native-toast-message";
import { getBills, payBills } from "@src/api/bills";
import { getCurrentUser } from "@src/api/user";

const BillItem = ({ data, isSelected, onPress }: {
  data: HousingBillsProps;
  isSelected: boolean;
  onPress: () => void;
}) => {
  const { billName, amountDue } = data;

  return (
    <TouchableOpacity onPress={onPress} key={data.id}>
      <View className="flex-row justify-between mb-5">
        <View className="flex-row">
          <View
            className={`w-4 h-4 mt-1 rounded-full border-2 ${isSelected ? "border-red-600 bg-red-600" : "border-gray-300"}`}
          />
          <Text className="text-gray-900 font-semibold text-16 pl-5">
            {formatCamelCaseToTitleCase(billName)}
          </Text>
        </View>
        <View>
          <Text className="text-gray-900 font-semibold text-16">
            ₦{amountDue.toLocaleString("en-US")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PayAllBillCTAComponent = ({ close }: { close: () => void }) => {

  const { bills: housingBillsData, setBills, setCurrentUser } = useOnboardingContext();

  const [selectedBillIds, setSelectedBillIds] = useState<string[]>([]);

  const toggleBillSelection = (id: string) => {
    setSelectedBillIds((prev) =>
      prev.includes(id) ? prev.filter((billId) => billId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedBillIds.length === housingBillsData.length) {
      setSelectedBillIds([]);
    } else {
      setSelectedBillIds(housingBillsData.map((bill) => bill.id));
    }
  };

  const handlePayBills = async () => {
    if (selectedBillIds.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select at least one bill to pay.",
      });
      return;
    }
    try {
      const status = await payBills({
        bills: selectedBillIds
      })
      if (status === 201) {
        const newBills = await getBills()
        setBills(newBills)
        const user = await getCurrentUser()
        setCurrentUser(user)
        close();
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Bill Paid Successfully",
        });
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'An error occurred. Please try again.'
      Alert.alert(msg);
    }
  };

  return (
    <ScrollView>
      <View className="w-screen px-5 py-5 mb-10">
        <View className="mb-5">
          <Pressable className="flex-row" onPress={toggleSelectAll}>
            <View
              className={`w-4 h-4 mt-1 rounded-full border-2 ${selectedBillIds.length === housingBillsData.length ? "border-red-600 bg-red-600" : "border-gray-300"}`}
            />
            <Text className="text-gray-900 font-semibold text-16 pl-5">
              Select All
            </Text>
          </Pressable>
        </View>
        {housingBillsData?.map((bill) => (
          <BillItem
            key={bill.id}
            data={bill}
            isSelected={selectedBillIds.includes(bill.id)}
            onPress={() => toggleBillSelection(bill.id)}
          />
        ))}
        <View className={`fixed top-5 w-full mx-1 ${housingBillsData?.length?`bg-red-500`:`bg-gray-200`} rounded-xl`}>
          <TouchableOpacity onPress={handlePayBills} disabled={housingBillsData?.length? false : true}>
            <View>
              <Text className="text-center py-4 text-white text-16 font-medium">
                Pay Bills
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PayAllBillCTAComponent;
