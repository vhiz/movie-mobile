import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
export default function MovieDesc({ data }) {
  return (
    <Animated.View style={{ marginTop: -hp("9%") }} className="space-y-3">
      <Animated.Text
        className="text-white text-center text-3xl font-bold tracking-wider"
        style={{ textTransform: "capitalize" }}
        entering={FadeInDown.duration(700).springify()}
      >
        {data.title}
      </Animated.Text>
      <Animated.Text
        entering={FadeInDown.duration(700).delay(100).springify()}
        className="text-neutral-400 font-semibold text-base text-center"
      >
        Released - {data.release_date.slice(0, 4)} - {data.runtime} min
      </Animated.Text>
      <Animated.View
        entering={FadeInDown.duration(700).delay(200).springify()}
        className="flex-row justify-center mx-4 space-x-2"
      >
        {data.genres.map((item, i) => {
          const index = data.genres.length - 1;

          return (
            <Text
              key={i}
              className="text-neutral-400 font-semibold text-base text-center"
            >
              {item.name}
              {i === index ? null : <Text className="opacity-0"> -</Text>}
            </Text>
          );
        })}
      </Animated.View>
      <Animated.Text
        entering={FadeInDown.duration(700).delay(300).springify()}
        className="text-neutral-400 mx-4 tracking-wide text-justify"
      >
        {data.overview}
      </Animated.Text>
    </Animated.View>
  );
}
