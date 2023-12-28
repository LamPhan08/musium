import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../constants/colors';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText,
  error,
  onFocus = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <>
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 20,
        marginTop:5
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholderTextColor={COLORS.grey}
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, fontFamily: 'Mulish-Regular', color: COLORS.text }}
          secureTextEntry={true}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          autoCapitalize='none'
        />
      ) : (
        <TextInput
          placeholderTextColor={COLORS.grey}
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, fontFamily: 'Mulish-Regular', color: COLORS.text }}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          autoCapitalize='none'
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: '#06A0B5', fontFamily: 'Mulish-ExtraBold' }}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
        {error && (
        <Text style={{marginBottom: 20, color: "red", fontSize: 12, fontFamily: 'Mulish-Regular'}}>
          {error}
        </Text>
      )}
    </>
  );
}