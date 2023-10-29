import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MovieList from "../../components/movieList/MovieList";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";
import ActorDetails from "../../components/actorDetails/ActorDetails";
import Loading from "../../components/loading/Loading";

export default function Actor() {
  const [like, setlike] = useState(false);
  const { params: item } = useRoute();

  const { isLoading, data } = useQuery(["actor", item], async () => {
    const res = await makeRequest.get(`/person/${item.id}?language=en-US`);
    return res.data;
  });
  const { isLoading: movieLoad, data: movie } = useQuery(
    ["actormovie", item],
    async () => {
      const res = await makeRequest.get(
        `/person/${item.id}/movie_credits?language=en-US`
      );
      return res.data.cast;
    }
  );
  const navigate = useNavigation();
  return (
    <ScrollView className="flex-1 bg-neutral-900">
      <SafeAreaView className=" w-full z-20 flex-row justify-between items-center px-4 mt-3">
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
        <Animated.View
          entering={FadeInDown.duration(700).springify()}
          className="flex-row justify-center"
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
            <Image
              source={{
                uri: item.profile_path
                  ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                  : "https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg",
              }}
              style={{ height: hp("43%"), width: wp("79%") }}
            />
          </View>
        </Animated.View>
        {isLoading ? <Loading /> : <ActorDetails data={data} />}
        {movieLoad ? (
          <Loading />
        ) : (
          <MovieList delay={400} title={"Movies"} data={movie} />
        )}
      </View>
    </ScrollView>
  );
}
