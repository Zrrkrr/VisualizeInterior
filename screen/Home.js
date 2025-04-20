import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");

const Home = ({ route }) => {
  const name = useSelector((state) => state.name.name); // Access the user's name
  const images = useSelector((state) => state.images.images); // Access images from Redux store

  return (
    <View style={styles.container}>
      {/* Navbar (outside the gradient) */}
      <View style={styles.navBar}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.userNameText}>Hi, {name}</Text>
      </View>

      {/* Content Area (inside a simple View) */}
      <View style={styles.gradientContainer}>
        {/* Image Gallery */}
        <ScrollView contentContainerStyle={styles.imageGallery}>
          {images.map((image) => (
            <Animated.View
              key={image.id}
              style={styles.imageContainer}
              onLoadStart={() => <ActivityIndicator size="small" color="#000" />}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.imageItem}
              >
                <Image
                  source={image.source}
                  style={styles.imageItem}
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Background color for the navbar
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff", // Navbar background color
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333", // Dark text for contrast
  },
  userNameText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333", // Dark text for contrast
  },
  gradientContainer: {
    flex: 1, // Take up the remaining space below the navbar
    backgroundColor: "#fff", // Set background color
  },
  imageGallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  imageContainer: {
    width: "48%",
    marginBottom: 15,
    borderRadius: 20, // Increased border radius for a modern feel
    overflow: "hidden",
    elevation: 5, // Improved shadow for a soft floating effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: "#fff", // White background for images
  },
  imageItem: {
    width: "100%",
    height: 200,
    borderRadius: 20, // Increased border radius for a modern feel
  },
});

export default Home;