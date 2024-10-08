import { Image, Modal, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import GradientButton from "./gradientBtn";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "react-native-heroicons/outline";

const BuyTrsModal = ({ modalVisible, setModalVisible, handleClick, data }) => {
  console.log("🚀 ~ BuyTrsModal ~ data:", data)
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
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Slightly darker background
          zIndex: 998,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 30,
            zIndex: 999,
          }}
        >
          {/* Close Button */}
          <View className={`flex-row justify-end`}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text className={`text-gray-500 text-lg`}>X</Text>
            </TouchableOpacity>
          </View>
        <View>
        <Image
            source={{ uri: data?.image || "https://i.ibb.co/tLB8RGL/Image-4.png" }}
            className="w-full h-40 rounded-lg mb-4"
            resizeMode="cover"
          />
        </View>
          {/* Modal Content */}
          <Text className={`text-2xl font-bold mb-4 text-center`}>
            {data?.collection_name}
          </Text>

          <View className="flex-row justify-between items-center mb-4">

            <View className="flex-row items-center">
              <Text className="text-lg font-semibold">Price:</Text>
              <Text className="ml-2 text-lg font-semibold text-orange-500">{data?.bid_price}</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <PlusIcon size={20} color="black" />
              <Text className="ml-2 text-lg font-semibold">{1}</Text>
              <MinusIcon size={20} color="black" />
            </View>

          </View>

          {/* Submit Button */}
          <GradientButton text="Buy now" onPress={handleClick} />
        </View>
      </View>
    </Modal>
  );
};

export default BuyTrsModal;