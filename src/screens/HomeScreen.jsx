import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, Text, View } from "react-native";
import OrbNavigation from "../components/OrbNavigation";
import axios from "axios";
import { wallet } from "../constant/routes";

const HomeScreen = () => {
  const fetchTrs = async () => {
    try {
      const { data } = await axios.get(`${wallet}/get`);
      console.log(data);
    } catch (error) {
      console.log("🚀 ~ fetchTrs ~ error:", error.response.data);
    }
  };

  useEffect(() => {
    fetchTrs();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HomeScreen content */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Welcome to the Home Screen
        </Text>
        <Text style={{ marginTop: 10 }}>
          This is some sample content behind the navigation.
        </Text>
      </View>

      <OrbNavigation />
    </SafeAreaView>
  );
};

export default HomeScreen;
