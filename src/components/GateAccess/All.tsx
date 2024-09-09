import { View, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Constant from "./Constant";
import Button from "./Button";
import { getGateRequests } from "@src/api/gateRequest";
import { useRequestContext } from "@src/context/gateRequest";

const All = () => {
  const [requests, setRequest] = useState([]);

  const { refetch } = useRequestContext()

  useEffect(() => {
    (async () => {
      const data = await getGateRequests();
      setRequest(data);
    })();
  }, [refetch]);

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="relative h-screen flex-1">
      {!requests.length && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: "700" }}>No requests yet</Text>
          </View>
        )}
        {requests.length > 0 && requests.map((data) => {
          const { id, firstName, lastName, createdAt, accessCode, status } = data;
          return (
            <Constant
              key={id}
              firstName={firstName}
              lastName={lastName}
              status={status}
              createdAt={createdAt}
              code={accessCode}
            />
          );
        })}
        <Button />
      </View>
    </ScrollView>
  );
};

export default All;
