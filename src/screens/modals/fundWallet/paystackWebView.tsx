import React from 'react';
import  { Paystack }  from 'react-native-paystack-webview';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { BaseUrl } from '@src/utils/Base_url';
import axios from '@src/api/axiosClient';
import useOnboardingContext from '@src/utils/Context';


export default function Pay({amount, payStackKey, reference, close}: {amount: number, payStackKey: string, reference: string, close: ()=>void}) {

  const { setCurrentUser, currentUser } = useOnboardingContext();
  return (
    <View style={{ flex: 1 }}>
      <Paystack
          paystackKey={payStackKey} // Replace with your actual API key
          amount={Number(amount)} // Assuming Paystack expects amount in kobo/lowest currency unit
          billingEmail={currentUser?.email||''}
          activityIndicatorColor="green"
          refNumber={reference}
          onCancel={() => {
            close()
            Toast.show({
              type: "error",
              text1: "Cancel",
              text2: "Request cancelled.",
            });
          }}
          onSuccess={async(response) => {
              const url = `/transaction/verify/${response.data.transactionRef.reference}`;
            const res = await axios.get(url);
            if (res.data?.success) {
              setCurrentUser({...currentUser, wallet: {balance: Number(currentUser?.wallet?.balance||0) + amount}})
              close()
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

