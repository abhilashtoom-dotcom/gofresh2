import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import QRCodeScanner from "../../assets/images/qr.png";

export default function Last() {
  const router = useRouter();

  const BASE_URL = "http://192.168.1.5:5000";

  const [showScanner, setShowScanner] = useState(false);
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    try {
      setLoading(true);

      console.log("Button Clicked");

      const response = await fetch(`${BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: "Abhilash",
          phone: "9876543210",
          address: "Hyderabad",
          user_id: 1,
        }),
      });

      console.log("Response Status:", response.status);

      const data = await response.json();

      console.log(data);

      if (data.success) {
        Alert.alert("Success", "Order Placed Successfully");

        router.replace("/sucess");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (err) {
      console.log("Fetch Error:", err);

      Alert.alert("Error", "Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 40,
              marginBottom: 30,
            }}
          >
            Select Payment Method
          </Text>

          {/* Cash on Delivery */}

          <TouchableOpacity
            onPress={placeOrder}
            disabled={loading}
            style={{
              backgroundColor: "#ED5B59",
              padding: 20,
              borderRadius: 10,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 22,
                textAlign: "center",
              }}
            >
              {loading ? "Placing Order..." : "💵 Cash on Delivery"}
            </Text>
          </TouchableOpacity>

          {/* PhonePe */}

          <TouchableOpacity
            onPress={() => setShowScanner(true)}
            style={{
              backgroundColor: "#ED5B59",
              padding: 20,
              borderRadius: 10,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 22,
                textAlign: "center",
              }}
            >
              📱 PhonePe
            </Text>
          </TouchableOpacity>

          {/* Google Pay */}

          <TouchableOpacity
            onPress={() => setShowScanner(true)}
            style={{
              backgroundColor: "#ED5B59",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 22,
                textAlign: "center",
              }}
            >
              💳 Google Pay
            </Text>
          </TouchableOpacity>

          {/* QR Code */}

          {showScanner && (
            <View
              style={{
                marginTop: 30,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
              >
                Scan To Pay
              </Text>

              <Image
                source={QRCodeScanner}
                style={{
                  width: 250,
                  height: 250,
                }}
              />

              <Text
                style={{
                  marginTop: 15,
                  color: "gray",
                }}
              >
                Scan using PhonePe or Google Pay
              </Text>

              <TouchableOpacity
                onPress={placeOrder}
                style={{
                  backgroundColor: "green",
                  padding: 15,
                  marginTop: 25,
                  borderRadius: 10,
                  width: 200,
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
                  Payment Done
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
