import { Link } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';

import { AuthShell, authText as s } from '@/AuthShell';
import { authMessage, logIn } from '@/lib/auth';
import { Button, Field, Notice } from '@/ui';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!email.trim() || !password) return setError('Enter your email and password.');
    setBusy(true);
    setError('');
    try {
      await logIn(email, password);
    } catch (e) {
      setError(authMessage(e));
      setBusy(false);
    }
  }

  return (
    <AuthShell title="Welcome back" subtitle="Log in to explore designs and visualize your space.">
      {!!error && <Notice text={error} />}
      <Field
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <Field
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Your password"
        secureTextEntry
        autoComplete="current-password"
        textContentType="password"
        onSubmitEditing={submit}
      />
      <Link href="/forgot" style={s.link}>
        Forgot password?
      </Link>
      <Button label="Log in" onPress={submit} loading={busy} />
      <Text style={s.footer}>
        New here?{' '}
        <Link href="/signup" style={s.strong}>
          Create an account
        </Link>
      </Text>
    </AuthShell>
  );
}
