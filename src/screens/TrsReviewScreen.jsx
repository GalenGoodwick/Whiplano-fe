import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "../components/common/gradientBtn";
import TermConditionModal from "../components/common/termConditionModal";
import SuccessFlowModal from "../components/common/successFlowModal";

const ReviewTRSScreen = ({ route }) => {
  const { title, description, price, trsAmount, contentUrl, image } =
    route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleEditTRS = () => {
    // Navigate back to the CreateTRSScreen with the current data
    navigation.navigate("CreateTrs", {
      title,
      description,
      price,
      trsAmount,
      contentUrl,
      image,
    });
  };

  const handleSignature = () => {
    setModalVisible(false);
    setSuccessModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <ScrollView>
        {/* Header with Edit button */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold">Review TRS</Text>
          <TouchableOpacity onPress={handleEditTRS}>
            <Text className="text-gray-600 text-lg">Edit TRS</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
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

          {/* Price */}

          <Text className="text-lg font-semibold mb-2 text-gray-400 mt-5">
            Price
          </Text>
          <Text className="text-red-500 text-xl">${price}</Text>

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
        </View>

        {/* Submit Button */}
        <View className="mt-8">
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text className="text-xs text-center mb-4">
              By submitting this TRS, you agree to the{" "}
              <Text className="text-pink-500">TRS Contract by Whiplano</Text>
            </Text>
          </TouchableOpacity>
          <GradientButton onPress={() => {}} text="Submit TRS" />
        </View>
      </ScrollView>

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
