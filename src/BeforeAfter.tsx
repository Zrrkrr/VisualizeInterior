import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRef, useState, type ComponentRef } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';

import { Glass } from './Glass';
import { color, font, radius } from './theme';

/** Drag the handle to compare the original photo (left) with the redesign (right). */
export function BeforeAfter({ before, after, aspectRatio }: { before: string; after: string; aspectRatio: number }) {
  const box = useRef<ComponentRef<typeof View>>(null);
  const frame = useRef({ left: 0, width: 1 });
  const [width, setWidth] = useState(0);
  const [split, setSplit] = useState(0.5);

  const moveTo = (pageX: number) =>
    setSplit(Math.min(1, Math.max(0, (pageX - frame.current.left) / frame.current.width)));

  // The handlers only read refs when a gesture fires, never during render.
  // eslint-disable-next-line react-hooks/refs
  const [pan] = useState(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (_, g) => moveTo(g.x0),
      onPanResponderMove: (_, g) => moveTo(g.moveX),
    }),
  );

  return (
    <View
      ref={box}
      accessible
      accessibilityLabel="Before and after comparison. Drag to compare."
      onLayout={(e) => {
        setWidth(e.nativeEvent.layout.width);
        box.current?.measureInWindow((left: number, _top: number, w: number) => (frame.current = { left, width: w || 1 }));
      }}
      style={[s.box, { aspectRatio }]}
      {...pan.panHandlers}>
      <Image source={{ uri: after }} style={StyleSheet.absoluteFill} contentFit="cover" />
      <View style={[s.clip, { width: width * split }]}>
        <Image source={{ uri: before }} style={{ width, height: '100%' }} contentFit="cover" />
      </View>
      <Glass tone="dark" pointerEvents="none" style={[s.tag, { left: 12 }]}>
        <Text style={s.tagText}>Before</Text>
      </Glass>
      <Glass tone="dark" pointerEvents="none" style={[s.tag, { right: 12 }]}>
        <Text style={s.tagText}>After</Text>
      </Glass>
      <View pointerEvents="none" style={[s.line, { left: width * split - 1 }]}>
        <View style={s.knob}>
          <Ionicons name="code-outline" size={18} color={color.text} />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  box: { width: '100%', borderRadius: radius.lg, overflow: 'hidden', backgroundColor: color.surfaceAlt },
  clip: { position: 'absolute', top: 0, bottom: 0, left: 0, overflow: 'hidden' },
  line: { position: 'absolute', top: 0, bottom: 0, width: 2, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  knob: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tag: { position: 'absolute', top: 12, paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
  tagText: { fontFamily: font.semibold, fontSize: 12, color: '#fff' },
});
