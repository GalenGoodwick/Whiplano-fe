// screens/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CustomTextInput from "../components/common/customTextInput";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigate = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 justify-center px-5 bg-gray-100">
      <Text className="text-2xl font-bold text-center text-gray-800 mb-8">
        Welcome Back
      </Text>

      <CustomTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      <CustomTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <TouchableOpacity className="h-12 bg-blue-600 rounded-lg justify-center items-center mb-5" onPress={() => navigate.navigate("Landing")} >
        <Text className="text-white text-lg font-semibold">Login</Text>
      </TouchableOpacity>

      <Text className="text-center text-gray-500 mb-5">OR</Text>

      <TouchableOpacity className="flex-row bg-gray-800 h-12 rounded-lg justify-center items-center mb-5">
        <FontAwesome name="google" size={24} color="white" />
        <Text className="text-white text-lg ml-3">Login with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row bg-gray-800 h-12 rounded-lg justify-center items-center">
        <FontAwesome name="apple" size={24} color="white" />
        <Text className="text-white text-lg ml-3">Login with Apple</Text>
      </TouchableOpacity>

      <Text className="text-center text-gray-500 mt-6">
        Don't have an account?{" "}
        <Text className="text-blue-600 font-semibold" role="button" onPress={() => navigate.navigate("Signup")}>Sign up</Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
