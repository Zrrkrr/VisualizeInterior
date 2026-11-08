import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/lib/auth';
import { color } from '@/theme';

export default function InspirationLayout() {
  if (!useAuth().user) return <Redirect href="/login" />;
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.bg } }} />;
}
