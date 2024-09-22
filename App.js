import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.titleCont}>
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.inputCont}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          keyboardType="numeric"
        />
      </View>
      <View>
      <TouchableOpacity style={styles.button}>
        <Text>Login</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  inputCont: {
    // backgroundColor: "#000",
    width: "100%",
    // marginBottom: "100%",
    alignItems: "center",
    marginTop: "30%",
  },
  input: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
