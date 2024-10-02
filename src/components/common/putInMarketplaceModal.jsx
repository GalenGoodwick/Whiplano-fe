import { Modal, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import GradientButton from "./gradientBtn";
import { useState } from "react";


const PutOnMarketplaceModal = ({ modalVisible, setModalVisible, handleClick }) => {

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

          {/* Modal Content */}
          <Text className={`text-xl font-semibold mb-4`}>
            Sell "The life’s work of a Gay Nobody" TRS
          </Text>

          {/* Price Input */}
          <View className={`mb-4`}>
            <View className={`flex-row gap-2 items-center`}>
              <Text className={`text-sm text-gray-600`}>Price</Text>
              <Svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M7.99967 15.1666C11.6663 15.1666 14.6663 12.1666 14.6663 8.49992C14.6663 4.83325 11.6663 1.83325 7.99967 1.83325C4.33301 1.83325 1.33301 4.83325 1.33301 8.49992C1.33301 12.1666 4.33301 15.1666 7.99967 15.1666Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  opacity="0.34"
                  d="M8 5.83325V9.16659"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  opacity="0.34"
                  d="M7.99609 11.1667H8.00208"
                  stroke="#292D32"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View>
            <TextInput
              className={`border border-gray-300 rounded-lg px-3 py-2 mt-2`}
              placeholder="$1"
            />
          </View>

          {/* TRS Amount Input */}
          <View className={`mb-4`}>
            <View className={`flex-row gap-2 items-center`}>
              <Text className={`text-sm text-gray-600`}>TRS Amount</Text>
              <Svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M7.99967 15.1666C11.6663 15.1666 14.6663 12.1666 14.6663 8.49992C14.6663 4.83325 11.6663 1.83325 7.99967 1.83325C4.33301 1.83325 1.33301 4.83325 1.33301 8.49992C1.33301 12.1666 4.33301 15.1666 7.99967 15.1666Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  opacity="0.34"
                  d="M8 5.83325V9.16659"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  opacity="0.34"
                  d="M7.99609 11.1667H8.00208"
                  stroke="#292D32"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View>
            <TextInput
              className={`border border-gray-300 rounded-lg px-3 py-2 mt-2`}
              placeholder="Enter Trs Amount"
            />
          </View>

          {/* Restrict Sales to User Toggle */}
          <View className={`flex-row items-center justify-between mb-4`}>
            <Text className={`text-sm text-black font-bold`}>
              Restrict sales to user
            </Text>
            <Switch
              value={isRestricted}
              onValueChange={(value) => setIsRestricted(value)}
              thumbColor={isRestricted ? "#f472b6" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#f472b6" }}
            />
          </View>

          {/* Submit Button */}
          <GradientButton text="Put it on marketplace" onPress={handleClick}/>
        </View>
      </View>
    </Modal>
  );
};


export default PutOnMarketplaceModal;