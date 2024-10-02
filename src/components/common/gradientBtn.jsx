import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";

const GradientButton = ({ onPress, text }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={['#8A2BE2', '#FF1493']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className={`rounded-lg py-4 w-full mt-3`}
        >
          <Text className={`text-center text-white font-semibold`}>
            {text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  export default GradientButton;