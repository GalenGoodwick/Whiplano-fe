import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Clipboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icon for clipboard (you need to install react-native-vector-icons)

const CopyLinkComponent = () => {
  const [url] = useState('https://whiplano.com/the...');
  
  const copyToClipboard = () => {
    Clipboard.setString(url);
    Alert.alert("Copied", "The link has been copied to your clipboard.");
  };

  return (
    <View className = {`flex-row items-center border border-gray-300 rounded-lg p-3`}>
      {/* URL Text */}
      <TextInput
        className = {`flex-1 text-gray-700`}
        value={url}
        editable={false} // Make it non-editable
      />

      {/* Copy Button */}
      <TouchableOpacity
        className = {`flex-row items-center border border-gray-300 rounded-lg px-2 py-1 ml-2`}
        onPress={copyToClipboard}
      >
        <Icon name="copy-outline" size={16} color="#4A5568" className = {`mr-1`} />
        <Text className = {`text-gray-700`}>Copy link</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CopyLinkComponent;
