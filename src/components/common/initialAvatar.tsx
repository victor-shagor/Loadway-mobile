import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InitialsAvatar = ({ initials, bg }: any) => {
  return (
    <View style={[styles.circle, {backgroundColor: bg || '#f0f0f0'}]}>
      <Text style={styles.initialsText}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default InitialsAvatar;
