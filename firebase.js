// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbwrtuE-i__q-C-AWOTudNqSRu_Ym_En4",
  authDomain: "visualize-interior.firebaseapp.com",
  projectId: "visualize-interior",
  storageBucket: "visualize-interior.appspot.com",
  messagingSenderId: "1040404143225",
  appId: "1:1040404143225:web:097649987e9bce0ac508a8",
};

// Initialize Firebase

let app;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const auth = getAuth(app);

export { auth };
