import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/lib/auth';

import { color } from '@/theme';

export default function AuthLayout() {
  if (useAuth().user) return <Redirect href="/" />;
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.bg } }} />;
}
