import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomTextInput from "../components/common/customTextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientButton from "../components/common/gradientBtn";
import { useNavigation } from "@react-navigation/native";

const CreateTRSScreen = ({ route }) => {
  const navigation = useNavigation();

  // Destructure the data passed from route params (if available)
  const { title = "", description = "", price = "", trsAmount = "", contentUrl = "", image = null } = route.params || {};

  const [trsData, setTRSData] = useState({
    title,
    description,
    price,
    trsAmount,
    contentUrl,
    image,
  });

  // Handle image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setTRSData({ ...trsData, image: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <ScrollView>
        <Text className="text-xl font-bold mb-6">Create TRS</Text>
        <Text className="text-sm text-gray-400 mb-6">
          Create your TRS and put it out in the market
        </Text>

        {/* Title */}
        <CustomTextInput
          label="Title"
          value={trsData.title}
          onChangeText={(text) => setTRSData({ ...trsData, title: text })}
          placeholder="Enter collection name"
        />

        {/* Short description */}
        <CustomTextInput
          label="Short description"
          value={trsData.description}
          onChangeText={(text) => setTRSData({ ...trsData, description: text })}
          placeholder="Enter publisher name"
        />

        {/* Price */}
        <CustomTextInput
          label="Price"
          value={trsData.price}
          onChangeText={(text) => setTRSData({ ...trsData, price: text })}
          placeholder="$"
          keyboardType="numeric"
        />

        <CustomTextInput
          label="TRS Amount"
          value={trsData.trsAmount}
          onChangeText={(text) => setTRSData({ ...trsData, trsAmount: text })}
          placeholder="Enter TRS Amount"
          keyboardType="numeric"
        />

        {/* Image Upload */}
        <View className="mb-6">
          <Text className="text-base text-gray-700 mb-2">Upload content</Text>
          <TouchableOpacity
            className="border-dotted border-gray-200 border-2 rounded-lg p-4"
            onPress={pickImage}
          >
            {trsData.image ? (
              <Image
                source={{ uri: trsData.image }}
                className="w-full h-40 rounded-lg"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-gray-500">Browse for content</Text>
            )}
          </TouchableOpacity>
        </View>

        <CustomTextInput
          placeholder="Enter content URL"
          value={trsData.contentUrl}
          onChangeText={(text) => setTRSData({ ...trsData, contentUrl: text })}
        />

        <GradientButton
          text="Review"
          onPress={() => {
            navigation.navigate("ReviewTrsScreen", trsData);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTRSScreen;
