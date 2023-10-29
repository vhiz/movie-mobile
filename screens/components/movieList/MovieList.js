import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function MovieList({ title, delay, seeAll, data }) {
  const name = "Black Panther and the untouhable phenoinol in the ulti erse";
  const navigate = useNavigation();
  return (
    <Animated.View
      className="mb-8 space-y-4"
      entering={FadeInDown.duration(600).delay(`${delay}`).springify()}
    >
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white" style={{ fontSize: hp(3) }}>
          {title}
        </Text>
        {seeAll && (
          <TouchableOpacity>
            <Text className="text-amber-500 text-lg">See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.map((item, i) => (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => navigate.push("Movie", item)}
          >
            <View className="space-y-1 mr-4">
              <Animated.Image
                source={{
                  uri: item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW92aWV8ZW58MHx8MHx8fDA%3D",
                }}
                style={{ height: hp(30), width: hp(20), borderRadius: 15 }}
                sharedTransitionTag={item.poster_path}
              />
              <Text className="text-neutral-300 ml-1">
                {item.title.length > 14
                  ? item.title.slice(0, 14) + "...."
                  : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </Animated.View>
  );
}
