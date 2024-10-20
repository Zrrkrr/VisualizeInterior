import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const PortfolioScreen = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'RESIDENTIAL', 'OFFICE', 'COMMERCIAL'];

  const images = [
    { id: 1, source: require('../assets/additional/bedroom.png'), description: 'Luxurious bedroom with modern decor.' },
    { id: 2, source: require('../assets/additional/bedroom2.png'), description: 'Stylish office space with custom furniture.' },
    { id: 3, source: require('../assets/additional/commercialinterior.png'), description: 'Elegant living room with soft lighting.' },
    { id: 4, source: require('../assets/additional/residentialdesign.png'), description: 'Contemporary commercial interior.' },
    
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={require('../assets/visualize.png')} style={styles.logo} />
        <Text style={styles.title}>Our Portfolio</Text>
        <Text style={styles.subtitle}>
          Dive into the depths of design and discover the art of crafting spaces that reflect your essence!
        </Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.tabContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.tab,
              activeCategory === category && styles.activeTab,
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text style={activeCategory === category ? styles.activeTabText : styles.tabText}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Image Gallery */}
      <View style={styles.galleryContainer}>
        {images.map((image) => (
          <View key={image.id} style={styles.imageContainer}>
            <Image source={image.source} style={styles.image} />
            <Text style={styles.imageTag}>Image {image.id}</Text>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#eef2f5',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 2,
  },
  activeTab: {
    backgroundColor: '#FFAA00',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  galleryContainer: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  imageTag: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default PortfolioScreen;
