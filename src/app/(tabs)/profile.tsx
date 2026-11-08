import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { studio } from '@/content';
import { logOut, useAuth } from '@/lib/auth';
import { color, font, radius, space } from '@/theme';
import { Body, Button, Eyebrow, Heading, Screen } from '@/ui';

export default function Profile() {
  const { user, displayName } = useAuth();
  const initial = (displayName || user?.email || '?').charAt(0).toUpperCase();

  return (
    <Screen>
      <View style={s.account}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{initial}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.name}>{displayName || 'Your account'}</Text>
          <Body muted numberOfLines={1}>
            {user?.email}
          </Body>
        </View>
      </View>

      <View style={s.section}>
        <Eyebrow>About us</Eyebrow>
        <Heading>{studio.tagline}</Heading>
        {studio.about.map((p) => (
          <Body key={p} muted>
            {p}
          </Body>
        ))}
      </View>

      <View style={s.section}>
        <Eyebrow>Where we work</Eyebrow>
        <View style={s.cities}>
          {studio.cities.map((c) => (
            <Text key={c} style={s.city}>
              {c}
            </Text>
          ))}
        </View>
      </View>

      <View style={s.section}>
        <Eyebrow>Meet the team</Eyebrow>
        <View style={s.team}>
          {studio.team.map((m) => (
            <View key={m.name} style={s.member}>
              <Image source={m.photo} style={s.photo} contentFit="cover" />
              <Text style={s.memberName}>{m.name}</Text>
              <Text style={s.role}>{m.role}</Text>
            </View>
          ))}
        </View>
      </View>

      <Button label="Log out" variant="secondary" icon="log-out-outline" onPress={logOut} />
    </Screen>
  );
}

const s = StyleSheet.create({
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space(4),
    marginTop: space(4),
    padding: space(4),
    borderRadius: radius.lg,
    backgroundColor: color.surface,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: font.display, fontSize: 24, color: color.onPrimary },
  name: { fontFamily: font.semibold, fontSize: 18, color: color.text },
  section: { gap: space(3) },
  cities: { flexDirection: 'row', flexWrap: 'wrap', gap: space(2) },
  city: {
    fontFamily: font.medium,
    fontSize: 13,
    color: color.text,
    backgroundColor: color.surfaceAlt,
    paddingHorizontal: space(3),
    paddingVertical: space(1.5),
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  team: { flexDirection: 'row', flexWrap: 'wrap', gap: space(4) },
  member: { flexGrow: 1, flexBasis: 140, alignItems: 'center', gap: space(1) },
  photo: { width: 96, height: 96, borderRadius: radius.pill, marginBottom: space(1) },
  memberName: { fontFamily: font.semibold, fontSize: 15, color: color.text, textAlign: 'center' },
  role: { fontFamily: font.body, fontSize: 13, color: color.muted, textAlign: 'center' },
});
