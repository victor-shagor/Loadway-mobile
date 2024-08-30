import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { HousingBillsProps } from "./HousingBills";
import { getAccessToken } from "@src/utils/RetrieveAccessToken";
import axios from "axios";
import { BaseUrl } from "@src/utils/Base_url";
import { getUserDueBills } from "@src/utils/APIRoutes";
import { createHeaders } from "@src/utils/APIRoutes";
import { payUserBills } from "@src/utils/APIRoutes";
import useOnboardingContext from "@src/utils/Context";



const PayAllBillCTAComponent = () => {
  const [housingBillsData, setHousingBillsData] = useState<
    HousingBillsProps[] | []
  >([]);

  const billsElement = useRef(null);
  const [bills, setBills] = useState<string[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);


  const selectBillsHandler = (id: string) => {
    setIsActive(!isActive);
    setBills((prevSelectedBills: string[]) =>
      prevSelectedBills.includes(id)
        ? prevSelectedBills.filter((billId) => billId !== id)
        : [...prevSelectedBills, id]
    );
  };

  const selectAllHandler = () => {
    if (bills.length === housingBillsData.length) {
      setBills([]);
    } else {
      const allBillIds = housingBillsData.map((bill) => bill.id);
      setBills(allBillIds);
    }
  };
  const {  setPayBillModal } = useOnboardingContext();

  const payBillsApiRequest = async ()=>{
      try {
        const url = `${BaseUrl}${payUserBills}`;
        const headers = await createHeaders();
        const payload = {
          bills
        };
        if (bills.length > 0) {
          const response = await axios.post(url, payload, {headers});
          if (response.status === 201) {
            setPayBillModal(false);
          }
        }else{
          Alert.alert('Please select a bill');
        }
      } catch (error) {
        console.log(error)
        Alert.alert('An error occurred. Please try again');
      }
  }

  useEffect(() => {
    const getUserTransactions = async () => {
      try {
        const userAccessToken = await getAccessToken();
        const headers = {
          Authorization: userAccessToken,
        };
        const url = `${BaseUrl}${getUserDueBills}`;
        const response = await axios.get<{
          data: HousingBillsProps[] | [];
        }>(url, { headers });
        const transactions: HousingBillsProps[] = response.data.data;
        setHousingBillsData(transactions);
      } catch (error) {
        Alert.alert(
          "An Error ocurred. Failed to fetch user transaction." + error
        );
        console.log("An error occured." + error);
      }
    };
    getUserTransactions();
  }, []);

  return (
    <>
      <ScrollView>
        <View className="w-screen h-[52vh] px-[5%] py-[5%] relative">
          <View className="mb-[5%]">
            <Pressable className=" flex-row" onPress={selectAllHandler}>
              <View
                className=" w-[5%] h-[80%] mt-[0.3vh] rounded-full border-2 border-[#31312F26]"
                style={{
                  borderColor:
                    bills.length === housingBillsData.length
                      ? "#CD3617"
                      : "#31312F26",
                  backgroundColor:
                    bills.length === housingBillsData.length
                      ? "#CD3617"
                      : "transparent",
                }}
              ></View>
              <Text className="text-[##151107] font-semibold text-[16px] pl-[5%]">
                Select All
              </Text>
            </Pressable>
          </View>
          {housingBillsData.map((data, index) => {
            const { billName, amountDue, id } = data;

            const isSelected = bills.includes(id);

            // Define styles based on selection state
            const backgroundColor = isSelected ? "#CD3617" : "#F0F0F0"; // Change colors as needed
            const borderColor = isSelected ? "#CD3617" : "#31312F26";

            return (
              <TouchableOpacity
                // className=" flex-row"
                onPress={() => selectBillsHandler(id)}
                key={index}
              >
                <View className="flex-row justify-between mb-[5%]">
                  <View className=" flex-row">
                    <View
                      className=" w-[5vw] h-[2.5vh] mt-[0.3vh] rounded-full
                   border-2 border-[#31312F26] bg-red-300"
                      id={id}
                      ref={billsElement}
                      style={{ backgroundColor, borderColor }}
                    ></View>
                    <Text className="text-[##151107] font-semibold text-[16px] pl-[5%]">
                      {billName}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-[##151107] font-semibold text-[16px]">
                      ₦{amountDue.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          <View
            className=" fixed top-[5%] w-full mx-[1%]
           bg-[#F6411B] rounded-xl"
          >
            <TouchableOpacity onPress={payBillsApiRequest}>
              <View>
                <Text
                  className=" text-center py-[4%] text-white text-[16px]
                  font-medium
                "
                >
                  Pay Bills
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PayAllBillCTAComponent;
