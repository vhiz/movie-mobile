import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutLeft,
  FadeOutUp,
} from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";
import Loading from "../../components/loading/Loading";
import { debounce } from "lodash";

export default function Search() {
  const navigate = useNavigation();
  const [value, setvalue] = useState("");
  const { isLoading, data } = useQuery(["search", value], async () => {
    const res = await makeRequest.get(
      `/search/movie?query=${value}&include_adult=false&language=en-US&page=1`
    );
    return res.data.results;
  });

  const handleSearch = (value) => {
    setvalue(value);
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);
  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <StatusBar style="light" />
      <View
        className={`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full ${
          Platform === "ios" ? "" : "mt-3"
        }`}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movies"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => {
            navigate.navigate("Home");
          }}
          className="rounded-full p-3 bg-neutral-500"
        >
          <XMarkIcon size={25} color={"white"} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Loading />
      ) : data.length > 0 ? (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
          entering={FadeInDown.duration(500)}
          exiting={FadeOutUp.duration(500)}
        >
          <Text className="text-white font-semibold ml-1">
            Result {data.length}
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {data.map((result, i) => (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => navigate.push("Movie", result)}
              >
                <Animated.View
                  entering={FadeInLeft.duration(300)}
                  exiting={FadeOutLeft.duration(300)}
                  className="space-y-2 mb-4"
                >
                  <Image
                    className="rounded-3xl"
                    source={{
                      uri: result.poster_path
                        ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                        : "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW92aWV8ZW58MHx8MHx8fDA%3D",
                    }}
                    style={{
                      height: hp("44%"),
                      width: hp("22%"),
                    }}
                  />
                  <Text className="text-neutral-400 ml-1">
                    {result.title.length > 22
                      ? result.title.slice(0, 22) + "..."
                      : result.title}
                  </Text>
                </Animated.View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </Animated.ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../../../assets/time.png")}
            style={{
              height: hp("50%"),
              width: wp("50%"),
              objectFit: "contain",
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
