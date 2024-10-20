import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const VisualizeInterior = () => {
  const images = [
    { id: 1, source: require("../assets/HomeImgs/Frame1.png") },
    { id: 2, source: require("../assets/HomeImgs/Frame2.png") },
    { id: 3, source: require("../assets/HomeImgs/Frame3.png") },
    { id: 4, source: require("../assets/HomeImgs/Frame4.png") },
    { id: 5, source: require("../assets/HomeImgs/Frame5.png") },
    { id: 6, source: require("../assets/HomeImgs/Frame6.png") },
    { id: 7, source: require("../assets/HomeImgs/1.jpg") },
    { id: 8, source: require("../assets/HomeImgs/2.jpg") },
    { id: 9, source: require("../assets/HomeImgs/3.jpg") },
    { id: 10, source: require("../assets/HomeImgs/4.jpg") },
    { id: 11, source: require("../assets/HomeImgs/5.jpg") },
    { id: 12, source: require("../assets/HomeImgs/6.jpg") },
    { id: 13, source: require("../assets/HomeImgs/7.jpg") },
    { id: 14, source: require("../assets/HomeImgs/8.jpg") },
    { id: 15, source: require("../assets/HomeImgs/9.jpg") },
    { id: 16, source: require("../assets/HomeImgs/10.jpg") },
    { id: 17, source: require("../assets/HomeImgs/11.jpg") },
    { id: 18, source: require("../assets/HomeImgs/12.jpg") },
  ];
  const logoi = require("../assets/visualize.png");

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <Image source={logoi} style={styles.logoi} />
        <Text style={styles.title}>Explore</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Image Gallery */}
      <ScrollView contentContainerStyle={styles.imageGallery}>
        {images.map((image) => (
          <Image
            key={image.id}
            source={image.source}
            style={styles.imageItem}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
  },
  logo: {
    fontSize: 24,
    color: "#FFAA00", // Logo color matching the screenshot
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 5,
  },
  menuText: {
    fontSize: 24,
  },
  imageGallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  imageItem: {
    width: "48%",
    maxHeight: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  logoi: {
    width: 30,
    height: 30,
  },
});

export default VisualizeInterior;
