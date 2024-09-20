import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.replace('Home');
  //   }, 3000); // Adjust delay as necessary
  // }, []);

  return (
    <View className="flex-1 justify-center items-center bg-[#fbfbfb] px-10">
      <Text className="text-black text-3xl font-bold text-center mb-6">
        Welcome to the Whiplano Freedom Economy
      </Text>

      <TouchableOpacity
        className="mb-6"
        onPress={() => {
          // Handle the navigation action on long press
          console.log("Pepper icon tapped!");
        }}
        onLongPress={() => {
          navigation.replace('Login'); // Trigger navigation on long press
        }}
      >
        <Image
          source={{ uri: "https://i.ibb.co/7jfhC1K/whiplano.png" }} // Replace with the actual pepper image URL
          style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#f33' }}
        />
      </TouchableOpacity>

      <Text className="text-black text-center mb-2 text-lg">
        We are a publishing company that is spicey and unique like a white poblano pepper.
      </Text>

      <Text className="text-gray-600 text-center mt-9">
        (Tap and hold the pepper to activate navigation.)
      </Text>
    </View>
  );
};

export default SplashScreen;
