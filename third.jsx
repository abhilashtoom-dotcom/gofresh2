import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function Third() {
  const router = useRouter();

  const BASE_URL = "http://localhost:5000";

  const [cartItems, setCartItems] = useState([]);
  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    getCart();
  }, []);

  // Get Cart Items
  const getCart = async () => {
    console.log("Fetching cart...");

    try {
      const response = await fetch(`${BASE_URL}/cart/1`);
      const data = await response.json();

      console.log("Cart Data:", data);

      if (data.success) {
        setCartItems(data.cart);

        const total = data.cart.reduce(
          (sum, item) => sum + Number(item.price) * item.quantity,
          0,
        );

        setFinalAmount(total);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeCartItem = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        await getCart();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              marginTop: 50,
              fontSize: 18,
            }}
          >
            Cart is Empty
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
              elevation: 3,
            }}
          >
            <Image
              source={{
                uri: `${BASE_URL}/images/${item.image}`,
              }}
              style={{
                width: 90,
                height: 90,
                borderRadius: 10,
              }}
            />

            <View
              style={{
                flex: 1,
                marginLeft: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Text>

              <Text
                style={{
                  color: "green",
                  marginTop: 5,
                  fontSize: 16,
                }}
              >
                ₹{item.price}
              </Text>

              <Text
                style={{
                  marginTop: 5,
                }}
              >
                Quantity : {item.quantity}
              </Text>

              <TouchableOpacity
                onPress={() => removeCartItem(item.id)}
                style={{
                  backgroundColor: "red",
                  marginTop: 10,
                  width: 100,
                  padding: 8,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Coupon */}

      <View
        style={{
          backgroundColor: "red",
          padding: 15,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setFinalAmount(finalAmount * 0.7)}
          style={{
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            APPLY 30% OFF
          </Text>
        </TouchableOpacity>
      </View>

      {/* Total */}

      <View
        style={{
          backgroundColor: "#f5f5f5",
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Your Bill : ₹{finalAmount}
        </Text>
      </View>

      {/* Order */}

      <TouchableOpacity
        onPress={() => router.push("/last")}
        style={{
          backgroundColor: "orange",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Order Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}
