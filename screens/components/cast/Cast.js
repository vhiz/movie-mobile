import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Cast({ cast }) {
  const name = "Vin Dinseel";
  const navigate = useNavigation();

  return (
    <Animated.View
      entering={FadeInDown.duration(700).delay(400).springify()}
      className="my-6"
    >
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast.map((item, i) => (
          <TouchableOpacity
            key={i}
            className="mr-4 items-center"
            onPress={() => navigate.navigate("Actor", item)}
          >
            <Image
              className="rounded-full h-20 w-20"
              source={{
                uri: item.profile_path
                  ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                  : "https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg",
              }}
            />
            <Text className="text-white text-xs mt-1">
              {item.character.length > 10
                ? item.character.slice(0, 10) + "...."
                : item.character}
            </Text>
            <Text className="text-xs mt-1 text-neutral-400">
              {item.name.length > 10
                ? item.name.slice(0, 10) + "...."
                : item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
}
