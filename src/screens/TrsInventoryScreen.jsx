import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { wallet } from "../constant/routes";
import OrbNavigation from "../components/OrbNavigation";

const TrsInventoryScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Manage loading state

  // Function to convert the API response object into an array of collections
  const convertApiResponseToArray = (response) => {
    return Object.keys(response).map((key) => {
      return {
        id: key, // The collection name as ID
        ...response[key], // The rest of the collection data
      };
    });
  };

  // Fetch the TRS data
  const fetchTrs = async () => {
    try {
      const { data } = await axios.get(`${wallet}/get`);
      const convertedData = convertApiResponseToArray(data);
      setData(convertedData); // Set the array of collections
      setLoading(false); // Stop loading
    } catch (error) {
      console.log("🚀 ~ fetchTrs ~ error:", error.response.data);
      setLoading(false); // Stop loading even on error
    }
  };

  useEffect(() => {
    fetchTrs();
  }, []);

  // Component for rendering each card
  const BookCard = ({ item }) => {
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
        <TouchableOpacity className="bg-white py-2 px-4 rounded-lg flex-row items-center justify-center w-1/2 shadow-2xl border border-gray-300">
          <Text className="text-sm text-black mr-2">Activate</Text>
          {/* You can replace the emoji with an icon */}
          <Text className="text-sm">🔗</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <View>
        <Text className="text-lg font-bold mb-2 text-center">Maria</Text>

        {/* Image Section */}
        <Image
          source={{ uri: "https://via.placeholder.com/600x300" }} // Replace with actual image URL
          className="w-full h-40 rounded-lg mb-2 shadow-lg"
        />

        {/* User Information */}
        <View className="flex-row justify-between items-center">
          <View className="bg-indigo-600 rounded-full px-3 py-1">
            <Text className="text-white text-xs">Investor</Text>
          </View>
        </View>

        {/* Bottom Section */}
        <View className="flex-row justify-between items-center mt-2">
          <Text>TRS</Text>
          <View className="items-end">
            <Text className="text-gray-500 text-xs">06/24 (Active)</Text>
          </View>
        </View>
      </View>

      <View>
        {loading ? (
          // Show the loading spinner while data is being fetched
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BookCard item={item} />}
            contentContainerStyle={{ marginTop: 10, padding: 10 }}
          />
        )}
      </View>

      <OrbNavigation />
    </SafeAreaView>
  );
};

export default TrsInventoryScreen;
