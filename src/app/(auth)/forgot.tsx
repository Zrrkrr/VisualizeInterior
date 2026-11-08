import { router } from 'expo-router';
import { useState } from 'react';

import { AuthShell } from '@/AuthShell';
import { authMessage, resetPassword } from '@/lib/auth';
import { Button, Field, Notice } from '@/ui';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!email.trim()) return setError('Enter the email you signed up with.');
    setBusy(true);
    setError('');
    try {
      await resetPassword(email);
      setSent(true);
    } catch (e) {
      setError(authMessage(e));
    }
    setBusy(false);
  }

  return (
    <AuthShell title="Reset password" subtitle="We’ll email you a link to choose a new password.">
      {!!error && <Notice text={error} />}
      {sent && <Notice tone="info" text={`If an account exists for ${email.trim()}, a reset link is on its way.`} />}
      <Field
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        onSubmitEditing={submit}
      />
      <Button label={sent ? 'Send again' : 'Send reset link'} onPress={submit} loading={busy} />
      <Button label="Back to log in" variant="ghost" onPress={() => router.replace('/login')} />
    </AuthShell>
  );
}
