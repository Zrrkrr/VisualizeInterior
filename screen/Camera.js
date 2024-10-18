import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const CameraScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      // Request camera permission
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      // Request media library permission (to save the photo)
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      setPhotoUri(photo.uri);
      
      // Save photo to gallery
      if (hasMediaLibraryPermission) {
        await MediaLibrary.createAssetAsync(photo.uri);
        alert('Photo saved to gallery!');
      }
    }
  };

  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return <View><Text>Requesting permissions...</Text></View>;
  }
  if (hasCameraPermission === false || hasMediaLibraryPermission === false) {
    return <View><Text>No access to camera or gallery</Text></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableOpacity>
      </View>
      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          style={{ width: 100, height: 100, marginTop: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CameraScreen;
