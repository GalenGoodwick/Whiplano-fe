// screens/TrsMarketScreen.js
import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TrsHeader from "../components/common/trsHeader";
import TrsSection from "../components/TrsMarketPlace/section";
import CustomCarousel from "../components/common/customCarousel";
import OrbNavigation from "../components/OrbNavigation";
import TRSSearchBar from "../components/common/trsSearchBar";
import axios from "axios";
import { marketPlace } from "../constant/routes";
const TrsMarketScreen = () => {
  const [data, setData] = useState([]);

  const fetchMarketplaceData = useCallback(async () => {
    try {
      const {data} = await axios.get(`${marketPlace}`);
      setData(data);
      console.log("🚀 ~ fetchMarketplaceData ~ data:", data)

    } catch (error) {
      console.log("🚀 ~ fetchMarketplaceData ~ error:", error.response.data)
      
    }
  },[])

  useEffect(() => {
    fetchMarketplaceData();
  }, [fetchMarketplaceData]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <TRSSearchBar />
      <ScrollView>
        <TrsSection products={data} />
        <TrsSection title="Most sold" products={data} />
      </ScrollView>
      <OrbNavigation />
    </SafeAreaView>
  );
};

export default TrsMarketScreen;
