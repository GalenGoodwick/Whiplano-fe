import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";

const GradientButton = ({ onPress, text, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <LinearGradient
        colors={disabled ? ['#D3D3D3', '#A9A9A9'] : ['#8A2BE2', '#FF1493']} // Light colors when disabled
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className={`rounded-lg py-4 w-full mt-3`}
      >
        <Text className={`text-center ${disabled ? 'text-gray-400' : 'text-white'} font-semibold`}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
