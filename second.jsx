import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Second() {
  const router = useRouter();

  const BASE_URL = "http://localhost:5000";

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getFoods();
  }, []);

  // ===========================
  // Get All Foods
  // ===========================
  const getFoods = async () => {
    try {
      const response = await fetch(`${BASE_URL}/foods`);
      const data = await response.json();

      if (data.success) {
        setFoods(data.foods);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ===========================
  // Add To Cart
  // ===========================
  const addToCart = async (item) => {
    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          food_id: item.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Success", data.message);
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Unable to connect to server");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={{
          padding: 10,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: "30%",
              margin: 6,
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: `${BASE_URL}/images/${item.image}`,
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
              }}
            />

            <Text
              style={{
                marginTop: 5,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                color: "green",
              }}
            >
              ₹{item.price}
            </Text>

            <TouchableOpacity
              onPress={() => addToCart(item)}
              style={{
                backgroundColor: "green",
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => router.push("/third")}
        style={{
          backgroundColor: "orange",
          padding: 15,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          🛒 View Cart
        </Text>
      </TouchableOpacity>
    </View>
  );
}
