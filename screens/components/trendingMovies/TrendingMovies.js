import { View, Text, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MovieCard from "../movieCard/MovieCard";
import Carousel from "react-native-reanimated-carousel";
import { parallaxLayout } from "./parallax";
import { useNavigation } from "@react-navigation/native";

export default function TrendingMovies({ data }) {
  const navigate = useNavigation();
  const handleClick = (item) => {
    navigate.navigate("Movie", item);
  };
  const width = Dimensions.get("window").width;
  return (
    <View className="mb-8">
      <Text className="text-white mx-4 mb-5" style={{ fontSize: hp(3) }}>
        Trending
      </Text>
      <View className="flex-1">
        <Carousel
          loop={true}
          width={width}
          autoPlay={true}
          height={hp(45)}
          data={data}
          scrollAnimationDuration={1200}
          renderItem={({ item, index, animationValue }) => (
            <MovieCard
              item={item}
              animationValue={animationValue}
              index={index}
              handleClick={() => handleClick(item)}
            />
          )}
          customAnimation={parallaxLayout(
            {
              size: width,
              vertical: false,
            },
            {
              parallaxScrollingScale: 1,
              parallaxAdjacentItemScale: 0.5,
              parallaxScrollingOffset: 50,
            }
          )}
        />
      </View>
    </View>
  );
}
