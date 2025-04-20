import { View, StyleSheet, Platform } from "react-native";
import React from "react";
import AppNav from "./navigation/AppNav";
import { NavigationContainer } from "@react-navigation/native";
import store from "./features/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <AppNav />
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? "10%" : "4%",
    backgroundColor: "#f5f5f5",
  },
});