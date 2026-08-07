import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (data.success) {
        alert(data.message);
        router.replace("/first");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Cannot connect to server");
    }
  };
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FC8019",
        justifyContent: "center",
        padding: 25,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "white",
          marginBottom: 5,
        }}
      >
        Welcome {"\n"}
        {username} 👋
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 16,
          marginBottom: 60,
        }}
      >
        Sign in to continue
      </Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          backgroundColor: "white",
          height: 55,
          borderRadius: 12,
          paddingHorizontal: 15,
          marginBottom: 15,
        }}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: "white",
          height: 55,
          borderRadius: 12,
          paddingHorizontal: 15,
          marginBottom: 45,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#282C3F",
          height: 55,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/signup")}
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
          }}
        >
          Don't have an account?{" "}
          <Text
            style={{
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Sign Up
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
