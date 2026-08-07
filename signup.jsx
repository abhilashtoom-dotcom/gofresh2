import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Signup = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    console.log("Signup button clicked");
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (data.success) {
        alert(data.message);

        setName("");
        setEmail("");
        setPhone("");
        setPassword("");

        router.replace("/first");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Cannot connect to backend");
    }
  };

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
        Create Account
      </Text>

      <Text
        style={{
          color: "white",
          marginBottom: 40,
        }}
      >
        Sign up to continue
      </Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: "white",
          height: 55,
          borderRadius: 12,
          paddingHorizontal: 15,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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

      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{
          backgroundColor: "white",
          height: 55,
          borderRadius: 12,
          paddingHorizontal: 15,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: "white",
          height: 55,
          borderRadius: 12,
          paddingHorizontal: 15,
          marginBottom: 30,
        }}
      />

      <TouchableOpacity
        onPress={handleSignup}
        style={{
          backgroundColor: "#282C3F",
          height: 55,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/home")}
        style={{
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
