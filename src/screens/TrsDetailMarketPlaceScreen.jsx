import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Switch,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import GradientButton from "../components/common/gradientBtn";
import { useRoute } from "@react-navigation/native";
import UnderReviewButton from "../components/common/underReviewButton";
import PutOnMarketplaceModal from "../components/common/putInMarketplaceModal";
import SuccessFlowModal from "../components/common/successFlowModal";
import BuyTrsModal from "../components/common/buyTrsModal";
import OrbNavigation from "../components/OrbNavigation";

const { width, height } = Dimensions.get("window");

const TrsDetailMarketPlaceScreen = () => {
  const route = useRoute();
  const { item } = route.params; // Access the passed item
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const trsData = item?.collection_data[0]

  const handlePutInMarketplace = () => {
    setModalVisible(false);
    setSuccessModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      {/* Header Image */}
      <ScrollView>
        {/* Book Image */}
        <View className="mt-4">
          <Image
            source={{ uri: trsData?.image_uri || "https://i.ibb.co/JCn006m/Mask-group.png" }} // Replace with actual image
            className={`w-full h-48 rounded-lg`}
          />
        </View>

        {/* Book Details */}
        <View className="mt-4">
            <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-xs text-gray-500">Own 2 TRS</Text>
            <Text className="text-sm text-orange-500">{`$ ${item?.bid_price}`}</Text>
          </View>
          <Text className="text-2xl font-bold mt-3">{item?.collection_name}</Text>
        </View>

        {/* Description */}
        <View className="mt-4">
          <Text className="text-gray-600 text-sm">{trsData?.description}</Text>
        </View>

        {/* Author Section */}
        <View className="mt-4">
          <Text className="font-semibold text-black text-2xl">
            {trsData?.creator}
          </Text>
        </View>

        {/* Purchase Info */}
        <View className="mt-4">
          <Text className="text-gray-500 mt-2">Date</Text>
          <Text className="font-semibold">12-04-2024</Text>

          <Text className="text-gray-500 mt-2">TRS Amount</Text>
          <Text className="font-semibold">{item?.number_of_trs}</Text>
        </View>

        {/* Buttons */}
        <View className="mt-6 space-y-4">
          <TouchableOpacity className="bg-white border border-pink-500 rounded-lg py-3">
            <Text className="text-center text-pink-500 font-semibold">
              View full content details
            </Text>
          </TouchableOpacity>

          <GradientButton
            text="Buy Now"
            onPress={() => {
              setModalVisible(true);
            }}
          />

        </View>
      </ScrollView>

      <BuyTrsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handlePutInMarketplace}
        data={item}
      />

      <SuccessFlowModal
        modalVisible={successModalVisible}
        setModalVisible={setSuccessModalVisible}
        text="TRS added to marketplace successfully"
      />
    </SafeAreaView>
  );
};

export default TrsDetailMarketPlaceScreen;
