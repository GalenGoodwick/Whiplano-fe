import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TrsCardMarketplace = ({ item }) => {
  console.log("🚀 ~ TrsCardMarketplace ~ item:", item)
  const trsData = item?.collection_data[0]
  const navigation = useNavigation();

  return (
    <View className="bg-white p-4 rounded-lg shadow-lg mb-4 w-60 mr-2">
      {/* Image Section */}
      <TouchableOpacity onPress={() => navigation.push("TrsDetailMarketPlace", { item })}>
        <View className="relative">
          {/* Category Badge */}
          <View className="absolute top-4 left-2 bg-purple-600 px-2 py-1 rounded-full">
            <Text className="text-white text-xs">{item?.category || "Misc"}</Text>
          </View>
          <Image
            source={{ uri: trsData?.image_uri || "https://i.ibb.co/tLB8RGL/Image-4.png" }}
            className="w-full h-20 rounded-lg mb-4"
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>

      {/* Inventory and Price Information */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-500 text-xs">
          amount : {item?.number_of_trs}
        </Text>
        <Text className="text-pink-500 text-sm font-semibold">${item?.bid_price}</Text>
      </View>

      {/* Title */}
      <Text className="font-bold text-2xl mb-1">{item?.collection_name}</Text>

      {/* Description */}
      <Text className="text-sm text-gray-600 mb-4" numberOfLines={3}>
        {trsData?.description}
      </Text>
    </View>
  );
};

export default TrsCardMarketplace;