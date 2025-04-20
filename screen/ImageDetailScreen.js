import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

export default function ImageDetailScreen({ route, navigation }) {  const { imageUri, prompt } = route.params;

  const saveToGallery = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Need gallery access to save images');
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(imageUri);
      Alert.alert('Success', 'Image saved to gallery!');
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save image');
    }
  };

  const shareImage = async () => {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Sharing not available on this device');
        return;
      }
      await Sharing.shareAsync(imageUri);
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Error', 'Failed to share image');
    }
  };

  return (
    <View
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Generated Image</Text>
        <View style={{ width: 24 }} />
      </View>

      <Image 
        source={{ uri: imageUri }} 
        style={styles.image}
        resizeMode="contain"
      />

      {prompt && (
        <View style={styles.promptContainer}>
          <Text style={styles.promptLabel}>Prompt:</Text>
          <Text style={styles.promptText}>{prompt}</Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.saveButton]}
          onPress={saveToGallery}
        >
          <Ionicons name="download" size={20} color="#fff" />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.shareButton]}
          onPress={shareImage}
        >
          <Ionicons name="share" size={20} color="#fff" />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  promptContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#aaa",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  promptLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  promptText: {
    color: '#555',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 30,
    width: '45%',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: "#aaa",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  saveButton: {
    backgroundColor: '#007bff',
  },
  shareButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
});