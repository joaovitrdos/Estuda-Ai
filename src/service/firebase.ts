import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0bfme35g7ltTct10xwYz0KWwzBmmNqN8",
  authDomain: "estuda-ai-ec755.firebaseapp.com",
  projectId: "estuda-ai-ec755",
  storageBucket: "estuda-ai-ec755.firebasestorage.app",
  messagingSenderId: "309238954858",
  appId: "1:309238954858:web:3663ed0b1df4f22fd90313",
};

const app = initializeApp(firebaseConfig);

// Auth para React Native
export const auth = getAuth(app);
