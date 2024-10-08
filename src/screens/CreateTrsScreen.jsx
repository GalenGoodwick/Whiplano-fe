import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import CustomTextInput from "../components/common/customTextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientButton from "../components/common/gradientBtn";
import { useNavigation } from "@react-navigation/native";

const CreateTRSScreen = ({ route }) => {
  const navigation = useNavigation();

  // Destructure the data passed from route params (if available)
  const { title = "", description = "", trsAmount = "", contentUrl = "", image = null, files = [] } = route.params || {};

  const [trsData, setTRSData] = useState({
    title,
    description,
    trsAmount,
    contentUrl,
    image,
    files, // Initialize files as an empty array if none are passed
  });

  const [isFormValid, setIsFormValid] = useState(false);

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

  // Handle file picker for multiple files
  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // Accept all file types
      copyToCacheDirectory: true,
      multiple: true, // Enable multiple file selection
    });

    if (result.type !== "cancel") {
      const newFiles = result.assets.map(file => ({
        uri: file.uri,
        name: file.name,
        size: file.size,
        mimeType: file.mimeType,
      }));

      // Append the new files to the existing files
      setTRSData({ ...trsData, files: [...trsData.files, ...newFiles] });
    }
  };

  // Handle file removal
  const removeFile = (index) => {
    const updatedFiles = trsData.files.filter((_, fileIndex) => fileIndex !== index);
    setTRSData({ ...trsData, files: updatedFiles });
  };

  // Check if all fields are filled to enable the button
  useEffect(() => {
    if (
      trsData.title &&
      trsData.description &&
      trsData.trsAmount &&
      trsData.contentUrl &&
      trsData.image &&
      trsData.files.length > 0
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [trsData]);

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

        {/* File Upload */}
        <View className="mb-6">
          <Text className="text-base text-gray-700 mb-2">Upload files</Text>
          <TouchableOpacity
            className="border-dotted border-gray-200 border-2 rounded-lg p-4"
            onPress={pickFile}
          >
            <Text className="text-gray-500">Browse for files</Text>
          </TouchableOpacity>
          
          {/* Display the list of uploaded files */}
          {trsData.files.length > 0 && (
            <View className="mt-4">
              {trsData.files.map((file, index) => (
                <View key={index} className="flex-row items-center justify-between mb-2">
                  <Text className="text-gray-500 flex-1">{file.name}</Text>
                  <TouchableOpacity
                    className="ml-2"
                    onPress={() => removeFile(index)}
                  >
                    <Text className="text-red-500">Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <CustomTextInput
          placeholder="Enter content URL"
          value={trsData.contentUrl}
          onChangeText={(text) => setTRSData({ ...trsData, contentUrl: text })}
        />

        {/* Pass isFormValid to enable or disable the button */}
        <GradientButton
          text="Review"
          onPress={() => navigation.replace("ReviewTrsScreen", trsData)}
          disabled={!isFormValid} // Disable button when the form is not valid
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTRSScreen;
