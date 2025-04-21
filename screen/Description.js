import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    ScrollView, 
    TouchableOpacity 
  } from 'react-native';
  import React from 'react';
  import { useRoute, useNavigation } from '@react-navigation/native';
  import { Ionicons } from '@expo/vector-icons';
  
  const Description = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { image } = route.params;
  
    return (
      <View style={styles.container}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{image.title}</Text>
        </View>
  
        <ScrollView style={styles.scrollContainer}>
          {/* Image with rounded corners and padding */}
          <View style={styles.imageWrapper}>
            <Image 
              source={image.source} 
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.description}>{image.description}</Text>
          </View>
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    backButton: {
      marginRight: 15,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    scrollContainer: {
      flex: 1,
    },
    // New wrapper for image with padding
    imageWrapper: {
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius: 16, // Rounded corners
      overflow: 'hidden', // Ensures the image respects the border radius
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // For Android shadow
    },
    image: {
      width: '100%',
      height: 300,
    },
    textContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      color: '#666',
    },
  });
  
  export default Description;