import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Progress from "react-native-progress";
export default function Loading() {
  return (
    <View
      style={{ height: hp("100%"), width: wp("100%") }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail thickness={12} size={160} color={"#FFC107"} />
    </View>
  );
}
