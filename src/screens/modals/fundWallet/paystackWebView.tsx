import React from "react";
import { Dimensions, View } from "react-native";
import axios from "@src/api/axiosClient";
import useOnboardingContext from "@src/utils/Context";
import { ToastService } from "react-native-toastier";
import AppToast from "@src/components/common/AppToast";
import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";
import { getCurrentUser } from "@src/api/user";
import { queryClient } from "@src/providers/get-query-client";

export default function Pay(props: any) {
  const { setCurrentUser, currentUser } = useOnboardingContext();
 const navigation = useNavigation();
  const params = props.route.params;

  const {
    amount,
    reference,
    close,
    authorizationUrl,
    setAuthorizationUrl,
    type,
    onSuccess
  } = params;

  const deviceHeight = Dimensions.get("window").height - 55;
  const deviceWidth = Dimensions.get("window").width;

  return (
    <WebView
        source={{ uri: authorizationUrl }}
        style={{
          flex: 1,
          backgroundColor: "yellow",
          width: deviceWidth,
          height: deviceHeight,
        }}
        javaScriptEnabled={true}
        onTouchCancel={() => console.log("touch cancel")}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        onNavigationStateChange={async (navState: any) => {
          if (navState.url.includes("success")) {
            setAuthorizationUrl(null);
            close();
            navigation.goBack();
            const url = `/transaction/verify/${reference}`;
            const res = await axios.get(url);
            if (res.data?.success) {
              const user = await getCurrentUser();
              setCurrentUser(user);
              queryClient.invalidateQueries({ queryKey: ["currentUser"] });
              onSuccess && onSuccess();
              ToastService.show({
                position: "top",
                contentContainerStyle: {
                  top: 70,
                  borderRadius: 100,
                  backgroundColor: "#FFF1C6",
                },
                children: (
                  <AppToast
                    message={"Transaction successful"}
                    leftIcon="check-circle"
                  />
                ),
                right: <View></View>,
              });
            }
          } else if (navState.url.includes("cancel")) {
            // Handle failure
            setAuthorizationUrl(null);
            close();
            navigation.goBack();
            ToastService.show({
              position: "top",
              contentContainerStyle: {
                top: 70,
                borderRadius: 100,
                backgroundColor: "#ef4444",
              },
              children: (
                <AppToast
                  message="Transaction failed. Please try again."
                  leftIcon="alert-circle"
                  color="#fff"
                />
              ),
            });
            try {
              const url = `/transaction/cancel/${reference}`;
              await axios.get(url);
            } catch (error) {
              console.log(error);
            }
          }
        }}
      />
  )
      {/* <Paystack
        paystackKey={"pk_live_9ee219c531785269cf13247493eb3b11c789b22a"} // Replace with your actual API key
        amount={Number(amount)} // Assuming Paystack expects amount in kobo/lowest currency unit
        billingEmail={currentUser?.email || ""}
        channels={["card", "bank", "ussd", "qr", "mobile_money"]}
        activityIndicatorColor='green'
        refNumber={reference}
        onCancel={async (error) => {
          console.log(error);
          close();
          ToastService.show({
            position: "top",
            contentContainerStyle: {
              top: 70,
              borderRadius: 100,
              backgroundColor: "#ef4444",
            },
            children: (
              <AppToast
                message={"Request cancelled"}
                leftIcon='alert-circle'
                color='#fff'
              />
            ),
            right: <View></View>,
          });
          try {
            const url = `/transaction/cancel/${reference}`;
            await axios.get(url);
          } catch (error) {
            console.log(error);
          }
        }}
        onSuccess={async (response) => {
          console.log(response);
          const url = `/transaction/verify/${response.data.transactionRef.reference}`;
          const res = await axios.get(url);
          if (res.data?.success) {
            setCurrentUser({
              ...currentUser,
              wallet: {
                balance: Number(currentUser?.wallet?.balance || 0) + amount,
              },
            });
            onSuccess();
            ToastService.show({
              position: "top",
              contentContainerStyle: {
                top: 70,
                borderRadius: 100,
                backgroundColor: "#FFF1C6",
              },
              children: (
                <AppToast
                  message={"Transaction successful"}
                  leftIcon='check-circle'
                />
              ),
              right: <View></View>,
            });
          }
        }}
        autoStart
      /> */}
  // );
}
