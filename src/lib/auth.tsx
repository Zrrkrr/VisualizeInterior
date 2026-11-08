import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { auth } from './firebase';

type AuthState = { user: User | null; ready: boolean; displayName: string };

const AuthContext = createContext<AuthState>({ user: null, ready: false, displayName: '' });

let publish: (user: User | null) => void = () => {};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, ready: false, displayName: '' });

  useEffect(() => {
    publish = (user) => setState({ user, ready: true, displayName: user?.displayName ?? '' });
    return onAuthStateChanged(auth, publish);
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export const logIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email.trim(), password);

export async function signUp(name: string, email: string, password: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password);
  await updateProfile(user, { displayName: name.trim() });
  // onAuthStateChanged fired before the name was set, so push the updated user to the UI.
  publish(user);
}

export const resetPassword = (email: string) => sendPasswordResetEmail(auth, email.trim());

export const logOut = () => signOut(auth);

export function authMessage(error: unknown): string {
  const code = error instanceof FirebaseError ? error.code : '';
  switch (code) {
    case 'auth/invalid-email':
      return 'That email address doesn’t look right.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email or password is incorrect.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try logging in.';
    case 'auth/weak-password':
      return 'Use at least 6 characters for your password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a minute and try again.';
    case 'auth/network-request-failed':
      return 'No internet connection. Check your network and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
