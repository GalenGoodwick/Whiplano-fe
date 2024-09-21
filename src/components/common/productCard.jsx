// components/ProductCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ name, price, image }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', { product: { name, price, image } })}
    >
      <View className="bg-blue-100 shadow-lg rounded-lg p-4 w-44 mr-4">
        <View className="h-28 bg-gray-100 rounded-lg overflow-hidden mb-2">
          <Image source={{ uri: image || 'https://via.placeholder.com/150' }} className="w-full h-full" resizeMode="cover" />
        </View>
        <Text className="text-lg font-semibold text-gray-800 mb-1">{name}</Text>
        <Text className="text-base font-medium text-blue-600">€ {price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
