import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { View, type ColorValue, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

const liquid = isLiquidGlassAvailable();

/**
 * Liquid Glass surface on iOS 26+. Everywhere else it falls back to a solid, slightly
 * translucent surface so the design still holds up on Android, web and older iPhones.
 */
export function Glass({
  tone = 'light',
  interactive,
  style,
  ...props
}: ViewProps & { tone?: 'light' | 'dark'; interactive?: boolean; style?: StyleProp<ViewStyle> }) {
  if (liquid) {
    const tint: ColorValue = tone === 'dark' ? 'rgba(20,16,12,0.25)' : 'rgba(246,241,234,0.35)';
    return (
      <GlassView
        {...props}
        glassEffectStyle="regular"
        colorScheme={tone}
        tintColor={tint}
        isInteractive={interactive}
        style={[{ overflow: 'hidden' }, style]}
      />
    );
  }
  const fallback = tone === 'dark' ? 'rgba(20,16,12,0.5)' : 'rgba(246,241,234,0.94)';
  return <View {...props} style={[{ backgroundColor: fallback, overflow: 'hidden' }, style]} />;
}
