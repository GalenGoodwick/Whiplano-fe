// components/CheckoutProgress.js
import React from 'react';
import { View, Text } from 'react-native';

const CheckoutProgress = ({ currentStep }) => {
  const steps = ['Your bag', 'Payment', 'Review'];

  return (
    <View className="flex-row justify-center items-center mb-6">
      {steps.map((step, index) => (
        <View key={index} className="items-center mx-2">
          <View
            className={`h-8 w-8 rounded-full justify-center items-center ${index + 1 === currentStep
              ? 'bg-blue-600' 
              : 'bg-gray-300'
            }`}
          >
            <Text className="text-white font-semibold">{index + 1}</Text>
          </View>
          <Text className={`text-sm mt-2 ${index + 1 === currentStep ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CheckoutProgress;
