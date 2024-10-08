import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
  } from "react-native";
  import { useState } from "react";
  import GradientButton from "./gradientBtn";
  
  const RemoveFromMarketplaceModal = ({
    modalVisible,
    setModalVisible,
    handleClick,
    data,
    actionType,
  }) => {
    const [trsAmount, setTrsAmount] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
  
    const handleSubmit = async () => {
      setLoading(true); // Set loading to true when API call starts
  
      const payload = {
        collection_name: data?.id,
        number: trsAmount,
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
              {actionType === "removeMarketplace"
                ? "Remove TRS from Marketplace"
                : "Deactivate Artisan Rights"}
            </Text>
  
            {/* Current TRS Amount Info */}
            <Text className="mb-2 text-sm text-gray-600">
              You currently have {actionType === "removeMarketplace" ? data?.marketplace : data?.artisan} TRS in {actionType === "removeMarketplace" ? "Marketplace" : "Artisan Rights"}.
            </Text>
  
            {/* TRS Amount Input */}
            <View className="mb-4">
              <View className="flex-row gap-2 items-center">
                <Text className="text-sm text-gray-600">TRS Amount to Remove</Text>
              </View>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2 mt-2"
                placeholder="Enter TRS Amount"
                value={trsAmount}
                onChangeText={(value) => setTrsAmount(value)}
                editable={!loading} // Disable input while loading
                keyboardType="numeric"
              />
            </View>
  
            {/* Submit Button */}
            <GradientButton
              text={
                actionType === "removeMarketplace"
                  ? "Remove from Marketplace"
                  : "Deactivate Artisan Rights"
              }
              onPress={handleSubmit}
              disabled={loading || !trsAmount} // Disable button while loading
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
  
  export default RemoveFromMarketplaceModal;
  