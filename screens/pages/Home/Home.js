import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TrendingMovies from "../../components/trendingMovies/TrendingMovies";
import MovieList from "../../components/movieList/MovieList";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";
import Loading from "../../components/loading/Loading";

export default function Home() {
  const navigate = useNavigation();

  const { isLoading: TrendLoad, data: trending } = useQuery(
    ["trending"],
    async () => {
      const res = await makeRequest.get("/trending/movie/day?language=en-US");
      return res.data.results;
    }
  );
  const { isLoading: UpcomingLoad, data: Upcoming } = useQuery(
    ["upcoming"],
    async () => {
      const res = await makeRequest.get(
        "/movie/upcoming?language=en-US&page=1"
      );
      return res.data.results;
    }
  );
  const { eisLoading: TopRatedLoad, data: TopRated } = useQuery(
    ["toprated"],
    async () => {
      const res = await makeRequest.get(
        "/movie/top_rated?language=en-US&page=1"
      );
      return res.data.results;
    }
  );

  return (
    <View className="flex-1 bg-neutral-800 ">
      <SafeAreaView className={Platform.OS === "ios" ? "mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity>
            <Bars3CenterLeftIcon
              size={hp(3.9)}
              strokeWidth={2}
              color={"white"}
            />
          </TouchableOpacity>
          <Text className="text-white font-bold" style={{ fontSize: hp(4) }}>
            <Text className="text-amber-400">M</Text>
            ovies
          </Text>
          <TouchableOpacity onPress={() => navigate.navigate("Search")}>
            <MagnifyingGlassIcon size={hp(3)} color={"white"} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {TrendLoad ? <Loading /> : <TrendingMovies data={trending} />}
        {UpcomingLoad ? (
          <Loading />
        ) : (
          <MovieList
            title={"Upcoming Movies"}
            delay={0}
            seeAll={true}
            data={Upcoming}
          />
        )}
        {TopRatedLoad ? (
          <Loading />
        ) : (
          <MovieList
            title={"Top Rated"}
            delay={100}
            seeAll={true}
            data={TopRated}
          />
        )}
      </ScrollView>
    </View>
  );
}
