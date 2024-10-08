import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GradientButton from "./gradientBtn";
import CopyLinkComponent from "./copyLinkComponent";
import { useNavigation } from "@react-navigation/native"; // To navigate

const SuccessFlowModal = ({ modalVisible, setModalVisible, text, actionType = "" }) => {
  const navigation = useNavigation();

  const handleExploreMarketplace = () => {
    setModalVisible(false);  // Close the modal
    const navigationationUrl = actionType === "marketplace" ? "TrsMarket" : "Wallet";
    navigation.replace(navigationationUrl);  // Use replace to navigate to marketplace and remove the previous steps from the stack
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0, 0, 0, 0.2)", // Transparent white background
          zIndex: 998, // Keep it below the pepper icon but above the content
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 30,
            zIndex: 999, // Keep it below the pepper icon
          }}
        >
          <View className={`flex-row justify-center mb-4`}>
            <Image
              source={{ uri: "https://i.ibb.co/SnV2DBv/success-Tick.png" }}
              className={`w-16 h-16`}
            />
          </View>

          {/* Modal Content */}
          <Text className={`text-xl font-semibold text-center mb-4`}>
            {text}
          </Text>

          {
            actionType === "marketplace" && ( 
              <CopyLinkComponent />
            )
          }

          <View className={`flex-row justify-center mt-9`}>
            <TouchableOpacity onPress={handleExploreMarketplace}>
              <Text className={`text-black font-bold`}>
                {actionType === "marketplace" ? "Explore Marketplace" : "Explore Artisan"} 
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessFlowModal;
