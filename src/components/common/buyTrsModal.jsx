import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import GradientButton from "./gradientBtn";
import { MinusIcon, PlusIcon } from "react-native-heroicons/outline";
import * as WebBrowser from 'expo-web-browser'; // Import the WebBrowser module
import { showErrorToast } from "../../utils/toastHelper";

const BuyTrsModal = ({ modalVisible, setModalVisible, data }) => {
  const [trsAmount, setTrsAmount] = useState(1); // Start with 1 TRS
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const trsData = data?.collection_data[0];

  const handleBuyNow = async () => {
    if (trsAmount <= 0) {
      alert("Please select at least 1 TRS.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://whiplano-1b8102db6480.herokuapp.com/trade/create",
        {
          collection_name: data.collection_name,
          number: trsAmount, // TRS amount selected by the user
          cost: data.bid_price * trsAmount, // Calculate total cost
        }
      );

      const { approval_url } = response.data;
      if (approval_url) {
        // Open the PayPal approval URL in the system browser
        const result = await WebBrowser.openBrowserAsync(approval_url);

        // Once the user returns from PayPal, you may want to handle the result
        console.log("hello" + result);

        if (result.type === "success" && result.url) {
          // Handle further if PayPal returns with a paymentId and PayerID in the URL
          handlePaymentCompletion(result.url);
        }
      }
    } catch (error) {
      console.error("Payment creation error:", error.response.data);
      showErrorToast(error.response.data?.detail)
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handlePaymentCompletion = async (url) => {
    const paymentId = url.match(/paymentId=([^&]+)/)[1];
    const payerId = url.match(/PayerID=([^&]+)/)[1];

    try {
      const response = await axios.post(
        "https://whiplano-1b8102db6480.herokuapp.com/trade/execute_payment",
        {
          paymentId,
          payerId,
        }
      );

      const result = response.data;
      if (result.success) {
        alert("Payment successful!");
        setModalVisible(false);
      } else {
        alert("Payment failed!");
      }
    } catch (error) {
      console.error("Payment execution error:", error);
      alert("An error occurred while executing the payment.");
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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{ textAlign: "right", fontSize: 18 }}>X</Text>
          </TouchableOpacity>

          {/* Product Details */}
          <Image
            source={{ uri: trsData?.image_uri || "https://i.ibb.co/tLB8RGL/Image-4.png" }}
            style={{ width: "100%", height: 200, borderRadius: 10, marginBottom: 20 }}
          />
          <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>
            {data?.collection_name}
          </Text>

          {/* Price and Quantity Section */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18 }}>Price:</Text>
              <Text style={{ fontSize: 18, color: "orange", marginLeft: 10 }}>
                ${data?.bid_price * trsAmount}
              </Text>
            </View>

            {/* TRS Amount Selection */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => setTrsAmount(prev => Math.max(prev - 1, 1))} // Prevent negative or zero
                style={{ padding: 10 }}
              >
                <MinusIcon size={20} color="black" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, marginHorizontal: 10 }}>{trsAmount}</Text>
              <TouchableOpacity
                onPress={() => setTrsAmount(prev => prev + 1)} // Increase TRS amount
                style={{ padding: 10 }}
              >
                <PlusIcon size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Buy Now Button */}
          <GradientButton text="Buy Now" onPress={handleBuyNow} disabled={isLoading} />

          {/* Loading Indicator */}
          {isLoading && <Text style={{ textAlign: "center", marginTop: 10 }}>Processing...</Text>}
        </View>
      </View>
    </Modal>
  );
};

export default BuyTrsModal;
