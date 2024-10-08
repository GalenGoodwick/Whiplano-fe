import {
  Modal,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert, // for alerting users
} from "react-native";
import { useState } from "react";
import GradientButton from "./gradientBtn";

const PutOnMarketplaceModal = ({
  modalVisible,
  setModalVisible,
  handleClick,
  data,
  actionType,
}) => {
  const [price, setPrice] = useState("");
  const [trsAmount, setTrsAmount] = useState("");
  const [isRestricted, setIsRestricted] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async () => {
    // Validate fields
    if (trsAmount === "" || (actionType === "marketplace" && price === "")) {
      Alert.alert("Error", "Please fill all required fields with valid numbers.");
      return;
    }

    setLoading(true); // Set loading to true when API call starts

    const payload = {
      collection_name: data?.id,
      number: trsAmount,
      ...(actionType === "marketplace" && { price }), // Include price only for marketplace
    };

    try {
      await handleClick(payload); // Pass the data to the API handler
    } catch (err) {
      console.error("Error while handling action:", err);
    } finally {
      setLoading(false); // Set loading to false when API call ends
      setModalVisible(false); // Close the modal
    }
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
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 30,
          }}
        >
          {/* Close Button */}
          <View className="flex-row justify-end">
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              disabled={loading} // Disable button while loading
            >
              <Text className="text-gray-500 text-lg">X</Text>
            </TouchableOpacity>
          </View>

          {/* Modal Title */}
          <Text className="text-xl font-semibold mb-4">
            {actionType === "marketplace"
              ? "Sell TRS on Marketplace"
              : "Activate Artisan Rights"}
          </Text>

          {/* TRS Amount Input */}
          <View className="mb-4">
            <View className="flex-row gap-2 items-center">
              <Text className="text-sm text-gray-600">TRS Amount</Text>
            </View>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 mt-2"
              placeholder="Enter TRS Amount"
              value={trsAmount}
              onChangeText={(value) => {
                if (!isNaN(value)) setTrsAmount(value); // Ensure only numeric input
              }}
               // Allow only numbers in the input
              editable={!loading} // Disable input while loading
            />
          </View>

          {/* Show Price Input Only for Marketplace */}
          {actionType === "marketplace" && (
            <View className="mb-4">
              <View className="flex-row gap-2 items-center">
                <Text className="text-sm text-gray-600">Price</Text>
              </View>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2 mt-2"
                placeholder="$1"
                value={price}
                onChangeText={(value) => {
                  if (!isNaN(value)) setPrice(value); // Ensure only numeric input
                }}
                 // Allow only numbers in the input
                editable={!loading} // Disable input while loading
              />
            </View>
          )}

          {/* Restrict Sales to User Toggle */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-sm text-black font-bold">
              Restrict sales to user
            </Text>
            <Switch
              value={isRestricted}
              onValueChange={(value) => setIsRestricted(value)}
              disabled={loading} // Disable switch while loading
              thumbColor={isRestricted ? "#f472b6" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#f472b6" }}
            />
          </View>

          {/* Submit Button */}
          <GradientButton
            text={
              actionType === "marketplace"
                ? "Put it on Marketplace"
                : "Activate Artisan Rights"
            }
            onPress={handleSubmit}
            disabled={loading} // Disable button while loading
          />

          {/* Loading Indicator */}
          {loading && (
            <View className="mt-4 flex-row justify-center">
              <ActivityIndicator size="large" color="#7371d8" />
              <Text className="text-center text-gray-500 ml-2">
                Processing...
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default PutOnMarketplaceModal;
