import {
    Image,
  Modal,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Circle, Path, Svg } from "react-native-svg";
import GradientButton from "./gradientBtn";
import { useState } from "react";
import CopyLinkComponent from "./copyLinkComponent";

const SuccessFlowModal = ({ modalVisible, setModalVisible, text }) => {
  const [isRestricted, setIsRestricted] = useState(false);

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
          {/* Close Button */}
          <View className={`flex-row justify-end`}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text className={`text-gray-500 text-lg`}>X</Text>
            </TouchableOpacity>
          </View>

          <View className={`flex-row justify-center mb-4`}>
            <Image source={{ uri: "https://i.ibb.co/SnV2DBv/success-Tick.png" }} className={`w-16 h-16`} />
          </View>

          {/* Modal Content */}
          <Text className={`text-xl font-semibold text-center mb-4`}>
            {text}
          </Text>

          <CopyLinkComponent />

          <View className={`flex-row justify-center mt-9`}>
            <TouchableOpacity>
                <Text className={`text-black font-bold`}>Explore more Marketplace</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessFlowModal;
