// screens/CreateTRSScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomTextInput from '../components/common/customTextInput';
import { SafeAreaView } from 'react-native-safe-area-context';


const CreateTRSScreen = () => {
  const [collectionName, setCollectionName] = useState('');
  const [publisherName, setPublisherName] = useState('');
  const [number, setNumber] = useState('');
  const [image, setImage] = useState(null);

  // Handle image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold text-center mb-6">Create TRS</Text>

      {/* Collection Name */}
      <CustomTextInput
        label="Collection Name"
        value={collectionName}
        onChangeText={setCollectionName}
        placeholder="Enter collection name"
      />

      {/* Publisher Name */}
      <CustomTextInput
        label="Publisher Name"
        value={publisherName}
        onChangeText={setPublisherName}
        placeholder="Enter publisher name"
      />

      {/* Number */}
      <CustomTextInput
        label="Number"
        value={number}
        onChangeText={setNumber}
        placeholder="Enter number"
        keyboardType="numeric"
      />

      {/* Image Upload */}
      <View className="mb-6">
        <Text className="text-base text-gray-700 mb-2">Upload Image</Text>
        <TouchableOpacity
          className="bg-gray-100 h-40 w-full rounded-lg justify-center items-center border border-gray-300"
          onPress={pickImage}
        >
          {image ? (
            <Image source={{ uri: image }} className="h-full w-full rounded-lg" resizeMode="cover" />
          ) : (
            <Text className="text-gray-500">Tap to select an image</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity className="bg-blue-600 h-12 rounded-lg flex-row justify-center items-center">
        <Text className="text-white text-lg font-semibold">Create TRS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateTRSScreen;
