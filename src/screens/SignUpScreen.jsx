import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CustomTextInput from "../components/common/customTextInput";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/slices/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { showErrorToast } from "../utils/toastHelper";

const SignupScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading } = useSelector((state) => state.auth);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      showErrorToast("Passwords do not match");
      return;
    }

    const userData = { username, email, password };
    dispatch(signUpUser(userData));
  };

  return (
    <SafeAreaView className="flex-1 justify-center px-5 bg-gray-100">
      <ScrollView>
        <Text className="text-2xl font-bold text-center text-gray-800 mb-8">
          Create an Account
        </Text>

        <CustomTextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
        />
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
        <CustomTextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
        />

        <TouchableOpacity
          className={`h-12 bg-blue-600 rounded-lg justify-center items-center mb-5 ${
            loading ? "opacity-50" : ""
          }`}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-lg font-semibold">Sign Up</Text>
          )}
        </TouchableOpacity>

        <Text className="text-center text-gray-500 mb-5">OR</Text>

        <TouchableOpacity className="flex-row bg-gray-800 h-12 rounded-lg justify-center items-center mb-5">
          <FontAwesome name="google" size={24} color="white" />
          <Text className="text-white text-lg ml-3">Sign Up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row bg-gray-800 h-12 rounded-lg justify-center items-center">
          <FontAwesome name="apple" size={24} color="white" />
          <Text className="text-white text-lg ml-3">Sign Up with Apple</Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Text
            className="text-blue-600 font-semibold"
            role="button"
            onPress={() => navigation.replace("Login")}
          >
            Login
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
