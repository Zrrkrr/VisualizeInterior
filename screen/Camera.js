import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import axios from "axios";
import { STABILITY_API_KEY } from "@env";
import { Buffer } from "buffer";

export default function Camera({ navigation }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      Alert.alert("Error", "Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);
      setGeneratedImage(null);

      // Create FormData payload
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("output_format", "webp");

      const response = await axios.post(
        "https://api.stability.ai/v2beta/stable-image/generate/core",
        formData,
        {
          headers: {
            Authorization: `Bearer ${STABILITY_API_KEY}`,
            Accept: "image/*",
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer",
        }
      );

      if (response.status === 200) {
        // Convert array buffer to base64 for React Native
        const base64Image = Buffer.from(response.data).toString("base64");
        const imageUri = `data:image/webp;base64,${base64Image}`;
        setGeneratedImage(imageUri);
      } else {
        throw new Error(`${response.status}: ${Buffer.from(response.data).toString()}`);
      }
    } catch (error) {
      console.error("Generation error:", error);
      let errorMessage = "Failed to generate image";
      
      if (error.response) {
        errorMessage = `${error.response.status}: ${Buffer.from(error.response.data).toString()}`;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>AI Image Generator</Text>
        
        <TextInput
          style={styles.promptInput}
          placeholder="Describe what you want to generate..."
          placeholderTextColor="#bbb"
          value={prompt}
          onChangeText={setPrompt}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={generateImage}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Generate Image</Text>
          )}
        </TouchableOpacity>

        {generatedImage && (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: generatedImage }} 
              style={styles.generatedImage}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    width: "100%",
    maxWidth: 500,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  promptInput: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 120,
    color: "#000",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    textAlignVertical: "top",
  },
  button: {
    width: "100%",
    backgroundColor: "#6e3bff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#6e3bff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#a18dff",
    shadowColor: "transparent",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  imageContainer: {
    marginTop: 30,
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#eee",
    borderRadius: 12,
    overflow: "hidden",
  },
  generatedImage: {
    width: "100%",
    height: "100%",
  },
});