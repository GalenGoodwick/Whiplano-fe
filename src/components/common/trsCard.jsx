import { Image, Text, TouchableOpacity, View } from "react-native";

const TrsCard = ({ item }) => {
  return (
    <View className="bg-white p-4 rounded-lg shadow-lg mb-4">
      {/* Image Section */}
      <Image
        source={{ uri: "https://i.ibb.co/tLB8RGL/Image-4.png" }} // Replace with the actual image URL
        className="w-full h-40 rounded-lg mb-4"
      />

      {/* Inventory and Author Information */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-500 text-xs">
          {10} / {100}
        </Text>
        <Text className="text-gray-500 text-xs">zango</Text>
      </View>

      {/* Title */}
      <Text className="font-bold text-medium mb-2 max-w-[70%]">{item.id}</Text>

      {/* Description */}
      <Text className="text-sm text-gray-600 mb-4" numberOfLines={3}>
        {item.data}
      </Text>

      {/* Activate Button */}
      <View className="flex-row justify-between items-center gap-1">
        <TouchableOpacity className="bg-white py-2 px-4 rounded-lg flex-row items-center justify-center w-1/2 shadow-2xl border border-gray-300">
          <Text className="text-sm text-black mr-2">Activate</Text>
          {/* You can replace the emoji with an icon */}
          <Text className="text-sm">🔗</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white py-2 px-4 rounded-lg flex-row items-center justify-center w-1/2 shadow-2xl border border-red-300">
          <Text className="text-sm text-red-500 mr-2">Sell</Text>
          {/* You can replace the emoji with an icon */}
          <Text className="text-sm">-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrsCard;
