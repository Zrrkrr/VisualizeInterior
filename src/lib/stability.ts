import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { Platform } from 'react-native';

// ponytail: the key ships inside the app bundle, which is fine for a demo that isn't publicly hosted.
// If this app is ever published, move these calls behind a server function.
const API_KEY = process.env.EXPO_PUBLIC_STABILITY_API_KEY;
const BASE = 'https://api.stability.ai/v2beta/stable-image';

export class AIError extends Error {}

function friendly(status: number): string {
  switch (status) {
    case 401:
      return 'The AI key is invalid. Check EXPO_PUBLIC_STABILITY_API_KEY in your .env file.';
    case 402:
      return 'The AI account is out of credits.';
    case 403:
      return 'That request was blocked by the AI safety filter. Try a different photo or wording.';
    case 413:
      return 'That photo is too large. Try another one.';
    case 429:
      return 'Too many requests right now. Wait a few seconds and try again.';
    default:
      return 'The AI service had a problem. Please try again.';
  }
}

async function call(path: string, form: FormData): Promise<string> {
  if (!API_KEY) throw new AIError('Add EXPO_PUBLIC_STABILITY_API_KEY to your .env file to use AI Studio.');
  form.append('output_format', 'jpeg');

  let res: Response;
  try {
    res = await fetch(`${BASE}/${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, Accept: 'application/json' },
      body: form,
    });
  } catch {
    throw new AIError('No internet connection. Check your network and try again.');
  }
  if (!res.ok) throw new AIError(friendly(res.status));

  const json = (await res.json()) as { image?: string; finish_reason?: string };
  if (json.finish_reason === 'CONTENT_FILTERED' || !json.image) throw new AIError(friendly(403));
  return `data:image/jpeg;base64,${json.image}`;
}

/** Text → image. Returns a data URI. */
export function imagine(prompt: string) {
  const form = new FormData();
  form.append('prompt', prompt.trim());
  return call('generate/core', form);
}

/** Keeps the room's layout and restyles it. Returns a data URI. */
export async function redesign(photoUri: string, prompt: string) {
  const form = new FormData();
  form.append('prompt', prompt);
  form.append('control_strength', '0.7');
  if (Platform.OS === 'web') {
    form.append('image', await (await fetch(photoUri)).blob(), 'room.jpg');
  } else {
    // React Native's FormData accepts { uri, name, type } file parts.
    form.append('image', { uri: photoUri, name: 'room.jpg', type: 'image/jpeg' } as unknown as Blob);
  }
  return call('control/structure', form);
}

/** Shrinks a picked photo so its longest side is at most 1024px and re-encodes it as JPEG. */
export async function preparePhoto(uri: string, width: number, height: number) {
  const scale = Math.min(1, 1024 / Math.max(width, height));
  const context = ImageManipulator.manipulate(uri);
  if (scale < 1) context.resize({ width: Math.round(width * scale), height: Math.round(height * scale) });
  const image = await context.renderAsync();
  const result = await image.saveAsync({ format: SaveFormat.JPEG, compress: 0.85 });
  return result.uri;
}
