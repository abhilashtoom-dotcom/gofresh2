import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

const ComponentName = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../../assets/images/main.png")}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
      />
    </View>
  );
};

export default ComponentName;
