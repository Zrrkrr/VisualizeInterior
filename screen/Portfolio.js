import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const PortfolioScreen = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const images = useSelector((state) => state.portfolio.images); // Access images from Redux store

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={require("../assets/visualize.png")} style={styles.logo} />
        <Text style={styles.title}>Our Projects</Text>
        <Text style={styles.subtitle}>
          Dive into the depths of design and discover the art of crafting spaces that reflect your essence!
        </Text>
      </View>

      {/* Image Gallery */}
      <View style={styles.galleryContainer}>
        {images.map((image) => (
          <View key={image.id} style={styles.imageContainer}>
            <Image source={image.source} style={styles.image} />
            <Text style={styles.description}>{image.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 10,
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginVertical: 10,
  },
  galleryContainer: {
    padding: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageContainer: {
    width: "48%",
    marginBottom: 20,
    borderRadius: 15,
    padding: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 15,
    resizeMode: "cover",
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
});

export default PortfolioScreen;