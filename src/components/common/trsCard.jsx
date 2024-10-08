import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrsCard = ({ item }) => {

  const navigation = useNavigation();
  const dataOfTrs = item?.data[0];
  const dataOfuserTrs = item;

  return (
    <View className="bg-white p-4 rounded-lg shadow-lg mb-4">
      {/* Image Section */}
      <TouchableOpacity onPress={() => navigation.replace("TrsDetail", { item })}>
      <Image
        source={{ uri: dataOfTrs?.image_uri || "https://i.ibb.co/tLB8RGL/Image-4.png" }} // Replace with the actual image URL
        className="w-full h-40 rounded-lg mb-4"
      />
      </TouchableOpacity>

      {/* Inventory and Author Information */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-500 text-xs">
          {dataOfuserTrs?.number} / {dataOfTrs?.number}
        </Text>
        <Text className="text-gray-500 text-xs">zango</Text>
      </View>

      {/* Title */}
      <Text className="font-bold text-medium mb-2 max-w-[70%]">{item?.id}</Text>

      {/* Description */}
      <Text className="text-sm text-gray-600 mb-4" numberOfLines={3}>
        {dataOfTrs?.description}
      </Text>

      {/* Activate Button */}
  
    </View>
  );
};

export default TrsCard;
