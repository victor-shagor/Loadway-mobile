import { SafeAreaView } from "../../components/layout/safeAreaView";
import { Text, View } from "react-native";

const Bills = () => {
  return (
    <SafeAreaView>
      <View>
        <View>
          <Text>Wallet Balance</Text>
          <Text>N10,000</Text>
        </View>
        <View>
          <Text>Due Bills</Text>
          <Text>N20,000</Text>

          <Text>N20,000</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Bills;
