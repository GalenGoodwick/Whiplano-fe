import {
  Image,
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import GradientButton from "./gradientBtn";
import CopyLinkComponent from "./copyLinkComponent";

const TermConditionModal = ({ modalVisible, setModalVisible, handleClick }) => {
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
          <View className={`flex-row justify-end`}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text className={`text-gray-500 text-lg`}>X</Text>
            </TouchableOpacity>
          </View>

          {/* Modal Content */}
          <Text className={`text-xl font-semibold mb-4`}>
            Whiplano TRS Contract
          </Text>
          <ScrollView className = "h-75">
          <Text className={`text-sm mb-4`}>
            A strategic technology partnership allows companies to share
            intellectual property (IP), leverage complementary technological
            innovations, save on R&D costs, and accelerate time-to-market. One
            firm provides hardware, software, a platform, or other tech; the
            other provides a channel to market, manufacturing capabilities,
            capital, or subject matter expertise.
          </Text>
          <Text className={`text-sm mb-4`}>
            For instance, a digital health startup might partner with a wearable
            technology company to integrate advanced heart rate tracking into a
            new medical app for remote patient monitoring. The startup builds
            the software while the wearables firm supplies the devices
          </Text>
          <Text className={`text-sm mb-4`}>
            A strategic technology partnership allows companies to share
            intellectual property (IP), leverage complementary technological
            innovations, save on R&D costs, and accelerate time-to-market. One
            firm provides hardware, software, a platform, or other tech; the
            other provides a channel to market, manufacturing capabilities,
            capital, or subject mat
          </Text>
          </ScrollView>
          <GradientButton text="Sign Contract" onPress={() => handleClick()} />
        </View>
      </View>
    </Modal>
  );
};

export default TermConditionModal;
