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
          <Text style={styles.buttonText}>Login</Text>
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
    marginTop: "65%",
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
    marginTop: "10%",
    color: "#fff",
  },
  input: {
    height: 50,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#fff",
    borderRadius: 10,
    color: "#fff",
    backgroundColor: '#333',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 90,
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
  signupCont: {
    marginTop: "63%",
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
