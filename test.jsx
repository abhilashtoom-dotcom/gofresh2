import { Image, View } from "react-native";

export default function Test() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/images/b1.jpg")}
        style={{
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
}
