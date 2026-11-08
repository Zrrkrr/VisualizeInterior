import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { findInspiration } from '@/content';
import { color, MAX_WIDTH, radius, space } from '@/theme';
import { Body, Button, Eyebrow, Screen, Title } from '@/ui';

const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));

export default function InspirationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = findInspiration(id);
  const insets = useSafeAreaInsets();

  if (!item) {
    return (
      <Screen>
        <Title style={{ marginTop: space(10) }}>Design not found</Title>
        <Button label="Back to Explore" variant="secondary" onPress={() => router.replace('/')} />
      </Screen>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: color.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: space(12) }}>
        <Image source={item.image} style={s.image} contentFit="cover" transition={200} />
        <View style={s.body}>
          <Eyebrow>{item.roomType}</Eyebrow>
          <Title>{item.title}</Title>
          <Body style={{ fontSize: 16, lineHeight: 26 }}>{item.description}</Body>
          <Button
            label="Visualize this in my room"
            icon="sparkles"
            onPress={() => router.push('/studio')}
            style={{ marginTop: space(2) }}
          />
        </View>
      </ScrollView>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={goBack}
        style={[s.back, { top: insets.top + space(2) }]}>
        <Ionicons name="arrow-back" size={22} color={color.text} />
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  image: { width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', height: 440 },
  body: { width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', padding: space(5), gap: space(3) },
  back: {
    position: 'absolute',
    left: space(4),
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: color.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
