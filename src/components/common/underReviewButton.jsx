import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const UnderReviewButton = () => {
  return (
    <TouchableOpacity
      className={`flex-row items-center border border-red-500 rounded-full px-4 py-1 bg-red-100 w-[50%] mt-3 mb-3`}
    >
      {/* Loading Spinner */}
      <ActivityIndicator size="small" color="#A52A2A" className={`mr-2`} />

      {/* Text */}
      <Text className={`text-red-800 font-semibold`}>Under review</Text>
    </TouchableOpacity>
  );
};


export default UnderReviewButton;