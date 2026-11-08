import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Glass } from './Glass';
import { color, font, radius, space } from './theme';
import { Body, Eyebrow, Title } from './ui';

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <View style={s.root}>
      <Image source={require('../assets/content/insp-02.webp')} style={StyleSheet.absoluteFill} contentFit="cover" />
      <View style={s.scrim} />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
            <Glass style={s.card}>
              <Eyebrow>Visualize Interior</Eyebrow>
              <Title>{title}</Title>
              <Body muted>{subtitle}</Body>
              <View style={{ gap: space(4), marginTop: space(2) }}>{children}</View>
            </Glass>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.text },
  scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: color.overlay },
  scroll: { flexGrow: 1, justifyContent: 'flex-end', padding: space(4), paddingTop: space(30) },
  card: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
    borderRadius: radius.lg,
    padding: space(6),
    gap: space(2),
  },
});

export const authText = StyleSheet.create({
  link: { fontFamily: font.medium, fontSize: 14, color: color.primary, alignSelf: 'flex-end' },
  footer: { fontFamily: font.body, fontSize: 15, color: color.muted, textAlign: 'center' },
  strong: { fontFamily: font.semibold, color: color.primary },
});
