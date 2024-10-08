import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { wallet } from "../constant/routes";
import OrbNavigation from "../components/OrbNavigation";
import TrsCard from "../components/common/trsCard";
import { useNavigation } from "@react-navigation/native";

const TrsInventoryScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  console.log("🚀 ~ TrsInventoryScreen ~ data:", data)
  const [loading, setLoading] = useState(true); // Manage loading state
  const [selectedTab, setSelectedTab] = useState("inventory");

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

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      
      <View className="flex-row justify-between p-4 border-b border-gray-200">
        <Text className="text-xl font-bold">My TRS</Text>
        <TouchableOpacity className="flex-row items-center" onPress={() => navigation.replace("CreateTrs")}>
          <Text className="text-gray-500">Create TRS</Text>
          <View className="ml-1 h-6 w-6 border border-gray-500 rounded-full justify-center items-center">
            <Text className="text-gray-500">+</Text>
          </View>
        </TouchableOpacity>
      </View>

      
      {/* Tabs */}
      <View className="flex-row justify-between bg-gray-100 rounded-lg mt-4 mx-4">
        <TouchableOpacity
          className={`flex-1 py-2 rounded-lg items-center ${selectedTab === "inventory" ? "bg-[#464D8E]" : "bg-transparent"}`}
          onPress={() => setSelectedTab("inventory")}
        >
          <Text className={selectedTab === "inventory" ? "text-white" : "text-gray-500"}>
            Inventory
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-2 rounded-lg items-center ${selectedTab === "uploads" ? "bg-indigo-500" : "bg-transparent"}`}
          onPress={() => setSelectedTab("uploads")}
        >
          <Text className={selectedTab === "uploads" ? "text-white" : "text-gray-500"}>
            My uploads
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {loading ? (
          // Show the loading spinner while data is being fetched
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TrsCard item={item} />}
            contentContainerStyle={{ marginTop: 10, padding: 10 }}
          />
        )}
      </View>

      <OrbNavigation />
    </SafeAreaView>
  );
};

export default TrsInventoryScreen;
