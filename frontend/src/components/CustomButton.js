import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#06A0B5',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#fff',
          fontFamily: 'Mulish-ExtraBold'
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}