import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showErrorToast } from '../utils/toastHelper';
import { logoutUser } from '../redux/slices/authSlice';
import GradientButton from "../components/common/gradientBtn";
import { Path, Svg } from 'react-native-svg';
import OrbNavigation from '../components/OrbNavigation';

const AccountScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const {data} = await axios.get('https://whiplano-1b8102db6480.herokuapp.com/users/me');
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        showErrorToast("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Perform logout logic here
    dispatch(logoutUser());
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7371d8" />
        <Text className="text-gray-500 mt-4">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      {/* Profile Section */}
      <View className="flex-1 justify-center items-center">
        {/* User Avatar */}
        <TouchableOpacity>
          <View className="bg-gray-200 w-24 h-24 rounded-full justify-center items-center mb-4">
            <Text className="text-gray-500">Upload Avatar</Text>
          </View>
        </TouchableOpacity>

        {/* Username and Edit */}
        <Text className="text-lg font-bold mb-2">{userData?.username || 'Username'}</Text>
        <TouchableOpacity>
          <Text className="text-blue-500 text-sm mb-4">Edit</Text>
        </TouchableOpacity>

        {/* PayPal & Security */}
        <View className="flex-row justify-between w-full px-6 mb-4">
          <View className="flex-1 bg-white shadow rounded-lg p-4 mr-2 items-center">
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png' }} // PayPal logo
              style={{ width: 60, height: 30 }}
            />
            <Text className="text-green-500 mt-2">Connected</Text>
          </View>

          <View className="flex-1 bg-white shadow rounded-lg p-4 ml-2 items-center">
            <Svg width={30} height={30} viewBox="0 0 24 24">
              <Path
                d="M12 2C6.477 2 2 6.477 2 12c0 3.338 1.637 6.291 4.192 8.105l-.283-.793A2.72 2.72 0 015 17.27v-1.018c0-.83.675-1.505 1.505-1.505h4.99c.83 0 1.505.675 1.505 1.505v1.018a2.72 2.72 0 01-1.09 2.042l-.283.793C16.363 18.291 18 15.338 18 12c0-5.523-4.477-10-10-10zm.827 15H9.173a.827.827 0 100 1.654h3.654a.827.827 0 100-1.654z"
                fill="#ff0033"
              />
            </Svg>
            <Text className="text-black mt-2">Security</Text>
          </View>
        </View>

        {/* Settings Section */}
        <View className="w-full px-6 mt-6">
          <TouchableOpacity className="bg-gray-200 rounded-full py-3 px-6">
            <Text className="text-center text-gray-600">Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View className="w-full px-6 mt-6">
          <GradientButton text="Logout" onPress={handleLogout} />
        </View>
      </View>

      <OrbNavigation />
    </SafeAreaView>
  );
};

export default AccountScreen;
