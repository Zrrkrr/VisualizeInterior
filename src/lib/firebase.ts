import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
// @ts-expect-error -- exported by firebase/auth's react-native build, missing from the web typings
import { getAuth, getReactNativePersistence, initializeAuth, type Auth } from 'firebase/auth';
import { Platform } from 'react-native';

// Firebase web config is public by design; access is controlled by Firebase Auth and security rules.
const firebaseConfig = {
  apiKey: 'AIzaSyDbwrtuE-i__q-C-AWOTudNqSRu_Ym_En4',
  authDomain: 'visualize-interior.firebaseapp.com',
  projectId: 'visualize-interior',
  storageBucket: 'visualize-interior.appspot.com',
  messagingSenderId: '1040404143225',
  appId: '1:1040404143225:web:097649987e9bce0ac508a8',
};

const fresh = getApps().length === 0;
const app = fresh ? initializeApp(firebaseConfig) : getApp();

export const auth: Auth =
  Platform.OS === 'web' || !fresh
    ? getAuth(app)
    : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
