// components/TrsSection.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import ProductCard from '../common/productCard';

const TrsSection = ({ title, products }) => {
  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-xl font-bold text-gray-800">{title}</Text>
        <TouchableOpacity>
          <Text className="text-blue-600 font-semibold">See more</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard name={item.name} price={item.price} />
        )}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default TrsSection;
