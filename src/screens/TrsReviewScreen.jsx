import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";  // Axios for making the API call
import GradientButton from "../components/common/gradientBtn";
import TermConditionModal from "../components/common/termConditionModal";
import SuccessFlowModal from "../components/common/successFlowModal";
import { create } from "../constant/routes";

const ReviewTRSScreen = ({ route }) => {
  const { title, description, trsAmount, contentUrl, image, files } = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);  // Loading state

  const handleEditTRS = () => {
    // Navigate back to the CreateTRSScreen with the current data
    navigation.replace("CreateTrs", {
      title,
      description,
      trsAmount,
      contentUrl,
      image,
      files, // Pass the files as well
    });
  };

  const handleSignature = async () => {
    setModalVisible(false);
    setLoading(true);  // Start loading
    const formData = new FormData();

    // Append form data
    formData.append("model_name", Math.random().toString(36).substring(7));  // Title as model_name
    formData.append("title", title);  // Keeping title as random value
    formData.append("description", description);  // Description
    formData.append("number", trsAmount);  // Content URL

    // Append image
    formData.append("image", {
      uri: image,  // Image URI
      name: "image.png",  // Image name
      type: "image/png",  // Image type
    });

    // Append each file in the files array
    files.forEach((file, index) => {
      formData.append(`files`, {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || 'application/octet-stream', // Set default mimeType if missing
      });
    });

    try {
      const response = await axios.post(
        `${create}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response.status === 200) {
        setSuccessModalVisible(true);  // Show success modal
      } else {
        throw new Error("Failed to create TRS");
      }
    } catch (error) {
      console.log("🚀 ~ handleSignature ~ error:", error.response.data)
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      {/* Header with Edit button */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Review TRS</Text>
        <TouchableOpacity onPress={handleEditTRS}>
          <Text className="text-gray-600 text-lg">Edit TRS</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <ScrollView>
        <View className="bg-gray-100 p-4 rounded-lg mb-4">
          <Text className="text-lg font-semibold mb-2 text-gray-400">
            Title
          </Text>
          <Text className="text-black text-base">{title}</Text>

          {/* Short Description */}
          <Text className="text-lg font-semibold mb-2 text-gray-400 mt-5">
            Short Description
          </Text>
          <Text className="text-black text-base">{description}</Text>

          {/* TRS Amount */}
          <Text className="text-lg font-semibold mb-2 text-gray-400 mt-5">
            TRS Amount
          </Text>
          <Text className="text-black text-base">{trsAmount}</Text>

          {/* Content (Image) */}
          <Text className="text-lg font-semibold mb-2 text-gray-400 mt-5">
            Content
          </Text>
          <View className="flex-row items-center bg-gray-100 p-2 rounded-lg">
            <Image
              source={{ uri: image }}
              className="w-16 h-16 rounded-md mr-4"
            />
            <Text>woman portrait.jpg</Text>
            <Text className="text-gray-500 ml-auto">500kb</Text>
          </View>

          {/* Files Review */}
          {files && files.length > 0 && (
            <View className="mt-5">
              <Text className="text-lg font-semibold mb-2 text-gray-400">
                Attached Files
              </Text>
              {files.map((file, index) => (
                <View
                  key={index}
                  className="flex-row items-center bg-gray-100 p-2 rounded-lg mb-2"
                >
                  <Text className="flex-1 text-black">{file.name}</Text>
                  <Text className="text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View className="mt-8">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text className="text-xs text-center mb-4">
            By submitting this TRS, you agree to the{" "}
            <Text className="text-pink-500">TRS Contract by Whiplano</Text>
          </Text>
        </TouchableOpacity>

        {/* Show loading spinner while API call is in progress */}
        {loading ? (
          <ActivityIndicator size="large" color="#8A2BE2" />
        ) : (
          <GradientButton onPress={() => setModalVisible(true)} text="Submit TRS" />
        )}
      </View>

      <TermConditionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleSignature}
      />

      <SuccessFlowModal
        modalVisible={successModalVisible}
        setModalVisible={setSuccessModalVisible}
        text="TRS added to Created"
      />
    </SafeAreaView>
  );
};

export default ReviewTRSScreen;
