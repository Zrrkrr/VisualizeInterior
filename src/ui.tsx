import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextProps,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { color, font, MAX_WIDTH, radius, space } from './theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export function Title(props: TextProps) {
  return <Text {...props} style={[s.title, props.style]} />;
}

export function Heading(props: TextProps) {
  return <Text {...props} style={[s.heading, props.style]} />;
}

export function Body(props: TextProps & { muted?: boolean }) {
  return <Text {...props} style={[s.body, props.muted && { color: color.muted }, props.style]} />;
}

export function Eyebrow(props: TextProps) {
  return <Text {...props} style={[s.eyebrow, props.style]} />;
}

export function Screen({
  children,
  scroll = true,
  style,
}: {
  children: ReactNode;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const inner = <View style={[s.inner, style]}>{children}</View>;
  return (
    <SafeAreaView style={s.screen} edges={['top', 'left', 'right']}>
      {scroll ? (
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          {inner}
        </ScrollView>
      ) : (
        inner
      )}
    </SafeAreaView>
  );
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  loading,
  disabled,
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const fg = variant === 'primary' ? color.onPrimary : color.text;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        variant === 'primary' && { backgroundColor: pressed ? color.primaryPressed : color.primary },
        variant === 'secondary' && [s.secondary, pressed && { backgroundColor: color.surfaceAlt }],
        variant === 'ghost' && pressed && { opacity: 0.6 },
        (disabled || loading) && { opacity: 0.5 },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={18} color={fg} />}
          <Text style={[s.buttonText, { color: fg }]}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

export function Chip({ label, selected, onPress }: { label: string; selected?: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[s.chip, selected && { backgroundColor: color.text, borderColor: color.text }]}>
      <Text style={[s.chipText, selected && { color: color.bg }]}>{label}</Text>
    </Pressable>
  );
}

export function ChipRow({ children }: { children: ReactNode }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipRow}>
      {children}
    </ScrollView>
  );
}

export function Field({ label, error, ...props }: TextInputProps & { label: string; error?: string }) {
  return (
    <View style={{ gap: space(1.5) }}>
      <Text style={s.label}>{label}</Text>
      <TextInput
        placeholderTextColor={color.muted}
        {...props}
        style={[s.input, !!error && { borderColor: color.danger }, props.style]}
      />
      {!!error && <Text style={s.error}>{error}</Text>}
    </View>
  );
}

export function Notice({ text, tone = 'error' }: { text: string; tone?: 'error' | 'info' }) {
  return (
    <View style={[s.notice, tone === 'info' && { backgroundColor: color.surfaceAlt, borderColor: color.border }]}>
      <Ionicons
        name={tone === 'error' ? 'alert-circle' : 'information-circle'}
        size={18}
        color={tone === 'error' ? color.danger : color.muted}
      />
      <Text style={[s.body, { flex: 1, color: tone === 'error' ? color.danger : color.text }]}>{text}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg },
  scroll: { flexGrow: 1, paddingBottom: space(10) },
  inner: { width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', paddingHorizontal: space(5), gap: space(5) },
  title: { fontFamily: font.display, fontSize: 34, lineHeight: 42, color: color.text },
  heading: { fontFamily: font.display, fontSize: 22, lineHeight: 30, color: color.text },
  body: { fontFamily: font.body, fontSize: 15, lineHeight: 23, color: color.text },
  eyebrow: {
    fontFamily: font.semibold,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: color.primary,
  },
  button: {
    minHeight: 52,
    borderRadius: radius.pill,
    paddingHorizontal: space(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space(2),
  },
  secondary: { borderWidth: 1, borderColor: color.text, backgroundColor: 'transparent' },
  buttonText: { fontFamily: font.semibold, fontSize: 16 },
  chip: {
    minHeight: 40,
    paddingHorizontal: space(4),
    paddingVertical: space(2),
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: color.surface,
    justifyContent: 'center',
  },
  chipText: { fontFamily: font.medium, fontSize: 14, color: color.text },
  chipRow: { gap: space(2), paddingRight: space(5) },
  label: { fontFamily: font.medium, fontSize: 14, color: color.text },
  input: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: color.surface,
    paddingHorizontal: space(4),
    paddingVertical: space(3),
    fontFamily: font.body,
    fontSize: 16,
    color: color.text,
  },
  error: { fontFamily: font.body, fontSize: 13, color: color.danger },
  notice: {
    flexDirection: 'row',
    gap: space(2),
    alignItems: 'flex-start',
    padding: space(3),
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#F1C7C0',
    backgroundColor: '#FDF1EF',
  },
});
