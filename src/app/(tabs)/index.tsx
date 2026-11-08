import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { inspirations, ROOM_TYPES, type Inspiration } from '@/content';
import { useAuth } from '@/lib/auth';
import { color, font, MAX_WIDTH, radius, space } from '@/theme';
import { Body, Chip, ChipRow, Eyebrow, Heading, Screen, Title } from '@/ui';

const HEIGHTS = [240, 300, 200, 270];

function Tile({ item, height }: { item: Inspiration; height: number }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.title}
      onPress={() => router.push(`/inspiration/${item.id}`)}
      style={({ pressed }) => [s.tile, pressed && { opacity: 0.85 }]}>
      <Image source={item.image} style={{ width: '100%', height }} contentFit="cover" transition={200} />
      <View style={s.tileText}>
        <Text style={s.tileTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={s.tileMeta}>{item.roomType}</Text>
      </View>
    </Pressable>
  );
}

export default function Explore() {
  const { displayName } = useAuth();
  const [room, setRoom] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const columns = Math.min(width, MAX_WIDTH) >= 720 ? 3 : 2;

  const shown = useMemo(() => inspirations.filter((i) => !room || i.roomType === room), [room]);
  const rooms = ROOM_TYPES.filter((r) => inspirations.some((i) => i.roomType === r));
  const cols = Array.from({ length: columns }, (_, c) => shown.filter((_, i) => i % columns === c));
  const firstName = displayName.split(' ')[0];

  return (
    <Screen>
      <View style={{ gap: space(1), marginTop: space(4) }}>
        <Eyebrow>{firstName ? `Hi, ${firstName}` : 'Welcome'}</Eyebrow>
        <Title>Find the look{'\n'}for your space</Title>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/studio')}
        style={({ pressed }) => [s.hero, pressed && { opacity: 0.9 }]}>
        <Image source={require('../../../assets/content/insp-09.webp')} style={StyleSheet.absoluteFill} contentFit="cover" />
        <View style={s.heroScrim} />
        <View style={{ gap: space(2) }}>
          <Text style={s.heroEyebrow}>New · AI Studio</Text>
          <Heading style={{ color: '#fff' }}>See your room, redesigned</Heading>
          <View style={s.heroCta}>
            <Text style={s.heroCtaText}>Try it now</Text>
            <Ionicons name="arrow-forward" size={16} color={color.text} />
          </View>
        </View>
      </Pressable>

      <View style={{ gap: space(3) }}>
        <Heading>Inspiration</Heading>
        <ChipRow>
          <Chip label="All" selected={!room} onPress={() => setRoom(null)} />
          {rooms.map((r) => (
            <Chip key={r} label={r} selected={room === r} onPress={() => setRoom(r)} />
          ))}
        </ChipRow>
      </View>

      {shown.length === 0 ? (
        <Body muted>No designs in this category yet.</Body>
      ) : (
        <View style={s.grid}>
          {cols.map((col, c) => (
            <View key={c} style={s.col}>
              {col.map((item, i) => (
                <Tile key={item.id} item={item} height={HEIGHTS[(i + c) % HEIGHTS.length]} />
              ))}
            </View>
          ))}
        </View>
      )}
    </Screen>
  );
}

const s = StyleSheet.create({
  hero: {
    height: 220,
    borderRadius: radius.lg,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: space(5),
  },
  heroScrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(20,16,12,0.42)' },
  heroEyebrow: { fontFamily: font.semibold, fontSize: 12, letterSpacing: 1.4, textTransform: 'uppercase', color: '#F3D9C9' },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space(2),
    alignSelf: 'flex-start',
    backgroundColor: color.bg,
    borderRadius: radius.pill,
    paddingHorizontal: space(4),
    paddingVertical: space(2),
    marginTop: space(1),
  },
  heroCtaText: { fontFamily: font.semibold, fontSize: 14, color: color.text },
  grid: { flexDirection: 'row', gap: space(3) },
  col: { flex: 1, gap: space(3) },
  tile: { borderRadius: radius.md, overflow: 'hidden', backgroundColor: color.surface },
  tileText: { padding: space(3), gap: 2 },
  tileTitle: { fontFamily: font.semibold, fontSize: 14, color: color.text },
  tileMeta: { fontFamily: font.body, fontSize: 12, color: color.muted },
});
