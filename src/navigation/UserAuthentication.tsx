import { View, Text } from 'react-native'
import React from 'react';
import Login from '../screens/UserAuthentication.tsx/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerifyEmail from '../screens/UserAuthentication.tsx/VerifyEmail.com';
import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthenticationStackParamList = {
    login: any;
    verify: any;
};

const Stack = createNativeStackNavigator<AuthenticationStackParamList>();
const UserAuthentication = () => {
  return (
    <Stack.Navigator 
    screenOptions={{
        headerShown: false,
    }}
    >
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen name='verify' component={VerifyEmail}/>
    </Stack.Navigator>
  )
}

export default UserAuthentication;