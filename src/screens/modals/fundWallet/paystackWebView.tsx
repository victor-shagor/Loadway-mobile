import React from 'react';
import  { Paystack }  from 'react-native-paystack-webview';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { BaseUrl } from '@src/utils/Base_url';
import axios from 'axios';


export default function Pay({amount, email, payStackKey}: {amount: number, email: string, payStackKey: string}) {
  return (
    <View style={{ flex: 1 }}>
      <Paystack
          paystackKey={payStackKey} // Replace with your actual API key
          amount={Number(amount)} // Assuming Paystack expects amount in kobo/lowest currency unit
          billingEmail="tenant@gmail.com"
          activityIndicatorColor="green"
          onCancel={() => {
            Toast.show({
              type: "error",
              text1: "Cancel",
              text2: "Request cancelled.",
            });
          }}
          onSuccess={async(response) => {
            const url = `${BaseUrl}/transaction/verify/${response.data.reference}`;
            const param = {reference: response.data.reference };
            const res = await axios.post(url, param);
            if (res.data.success === "success") {
              Toast.show({
              type: "success",
              text1: "Success",
              text2: "Transaction successful.",
            });
            }
          }}
          autoStart
        />
    </View>
  );
}