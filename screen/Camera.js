import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const [image, setImage] = useState(null);

  const cameraRef = useRef(null);

  useEffect(() => {
    if (
      cameraPermission?.granted &&
      mediaLibraryPermissionResponse?.status === "granted"
    ) {
      getLastSavedImage();
    }
  }, [cameraPermission, mediaLibraryPermissionResponse]);

  if (!cameraPermission || !mediaLibraryPermissionResponse) return <View />;

  if (
    !cameraPermission.granted ||
    mediaLibraryPermissionResponse.status !== "granted"
  ) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need camera and gallery permissions to continue.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            requestCameraPermission();
            requestMediaLibraryPermission();
          }}
        >
          <Text style={styles.buttonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync();
        setImage(picture.uri);
      } catch (err) {
        console.log("Error while taking the picture: ", err);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        Alert.alert("Photo saved!", image);
        setImage(null);
        getLastSavedImage();
      } catch (err) {
        console.log("Error while saving the picture: ", err);
      }
    }
  };

  const getLastSavedImage = async () => {
    const dcimAlbum = await MediaLibrary.getAlbumAsync("DCIM");
    if (dcimAlbum) {
      const { assets } = await MediaLibrary.getAssetsAsync({
        album: dcimAlbum,
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        mediaType: MediaLibrary.MediaType.photo,
        first: 1,
      });

      if (assets.length === 0) setImage(null);
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          <CameraView style={styles.camera} ref={cameraRef} />
          <View style={styles.bottomControlsContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.cameraButton}>
              <Text >Take Picture</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.camera} />
          <View style={styles.bottomControlsContainer}>
            <TouchableOpacity onPress={() => setImage(null)}>
              <Text style={styles.controlText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={savePicture}>
              <Text style={styles.controlText}>Save</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    height: "100%",
    marginTop: "5%",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  permissionText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  controlText: {
    color: "#fff",
    fontSize: 16,
  },
  camera: {
    height: "90%",
    width: "100%",
  },
  bottomControlsContainer: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#0066ff",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FF6301",
    fontSize: 16,
  },
  cameraButton: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#FCC714",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 30,
  },
});
