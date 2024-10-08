// components/TrsSection.js
import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import TrsCardMarketplace from "../common/TrsCardMarketplace";

const TrsSection = ({ title, products }) => {
  return (
    <View className="mb-2">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-xl font-bold text-gray-800">{title}</Text>
      </View>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <TrsCardMarketplace item={item} />}
        keyExtractor={(item) => item?.collection_name}
      />
    </View>
  );
};

export default TrsSection;
