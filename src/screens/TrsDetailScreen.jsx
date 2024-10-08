import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientButton from "../components/common/gradientBtn";
import { useRoute } from "@react-navigation/native";
import PutOnMarketplaceModal from "../components/common/putInMarketplaceModal";
import SuccessFlowModal from "../components/common/successFlowModal";
import axios from "axios";
import RemoveFromMarketplaceModal from "../components/common/removeMpModal";

const { width, height } = Dimensions.get("window");

const TrsDetailScreen = () => {
  const route = useRoute();
  const { item } = route.params; // Access the passed item
  const [putOnMarketplaceModalVisible, setPutOnMarketplaceModalVisible] = useState(false); // Separate state for Put on Marketplace modal
  const [removeFromMarketplaceModalVisible, setRemoveFromMarketplaceModalVisible] = useState(false); // Separate state for Remove from Marketplace modal
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState("marketplace");
  const dataOfTrs = item?.data[0];
  const dataOfuserTrs = item;
  console.log("🚀 ~ TrsDetailScreen ~ dataOfuserTrs:", dataOfuserTrs);

  const handleMarketplaceAction = async (data, actionType) => {
    try {
      const { collection_name, number, price } = data;

      let url;
      if (actionType === "marketplace") {
        url = `https://whiplano-1b8102db6480.herokuapp.com/marketplace/place?collection_name=${collection_name}&number=${number}&price=${price}`;
      } else if (actionType === "removeMarketplace") {
        url = `https://whiplano-1b8102db6480.herokuapp.com/marketplace/remove?collection_name=${collection_name}&number=${number}`;
      } else if (actionType === "artisan") {
        url = `https://whiplano-1b8102db6480.herokuapp.com/artisan/activate?collection_name=${collection_name}&number=${number}`;
      } else if (actionType === "removeArtisan") {
        url = `https://whiplano-1b8102db6480.herokuapp.com/artisan/deactivate?collection_name=${collection_name}&number=${number}`;
      }

      console.log("🚀 ~ handleMarketplaceAction ~ url:", url);
      const response = await axios.post(url);
      setSuccessModalVisible(true); // Show success modal after successful API call
      console.log(`Successfully posted to ${actionType}:`, response.data);
    } catch (error) {
      console.log("🚀 ~ handleMarketplaceAction ~ error:", error.response.data);
      console.error(`Error posting to ${actionType}:`, error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      {/* Header Image */}
      <ScrollView>
        <View className="mt-4">
          <Image
            source={{
              uri:
                dataOfTrs?.image_uri ||
                "https://i.ibb.co/JCn006m/Mask-group.png",
            }}
            className="w-full h-48 rounded-lg"
          />
        </View>

        {/* Book Details */}
        <View className="mt-4">
          <Text className="text-xs text-gray-500">Own 2 TRS</Text>
          <Text className="text-2xl font-bold mt-3">{item?.id}</Text>
        </View>

        {/* Description */}
        <View className="mt-4">
          <Text className="text-gray-600 text-sm">
            {dataOfTrs?.description}
          </Text>
        </View>

             {/* Author Section */}
        <View className="mt-4">
          <Text className="font-semibold text-black text-2xl">
            {dataOfTrs?.creator}
          </Text>
        </View>


        {/* Purchase Info */}
        <View className="mt-4">
          <Text className="text-gray-500">Bought at</Text>
          <Text className="font-semibold">$420</Text>

          <Text className="text-gray-500 mt-2">Date</Text>
          <Text className="font-semibold">12-04-2024</Text>

          <Text className="text-gray-500 mt-2">TRS Amount</Text>
          <Text className="font-semibold">{dataOfTrs?.number}</Text>
        </View>

        {/* Buttons */}
        <View className="mt-5 space-y-4">
          <TouchableOpacity className="bg-white border border-pink-500 rounded-lg py-3">
            <Text className="text-center text-pink-500 font-semibold">
              View full content details
            </Text>
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View className="mt-2 space-y-4">
          {dataOfuserTrs.marketplace > 0 ? (
            <GradientButton
              text="Remove from Marketplace"
              onPress={() => {
                setSelectedAction("removeMarketplace");
                setRemoveFromMarketplaceModalVisible(true); // Open Remove Marketplace modal
              }}
            />
          ) : (
            <GradientButton
              text="Sell Rights"
              onPress={() => {
                setSelectedAction("marketplace");
                setPutOnMarketplaceModalVisible(true); // Open Put on Marketplace modal
              }}
            />
          )}

          {dataOfuserTrs.artisan > 0 ? (
            <TouchableOpacity
              className="bg-[#7371d8] rounded-lg py-3"
              onPress={() => {
                setSelectedAction("removeArtisan");
                setRemoveFromMarketplaceModalVisible(true); // Open Remove Artisan modal
              }}
            >
              <Text className="text-center text-white">Deactivate Artisan</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-[#7371d8] rounded-lg py-3"
              onPress={() => {
                setSelectedAction("artisan");
                setPutOnMarketplaceModalVisible(true); // Open Activate Artisan modal
              }}
            >
              <Text className="text-center text-white">Activate Artisan</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <PutOnMarketplaceModal
        modalVisible={putOnMarketplaceModalVisible} // Separate state for Put on Marketplace modal
        setModalVisible={setPutOnMarketplaceModalVisible} // Update state
        handleClick={(data) => handleMarketplaceAction(data, selectedAction)}
        data={dataOfuserTrs}
        actionType={selectedAction}
      />

      <RemoveFromMarketplaceModal
        modalVisible={removeFromMarketplaceModalVisible} // Separate state for Remove from Marketplace modal
        setModalVisible={setRemoveFromMarketplaceModalVisible} // Update state
        handleClick={(data) => handleMarketplaceAction(data, selectedAction)}
        data={dataOfuserTrs}
        actionType={selectedAction}
      />

      <SuccessFlowModal
        modalVisible={successModalVisible}
        setModalVisible={setSuccessModalVisible}
        text={
          selectedAction === "marketplace"
            ? "Successfully Put on marketplace"
            : selectedAction === "removeMarketplace"
            ? "Successfully Removed from marketplace"
            : selectedAction === "artisan"
            ? "Successfully Activated Artisan Rights"
            : "Successfully Deactivated Artisan Rights"
        }
      />
    </SafeAreaView>
  );
};

export default TrsDetailScreen;
