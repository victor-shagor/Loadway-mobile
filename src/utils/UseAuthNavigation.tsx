import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthenticationStackParamList } from '../navigation/UserAuthentication'

const UseAuthNavigation = () => {
  return useNavigation<AuthenticationStackParamList>();
}

export default UseAuthNavigation;