import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BeforeAfter } from '@/BeforeAfter';
import { styles as designStyles } from '@/content';
import { saveImage, shareImage } from '@/lib/media';
import { AIError, imagine, preparePhoto, redesign } from '@/lib/stability';
import { color, font, radius, space } from '@/theme';
import { Body, Button, Chip, Eyebrow, Field, Heading, Notice, Screen, Title } from '@/ui';

type Mode = 'redesign' | 'imagine';
type Photo = { uri: string; aspect: number };

const IDEAS = [
  'A sunlit Japandi living room with oak floors and linen sofa',
  'A luxurious master bedroom with velvet headboard and brass lamps',
  'A compact modern kitchen with terracotta tiles and open shelves',
  'A serene home mandir with carved wood and soft golden light',
];

const clampAspect = (a: number) => Math.min(1.6, Math.max(0.65, a));

export default function Studio() {
  const [mode, setMode] = useState<Mode>('redesign');
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [styleId, setStyleId] = useState(designStyles[0].id);
  const [details, setDetails] = useState('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  function switchMode(next: Mode) {
    setMode(next);
    setResult(null);
    setError('');
    setInfo('');
  }

  async function pick(source: 'camera' | 'library') {
    setError('');
    const permission =
      source === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return setError('Allow access in Settings to use your photos.');

    const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], quality: 1 };
    const res =
      source === 'camera'
        ? await ImagePicker.launchCameraAsync(options)
        : await ImagePicker.launchImageLibraryAsync(options);
    if (res.canceled) return;

    const asset = res.assets[0];
    try {
      const uri = await preparePhoto(asset.uri, asset.width, asset.height);
      setPhoto({ uri, aspect: clampAspect(asset.width / asset.height) });
      setResult(null);
    } catch {
      setError('Couldn’t open that photo. Try a different one.');
    }
  }

  async function run() {
    setError('');
    setInfo('');
    if (mode === 'redesign' && !photo) return setError('Add a photo of your room first.');
    if (mode === 'imagine' && prompt.trim().length < 5) return setError('Describe the room you want to see.');

    setBusy(true);
    try {
      if (mode === 'redesign') {
        const style = designStyles.find((x) => x.id === styleId)!;
        const extra = details.trim() ? `, ${details.trim()}` : '';
        setResult(await redesign(photo!.uri, `${style.prompt}${extra}, photorealistic interior photo`));
      } else {
        setResult(await imagine(`${prompt.trim()}, photorealistic interior design photo`));
      }
    } catch (e) {
      setError(e instanceof AIError ? e.message : 'Something went wrong. Please try again.');
    }
    setBusy(false);
  }

  async function act(fn: () => Promise<string | void>) {
    setInfo('');
    try {
      const msg = await fn();
      if (msg) setInfo(msg);
    } catch {
      setError('Couldn’t do that on this device.');
    }
  }

  return (
    <Screen>
      <View style={{ gap: space(2), marginTop: space(4) }}>
        <Eyebrow>AI Studio</Eyebrow>
        <Title>{mode === 'redesign' ? 'Redesign your room' : 'Imagine a space'}</Title>
        <Body muted>
          {mode === 'redesign'
            ? 'Upload a photo of your room, pick a style, and see it transformed while keeping its layout.'
            : 'Describe any room and our AI will visualize it for you.'}
        </Body>
      </View>

      <View style={s.segment}>
        {(['redesign', 'imagine'] as const).map((m) => (
          <Pressable
            key={m}
            accessibilityRole="tab"
            accessibilityState={{ selected: mode === m }}
            onPress={() => switchMode(m)}
            style={[s.segmentItem, mode === m && s.segmentActive]}>
            <Text style={[s.segmentText, mode === m && { color: color.text }]}>
              {m === 'redesign' ? 'My room' : 'From text'}
            </Text>
          </Pressable>
        ))}
      </View>

      {!!error && <Notice text={error} />}
      {!!info && <Notice tone="info" text={info} />}

      {result ? (
        <View style={{ gap: space(4) }}>
          {mode === 'redesign' && photo ? (
            <BeforeAfter before={photo.uri} after={result} aspectRatio={photo.aspect} />
          ) : (
            <Image source={{ uri: result }} style={s.result} contentFit="cover" transition={300} />
          )}
          <View style={s.row}>
            <Button label="Save" icon="download-outline" variant="secondary" onPress={() => act(() => saveImage(result))} style={{ flex: 1 }} />
            <Button label="Share" icon="share-outline" variant="secondary" onPress={() => act(() => shareImage(result))} style={{ flex: 1 }} />
          </View>
          <Button
            label={mode === 'redesign' ? 'Try another style' : 'Try another idea'}
            icon="refresh"
            onPress={() => {
              setResult(null);
              setInfo('');
            }}
          />
        </View>
      ) : mode === 'redesign' ? (
        <>
          {photo ? (
            <View style={{ gap: space(3) }}>
              <Image source={{ uri: photo.uri }} style={[s.preview, { aspectRatio: photo.aspect }]} contentFit="cover" />
              <Button label="Change photo" variant="ghost" icon="images-outline" onPress={() => pick('library')} />
            </View>
          ) : (
            <View style={s.drop}>
              <Heading style={{ textAlign: 'center' }}>Start with your room</Heading>
              <Body muted style={{ textAlign: 'center' }}>
                A wide, well-lit photo works best.
              </Body>
              <View style={[s.row, { alignSelf: 'stretch' }]}>
                {Platform.OS !== 'web' && (
                  <Button label="Camera" icon="camera-outline" variant="secondary" onPress={() => pick('camera')} style={{ flex: 1 }} />
                )}
                <Button label="Upload photo" icon="image-outline" onPress={() => pick('library')} style={{ flex: 1 }} />
              </View>
            </View>
          )}

          <View style={{ gap: space(3) }}>
            <Heading>Choose a style</Heading>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space(3) }}>
              {designStyles.map((st) => (
                <Pressable
                  key={st.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: styleId === st.id }}
                  accessibilityLabel={st.name}
                  onPress={() => setStyleId(st.id)}
                  style={[s.styleCard, styleId === st.id && s.styleActive]}>
                  <Image source={st.preview} style={s.styleImage} contentFit="cover" />
                  <Text style={s.styleName}>{st.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <Field
            label="Anything specific? (optional)"
            value={details}
            onChangeText={setDetails}
            placeholder="e.g. add indoor plants, keep it bright"
            maxLength={200}
          />
          <Button label="Redesign my room" icon="sparkles" onPress={run} loading={busy} disabled={!photo} />
        </>
      ) : (
        <>
          <Field
            label="Describe your dream room"
            value={prompt}
            onChangeText={setPrompt}
            placeholder="A cozy reading nook with warm lighting…"
            multiline
            maxLength={500}
            style={{ minHeight: 120, textAlignVertical: 'top' }}
          />
          <View style={{ gap: space(2) }}>
            <Text style={s.ideasLabel}>Need an idea?</Text>
            <View style={s.ideas}>
              {IDEAS.map((idea) => (
                <Chip key={idea} label={idea} selected={prompt === idea} onPress={() => setPrompt(idea)} />
              ))}
            </View>
          </View>
          <Button label="Generate design" icon="sparkles" onPress={run} loading={busy} />
        </>
      )}

      {busy && <Body muted style={{ textAlign: 'center' }}>Designing your space… this usually takes 10–20 seconds.</Body>}
    </Screen>
  );
}

const s = StyleSheet.create({
  segment: { flexDirection: 'row', backgroundColor: color.surfaceAlt, borderRadius: radius.pill, padding: 4 },
  segmentItem: { flex: 1, minHeight: 44, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  segmentActive: { backgroundColor: color.surface },
  segmentText: { fontFamily: font.semibold, fontSize: 14, color: color.muted },
  row: { flexDirection: 'row', gap: space(3) },
  drop: {
    alignItems: 'center',
    gap: space(3),
    padding: space(6),
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: color.border,
    backgroundColor: color.surface,
  },
  preview: { width: '100%', borderRadius: radius.lg },
  result: { width: '100%', aspectRatio: 1, borderRadius: radius.lg, backgroundColor: color.surfaceAlt },
  styleCard: { width: 120, borderRadius: radius.md, borderWidth: 2, borderColor: 'transparent', overflow: 'hidden', backgroundColor: color.surface },
  styleActive: { borderColor: color.primary },
  styleImage: { width: '100%', height: 96 },
  styleName: { fontFamily: font.semibold, fontSize: 13, color: color.text, padding: space(2.5) },
  ideasLabel: { fontFamily: font.medium, fontSize: 14, color: color.muted },
  ideas: { flexDirection: 'row', flexWrap: 'wrap', gap: space(2) },
});
