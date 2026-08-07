import { Image, View } from "react-native";
import QR from "../../assets/images/i.png";

export default function Sucess() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={QR}
        style={{
          width: 350,
          height: 750,
        }}
      />
    </View>
  );
}
