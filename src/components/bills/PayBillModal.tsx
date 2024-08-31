import {
  View,
  StyleSheet,
} from "react-native";
import PayAllBillCTAComponent from "./PayAllBillCTAComponent";

const PayBillModal = ({close}:{close: ()=>void}) => {
  return (
    <>
      <View className="">
        <PayAllBillCTAComponent close={close}/>
      </View>
    </>
  );
};


export default PayBillModal;
