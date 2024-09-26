import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
// import React from "react";
import React, { useState } from "react";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    // Add your signup logic here
    console.log("Signup pressed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign-Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 50,
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderColor: "#fff",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    width: "70%", // Button width decreased to 70% of the container width
    alignSelf: "center", // Center the button
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
    textAlign: "center",
  },
});

export default SignupScreen;
