// screens/PaymentMethod.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckoutProgress from '../components/common/checkProgress';
import imagePath from '../constant/imagePath';
import { SafeAreaView } from 'react-native-safe-area-context';

const PaymentMethod = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity>
          <Text className="text-blue-600">Cancel</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold">Checkout</Text>
      </View>

      {/* Checkout Progress */}
      <CheckoutProgress currentStep={2} />

      {/* Payment Method */}
      <Text className="text-lg font-bold mb-2">Choose a payment method</Text>
      <Text className="text-gray-500 mb-6">You won’t be charged until you review the order on the next page.</Text>

      <TouchableOpacity className="flex-row justify-between items-center bg-gray-100 p-4 rounded-lg mb-6">
        <View className="flex-row items-center">
          <Image source={imagePath.paypalLogo} style={{ width: 50, height: 20 }} resizeMode="contain" />
          <Text className="ml-3 text-lg font-semibold">PayPal</Text>
        </View>
        <View className="h-5 w-5 border border-gray-400 rounded-full justify-center items-center">
          <View className="h-3 w-3 bg-blue-600 rounded-full"></View>
        </View>
      </TouchableOpacity>

      {/* Continue Button */}
      <View className="flex-1 justify-end">
        <TouchableOpacity
          onPress={() => navigation.replace('ReviewSummary')}
          className="bg-blue-600 h-14 rounded-lg flex-row justify-center items-center"
        >
          <Text className="text-white text-lg">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethod;
