import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const onSignup = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleCont}>
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.inputCont}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"#fff"}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#fff"}
          keyboardType="numeric"
        />
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupCont}>
        <TouchableOpacity style={styles.dontAccount} onPress={onSignup}>
          <Text style={{ color: "white" }}>Don't have an account?</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.signup} onPress={onSignup}>
            <Text style={{ color: "white" }}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleCont: {
    // backgroundColor: "#000",
    marginTop: "40%",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFF",
  },
  inputCont: {
    // backgroundColor: "#000",
    width: "100%",
    // marginBottom: "100%",
    alignItems: "center",
    marginTop: "30%",
    color: "#fff",
  },
  input: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#fff",
    borderRadius: 10,
    color: "#fff",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
  },
  signupCont: {
    marginTop: "70%",
    flexDirection: "row",
  },
  dontAccount: {
    marginRight: "2%",
    backgroundColor: "#000",
  },
  signup: {
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "flex-end",
    // backgroundColor: "#fff",
  },
});
