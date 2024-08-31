import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import BillsFlatList from "./BillsFlatList";
import { SectionTitleProps } from "./SectionTitle";
import Empty_bills_or_transaction from "./Empty_bills_or_transaction";
import { BaseUrl } from "@src/utils/Base_url";
import { getAccessToken } from "@src/utils/RetrieveAccessToken";
import axios from "axios";
import { getUserDueBills } from "@src/utils/APIRoutes";
import { formatCamelCaseToTitleCase } from "@src/utils/helper";

export type HousingBillsProps = {
  id: string;
  billName: string;
  amount: number;
  amountPaid: number;
  amountDue: number;
  status: string;
  dueDate: string;
};
const HousingBills = ({
  title,
}: {
  title: SectionTitleProps;
}) => {
  const [housingBillsData, setHousingBillsData] = useState<
  HousingBillsProps[] | []
  >([]);
  
  const color = housingBillsData.length > 0 ? "#CD3617" : "#D1D0CE";

  useEffect(() => {
    const getUserTransactions = async () => {
      try {
        const userAccessToken = await getAccessToken();
        const headers = {
          Authorization: userAccessToken,
        };
        const url = `${BaseUrl}${getUserDueBills}`;
        console.log(url);
        const response = await axios.get<{
          data: HousingBillsProps[] | [],
        }>(url, { headers });
        const transactions: HousingBillsProps[] = response.data.data;
        setHousingBillsData(transactions);
        console.log(response.data.data)
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
    <View>
      <SectionTitle title={title} payAllColor={color} />
      <View className="mb-[3%] mt-[3%]">
        {housingBillsData.length > 0 ? (
          housingBillsData.map((housingBillsData, index) => {
            const { billName, status, amountDue } = housingBillsData;
            return (
              <View
                key={index}
                className=" bg-white shadow-sm flex-row
                  justify-between items-center mx-[5%] px-[10%] py-[5%] mb-[2%]
                   rounded-xl
                 "
              >
                <View>
                  <Text
                    className=" text-[#242424] text-[16px] font-medium
                     text-left
                     "
                  >
                    {formatCamelCaseToTitleCase(billName)}
                  </Text>
                  <View
                    className={` ${
                      status === "PENDING" ? "bg-[#E713131A]" : "bg-[#FEF2C6B2]"
                    }
                      rounded-xl mt-[10%] w-[20vw] py-1
                      `}
                  >
                    <Text
                      className={` ${
                        status === "PENDING"
                          ? "text-[#E71313]"
                          : "text-[#A78F39]"
                      }
                        text-[11px] font-semibold px-[5%] py-[3%] text-center
                        `}
                    >
                      {status}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text className=" font-medium text-[#050402] text-[14px]">
                    &#8358;{amountDue.toLocaleString()}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <Empty_bills_or_transaction text="No due bills yet" />
        )}
      </View>
    </View>
  );
};

export default HousingBills;
