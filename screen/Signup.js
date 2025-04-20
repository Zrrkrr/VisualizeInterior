import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setName } from "../features/nameSlice"; // Ensure this path is correct
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const logoImg = require("../assets/logo.png");

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email || !password || !cnfpassword || !company) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== cnfpassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("User signed up:", user);

        // Dispatch the setName action to update the Redux store
        dispatch(setName(company));

        navigation.navigate("BottomTab"); // Navigate to the BottomTab navigator
      })
      .catch((error) => {
        let errorMessage = "Signup failed. Please try again.";
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Email is already in use.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/weak-password":
            errorMessage = "Password is too weak.";
            break;
          default:
            errorMessage = error.message;
        }
        Alert.alert("Error", errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={logoImg}
          />

          <Text style={styles.title}>
            Sign Up to <Text style={{ color: "#9c466b" }}>Visualize</Text>
            {/* <Text style={{ color: "#FF6301" }}>lize</Text> */}
          </Text>

          <Text style={styles.subtitle}>Your new home awaits!</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Your Name</Text>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              clearButtonMode="while-editing"
              placeholder="Example: Visualize Interior Design"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={company}
              onChangeText={setCompany} // Use onChangeText instead of onChange
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={cnfpassword}
              onChangeText={setCnfPassword}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
              <View style={styles.btn}>
                {isLoading ? (
                  <ActivityIndicator color="#333" />
                ) : (
                  <Text style={styles.btnText}>Sign Up</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onLogin}>
            <Text style={styles.formLink}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  headerImg: {
    width: 170,
    height: 100,
    alignSelf: "center",
    marginBottom: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    borderColor: "#9c466b",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#333",
  },
});