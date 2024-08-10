import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Bills from "../screens/bills";
import Messages from "../screens/message";
import Account from "../screens/account";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo'
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

const CustomTabIcon = ({children, active}:{active: boolean, children: React.ReactNode}) => {
  return (
    <View style={[styles.iconContainer, {backgroundColor: active ? '#F6411B': 'white'}]}>
      {children}
    </View>
  );
};

const DashboardStack = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarLabel: () => null,
      tabBarStyle: {
        height: 100,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopWidth: 0,
      },
    }}
    >
      <Tab.Screen options={{tabBarIcon:({size, color, focused}) => <CustomTabIcon active={focused}><Entypo name="home" size={size} color={color} /></CustomTabIcon>}} name="Home" component={Home} />
      <Tab.Screen options={{tabBarIcon:({size, color, focused}) => <CustomTabIcon active={focused}><Octicons name="credit-card" size={size} color={color} /></CustomTabIcon>}} name="Bills" component={Bills} />
      <Tab.Screen options={{tabBarIcon:({size, color, focused}) => <CustomTabIcon active={focused}><Ionicons name="chatbubble-ellipses" size={size} color={color} /></CustomTabIcon>}} name="Message" component={Messages} />
      <Tab.Screen options={{tabBarIcon:({size, color, focused}) => <CustomTabIcon active={focused}><FontAwesome name="user" size={size} color={color} /></CustomTabIcon>}} name="Account" component={Account} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F6411B',
    borderRadius: 50,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default DashboardStack;
