// components/CustomTextInput.js
import React from 'react';
import { TextInput, View, Text } from 'react-native';

const CustomTextInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View className="mb-5">
      {label && <Text className="text-base text-gray-700 mb-1">{label}</Text>}
      <TextInput
        className="h-12 border border-gray-300 rounded-lg px-4 bg-gray-50 text-base"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#ccc"
      />
    </View>
  );
};

export default CustomTextInput;
