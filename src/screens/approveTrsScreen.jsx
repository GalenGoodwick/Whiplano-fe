import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { showSuccessToast } from "../utils/toastHelper";

const ApproveTrsScreen = () => {
  const [trsRequests, setTrsRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState({});

  // Fetch TRS data
  useEffect(() => {
    const fetchTrsRequests = async () => {
      try {
        const response = await axios.get(
          "https://whiplano-1b8102db6480.herokuapp.com/admin/creation_requests"
        );
        setTrsRequests(response.data);
      } catch (error) {
        console.error("Error fetching TRS requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrsRequests();
  }, []);

  // Handle Approve Request
  const approveTRS = async (id) => {
    setApproving((prev) => ({ ...prev, [id]: true })); // Set loading for specific button
    try {
      await axios.post(
        `https://whiplano-1b8102db6480.herokuapp.com/admin/approve?id=${id}`
      );
      showSuccessToast("Trs Approved");
      setTrsRequests((prev) => prev.filter((item) => item.id !== id)); // Remove the approved TRS from the list
    } catch (error) {
      showSuccessToast("Failed to approve TRS");
      console.error("Error approving TRS:", error);
    } finally {
      setApproving((prev) => ({ ...prev, [id]: false })); // Reset loading for specific button
    }
  };

  const renderTRSItem = ({ item }) => (
    <View className="p-4 bg-white rounded-lg shadow-lg mb-4">
      <Text className="text-lg font-bold">{item.title}</Text>
      <Text className="text-sm text-gray-600">{item.description}</Text>
      <Text className="text-xs text-gray-500 mt-2">
        Created at: {new Date(item.created_at).toLocaleDateString()}
      </Text>
      <TouchableOpacity
        onPress={() => approveTRS(item.id)}
        className="mt-4 p-2 bg-blue-500 rounded-lg"
        disabled={approving[item.id]}
      >
        {approving[item.id] ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center">Approve</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4 text-blue-600">Loading TRS Requests...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="p-4 bg-gray-100 flex-1">
      <Text className="text-xl font-bold text-center mb-4">
        Pending TRS Requests
      </Text>
      <FlatList
        data={trsRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTRSItem}
      />
    </SafeAreaView>
  );
};

export default ApproveTrsScreen;
