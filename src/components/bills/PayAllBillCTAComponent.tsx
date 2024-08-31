import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HousingBillsProps } from "./HousingBills";
import { getAccessToken } from "@src/utils/RetrieveAccessToken";
import { getUserDueBills, payUserBills, createHeaders } from "@src/utils/APIRoutes";
import { formatCamelCaseToTitleCase } from "@src/utils/helper";
import { BaseUrl } from "@src/utils/Base_url";

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
            ₦{amountDue.toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PayAllBillCTAComponent = ({ close }: { close: () => void }) => {
  const [housingBillsData, setHousingBillsData] = useState<HousingBillsProps[]>([]);
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
      Alert.alert("Please select at least one bill to pay.");
      return;
    }

    try {
      const url = `${BaseUrl}${payUserBills}`;
      const headers = await createHeaders();
      const payload = { bills: selectedBillIds };

      const response = await axios.post(url, payload, { headers });
      if (response.status === 201) {
        close();
      }
    } catch (error) {
      console.error(error);
      Alert.alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUserBills = async () => {
      try {
        const userAccessToken = await getAccessToken();
        const headers = { Authorization: userAccessToken };
        const url = `${BaseUrl}${getUserDueBills}`;
        const response = await axios.get<{ data: HousingBillsProps[] }>(url, { headers });

        setHousingBillsData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user transactions: ", error);
        Alert.alert("An error occurred while fetching your bills.");
      }
    };

    fetchUserBills();
  }, []);

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
        {housingBillsData.map((bill) => (
          <BillItem
            key={bill.id}
            data={bill}
            isSelected={selectedBillIds.includes(bill.id)}
            onPress={() => toggleBillSelection(bill.id)}
          />
        ))}
        <View className="fixed top-5 w-full mx-1 bg-red-600 rounded-xl">
          <TouchableOpacity onPress={handlePayBills}>
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
