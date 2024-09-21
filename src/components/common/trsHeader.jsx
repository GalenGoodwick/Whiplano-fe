// components/Header.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TrsHeader = () => {
  const naigation = useNavigation();
  return (
    <View className="flex-row justify-between items-center p-4">
      <TouchableOpacity>
        <FontAwesome name="search" size={24} color="black" />
      </TouchableOpacity>
      <View className="flex-row space-x-4">
        <TouchableOpacity onPress={() => naigation.navigate('CreateTrs')}>
          <FontAwesome name="plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="shopping-cart" size={24} color="black" />
          <View className="absolute top-0 right-0 bg-blue-500 rounded-full h-4 w-4 justify-center items-center">
            <Text className="text-white text-xs">9</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrsHeader;
