import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { BlurView } from "expo-blur";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function MovieCard({
  item,
  index,
  animationValue,
  handleClick,
}) {
  const maskStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationValue.value, [-1, 0, 1], [1, 0, 1]);

    return {
      opacity,
    };
  }, [animationValue]);

  return (
    <TouchableOpacity
      className="overflow-hidden justify-center items-center"
      onPress={handleClick}
    >
      <Animated.Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={{ height: hp(45), width: hp(45) }}
        className="rounded-3xl object-contain"
        sharedTransitionTag={item.poster_path}
      />
      <AnimatedBlurView
        intensity={50}
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, maskStyle]}
      />
    </TouchableOpacity>
  );
}
