import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, ScrollView } from "react-native";
import { MagnifyingGlassIcon, FunnelIcon } from "react-native-heroicons/outline"; // Optional for icons, install `react-native-heroicons`


const TRSSearchBar = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  const tabs = ["All", "Art TRS", "Tech TRS", "Misc"];

  return (
    <View className = {`p-4 bg-gray-100`}>
      {/* Search Bar */}
      <View className = {`flex-row items-center bg-gray-50 p-2 rounded-md shadow-sm`}>
        <MagnifyingGlassIcon size={20} color="gray" />
        <TextInput
          placeholder="Search for TRS"
          className = {`flex-1 ml-2 p-2 text-gray-800`}
        />
        <TouchableOpacity>
          <FunnelIcon size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className = {`mt-4`}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            className = {`mr-3 px-4 py-2 rounded-md ${
              selectedTab === tab ? "bg-[#464D8E]" : "bg-gray-200"
            }`}
          >
            <Text
              className = {`${selectedTab === tab ? "text-white" : "text-gray-700"} font-medium`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TRSSearchBar;
