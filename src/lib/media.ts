import { cacheDirectory, EncodingType, writeAsStringAsync } from 'expo-file-system/legacy';
import { requestPermissionsAsync, saveToLibraryAsync } from 'expo-media-library/legacy';
import { shareAsync } from 'expo-sharing';
import { Platform } from 'react-native';

/** Writes a base64 data URI to a temporary file so native APIs can use it. */
async function toFile(dataUri: string) {
  const uri = `${cacheDirectory}visualize-${Date.now()}.jpg`;
  await writeAsStringAsync(uri, dataUri.split(',')[1], { encoding: EncodingType.Base64 });
  return uri;
}

function download(dataUri: string) {
  const a = document.createElement('a');
  a.href = dataUri;
  a.download = 'visualize-design.jpg';
  a.click();
}

/** Returns a message to show the user. */
export async function saveImage(dataUri: string): Promise<string> {
  if (Platform.OS === 'web') {
    download(dataUri);
    return 'Downloaded.';
  }
  const { granted } = await requestPermissionsAsync(true);
  if (!granted) return 'Allow photo access in Settings to save designs.';
  await saveToLibraryAsync(await toFile(dataUri));
  return 'Saved to your photos.';
}

export async function shareImage(dataUri: string): Promise<void> {
  if (Platform.OS !== 'web') return shareAsync(await toFile(dataUri), { mimeType: 'image/jpeg' });

  const blob = await (await fetch(dataUri)).blob();
  const file = new File([blob], 'visualize-design.jpg', { type: 'image/jpeg' });
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title: 'My Visualize design' }).catch(() => {});
  } else {
    download(dataUri);
  }
}
