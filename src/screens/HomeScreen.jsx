import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, Text, View } from "react-native";
import OrbNavigation from "../components/OrbNavigation";

const HomeScreen = () => {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  const toggleNavigation = () => {
    setIsNavigationVisible(!isNavigationVisible);
  };

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
