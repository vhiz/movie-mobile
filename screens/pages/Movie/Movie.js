import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import MovieDesc from "../../components/movieDesc/MovieDesc";
import Cast from "../../components/cast/Cast";
import MovieList from "../../components/movieList/MovieList";
import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";
import Loading from "../../components/loading/Loading";

export default function Movie() {
  const { params: item } = useRoute();
  const { isLoading, data } = useQuery(["movie", item], async () => {
    const res = await makeRequest.get(`/movie/${item.id}?language=en-US`);
    return res.data;
  });
  const { isLoading: castLoad, data: cast } = useQuery(
    ["cast", item],
    async () => {
      const res = await makeRequest.get(
        `/movie/${item.id}/credits?language=en-US`
      );
      return res.data.cast;
    }
  );
  const { isLoading: similarLoad, data: similar } = useQuery(
    ["similar", item],
    async () => {
      const res = await makeRequest.get(
        `/movie/${item.id}/similar?language=en-US&page=1`
      );
      return res.data.results;
    }
  );

  const [like, setlike] = useState(false);
  const navigate = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <StatusBar style="light" />
      <View className="w-full">
        <SafeAreaView className="absolute w-full z-20 flex-row justify-between items-center px-4 mt-3">
          <TouchableOpacity
            className="rounded-xl p-1 bg-amber-500"
            onPress={() => navigate.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={3.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl p-1"
            onPress={() => setlike((pre) => !pre)}
          >
            <HeartIcon size={35} color={like ? "red" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Animated.Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={{ height: hp(60), width: wp("100%") }}
            sharedTransitionTag={item.backdrop_path}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width: wp("100%"), height: wp("50%") }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>
      {isLoading ? <Loading /> : <MovieDesc data={data} />}
      {castLoad ? <Loading /> : <Cast cast={cast} />}
      {similarLoad ? (
        <Loading />
      ) : (
        <MovieList title={"Similar Movies"} delay={500} data={similar} />
      )}
    </ScrollView>
  );
}
