import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const foods = [
  {
    id: "1",
    name: "Burger",
    image: require("../../assets/images/b1.jpg"),
  },
  {
    id: "2",
    name: "Pizza",
    image: require("../../assets/images/b3.jpg"),
  },
];

export default function First() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: "#FC8019",
          padding: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            color: "white",
            fontWeight: "bold",
          }}
        >
          🍔 GO FRESH
        </Text>

        <Text
          style={{
            color: "white",
            marginTop: 5,
          }}
        >
          Delicious Food Delivered Fast
        </Text>
      </View>

      {/* Food Items */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 40,
        }}
      >
        {foods.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push("/second")}
          >
            <Image
              source={item.image}
              style={{
                width: 140,
                height: 140,
                borderRadius: 15,
                backgroundColor: "red",
              }}
              onError={(e) => console.log("Image Error:", e.nativeEvent)}
            />

            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View
        style={{
          position: "absolute",
          bottom: 30,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "gray",
          }}
        >
          Tap any food to continue →
        </Text>
      </View>
    </View>
  );
}
