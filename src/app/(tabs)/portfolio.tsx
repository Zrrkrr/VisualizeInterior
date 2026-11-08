import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { projects } from '@/content';
import { color, font, MAX_WIDTH, radius, space } from '@/theme';
import { Body, Chip, ChipRow, Eyebrow, Screen, Title } from '@/ui';

const CATEGORIES = ['All', 'Residential', 'Commercial'] as const;

export default function Portfolio() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const { width } = useWindowDimensions();
  const wide = Math.min(width, MAX_WIDTH) >= 720;
  const shown = projects.filter((p) => category === 'All' || p.category === category);

  return (
    <Screen>
      <View style={{ gap: space(2), marginTop: space(4) }}>
        <Eyebrow>Our work</Eyebrow>
        <Title>Spaces we’ve brought to life</Title>
        <Body muted>Homes, offices and commercial spaces designed from concept to completion.</Body>
      </View>

      <ChipRow>
        {CATEGORIES.map((c) => (
          <Chip key={c} label={c} selected={category === c} onPress={() => setCategory(c)} />
        ))}
      </ChipRow>

      <View style={[s.list, wide && s.listWide]}>
        {shown.map((p) => (
          <View key={p.id} style={[s.card, wide && s.cardWide]}>
            <Image source={p.image} style={s.image} contentFit="cover" transition={200} />
            <View style={s.cardBody}>
              <Text style={s.category}>{p.category}</Text>
              <Text style={s.title}>{p.title}</Text>
              <Body muted>{p.summary}</Body>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  list: { gap: space(5) },
  listWide: { flexDirection: 'row', flexWrap: 'wrap' },
  card: { borderRadius: radius.lg, overflow: 'hidden', backgroundColor: color.surface },
  cardWide: { width: '48%', flexGrow: 1 },
  image: { width: '100%', aspectRatio: 4 / 5, backgroundColor: color.surfaceAlt },
  cardBody: { padding: space(5), gap: space(1.5) },
  category: { fontFamily: font.semibold, fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase', color: color.primary },
  title: { fontFamily: font.display, fontSize: 22, color: color.text },
});
