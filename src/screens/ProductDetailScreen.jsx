// screens/ProductDetail.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params; // Destructure the product data passed from the route

  return (
    <SafeAreaView className="flex-1 bg-white p-3">

      {/* Product Image */}
      <View className="items-center mt-16">
        <View className="h-64 w-full bg-gray-100 rounded justify-center items-center">
          <Image
            source={{ uri: product.image || 'https://via.placeholder.com/600x300' }}
            className="h-full w-full rounded-lg"
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Product Info */}
      <View className="mt-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">{product.name}</Text>
          <TouchableOpacity>
            <FontAwesome name="heart" size={24} color="blue" />
          </TouchableOpacity>
        </View>
        <Text className="text-lg font-semibold text-gray-500 mb-2">€ {product.price.toFixed(2)}</Text>
        <Text className="text-gray-600">
          The perfect T-shirt for when you want to feel comfortable but still stylish. Amazing for all occasions.
          Made of 100% cotton fabric in four colours. Its modern style gives a lighter look to the outfit. Perfect
          for the warmest days.
        </Text>
      </View>

      {/* Add to Bag Button */}
      <View className="flex-1 justify-end mt-10">
        <TouchableOpacity className="bg-blue-600 h-14 rounded-lg flex-row justify-center items-center" onPress={() => navigation.navigate('paymentMethod')}> 
          <FontAwesome name="shopping-bag" size={24} color="white" />
          <Text className="text-white text-lg ml-3">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
