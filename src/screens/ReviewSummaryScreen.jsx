// screens/ReviewSummary.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CheckoutProgress from '../components/common/checkProgress';
import SuccessModal from '../components/common/successModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReviewSummary = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity>
          <Text className="text-blue-600">Cancel</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold">Checkout</Text>
      </View>

      {/* Checkout Progress */}
      <CheckoutProgress currentStep={3} />

      {/* Order Summary */}
      <ScrollView className="mb-6">
        <View className="border-b border-gray-200 pb-4 mb-4">
          <Text className="text-lg font-bold">Order Summary</Text>
          <View className="flex-row justify-between mt-4">
            <Text className="text-gray-800">Amazing T-shirt</Text>
            <Text className="text-gray-800">€ 12.00</Text>
          </View>
          <Text className="text-gray-500 text-sm mt-2">Qty: 1</Text>
        </View>

        {/* Total */}
        <View className="flex-row justify-between">
          <Text className="text-lg font-bold">Total</Text>
          <Text className="text-lg font-bold">€ 12.00</Text>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View className="flex-1 justify-end">
        <TouchableOpacity
          onPress={() => setModalVisible(true)} // Trigger the success modal
          className="bg-blue-600 h-14 rounded-lg flex-row justify-center items-center"
        >
          <Text className="text-white text-lg">Place Order</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <SuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Order Placed!"
        description="You sucessfully bought the rights for TRS. Thank you for your purchase."
        buttonText="Go to Home"
        onButtonPress={() => {
          // Navigate or perform any other action
          console.log('Navigate to Home or another page');
        }}
      />
    </SafeAreaView>
  );
};

export default ReviewSummary;
