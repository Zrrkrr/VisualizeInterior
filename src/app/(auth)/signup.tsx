import { Link } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';

import { AuthShell, authText as s } from '@/AuthShell';
import { authMessage, signUp } from '@/lib/auth';
import { Button, Field, Notice } from '@/ui';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!name.trim() || !email.trim() || !password) return setError('Please fill in every field.');
    if (password.length < 6) return setError('Use at least 6 characters for your password.');
    if (password !== confirm) return setError('Passwords don’t match.');
    setBusy(true);
    setError('');
    try {
      await signUp(name, email, password);
    } catch (e) {
      setError(authMessage(e));
      setBusy(false);
    }
  }

  return (
    <AuthShell title="Create account" subtitle="Your new space starts here.">
      {!!error && <Notice text={error} />}
      <Field label="Your name" value={name} onChangeText={setName} placeholder="Your full name" autoComplete="name" />
      <Field
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
      />
      <Field
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="At least 6 characters"
        secureTextEntry
        autoComplete="new-password"
      />
      <Field
        label="Confirm password"
        value={confirm}
        onChangeText={setConfirm}
        placeholder="Type it again"
        secureTextEntry
        autoComplete="new-password"
        onSubmitEditing={submit}
      />
      <Button label="Create account" onPress={submit} loading={busy} />
      <Text style={s.footer}>
        Already have an account?{' '}
        <Link href="/login" style={s.strong}>
          Log in
        </Link>
      </Text>
    </AuthShell>
  );
}
