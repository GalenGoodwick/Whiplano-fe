// screens/TrsMarketScreen.js
import React from 'react';
import { View, ScrollView } from 'react-native';
import TrsHeader from '../components/common/trsHeader';
import TrsSection from '../components/TrsMarketPlace/section';
import CustomCarousel from '../components/common/customCarousel';
import { SafeAreaView } from 'react-native-safe-area-context';
const TrsMarketScreen = () => {
  const perfectForYouProducts = [
    { name: 'Whiplano Book', price: 12.00 },
    { name: 'Tomas Art', price: 15.00 },
  ];

  const forSummerProducts = [
    { name: 'Summer Dress', price: 25.00 },
    { name: 'Cool Shorts', price: 10.00 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TrsHeader />
      <ScrollView>
        <CustomCarousel />
        <TrsSection title="Perfect for you" products={perfectForYouProducts} />
        <TrsSection title="For this summer" products={forSummerProducts} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrsMarketScreen;
