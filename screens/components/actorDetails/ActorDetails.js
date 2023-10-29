import { View, Text } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ActorDetails({ data }) {
  return (
    <>
      <Animated.View
        entering={FadeInDown.delay(100).duration(700).springify()}
        className="mt-6"
      >
        <Text className="text-white text-3xl font-bold text-center">
          {data.name}
        </Text>
        <Text className="text-neutral-500 text-base text-center">
          {data.place_of_birth}
        </Text>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(200).duration(700).springify()}
        className="mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full"
      >
        <View className={`px-2 items-center border-r-2 border-r-neutral-400 `}>
          <Text className="text-white font-semibold">Gender</Text>
          <Text className=" text-neutral-300 text-sm">
            {data.gender === 1 ? "Female" : "Male"}
          </Text>
        </View>
        <View className={`px-2 items-center border-r-2 border-r-neutral-400`}>
          <Text className="text-white font-semibold">Birthday</Text>
          <Text className=" text-neutral-300 text-sm">{data.birthday}</Text>
        </View>
        <View className={`px-2 items-center border-r-2 border-r-neutral-400 `}>
          <Text className="text-white font-semibold">Know For</Text>
          <Text className=" text-neutral-300 text-sm">
            {data.known_for_department}
          </Text>
        </View>
        <View className={`px-2 items-center `}>
          <Text className="text-white font-semibold">Popularity</Text>
          <Text className=" text-neutral-300 text-sm">{data.popularity.toFixed(2)}%</Text>
        </View>
      </Animated.View>
      <Animated.View
        className="my-6 mx-4 space-y-2"
        entering={FadeInDown.delay(300).duration(700).springify()}
      >
        <Text className="text-white text-lg">Biography</Text>
        <Text className="text-neutral-400 tracking-wide text-justify">
          {data.biography}
        </Text>
      </Animated.View>
    </>
  );
}
