import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCh-dSjRIwKmv9_6_dQ_qJxsRDG8r9TauU",
  authDomain: "mizpahinternationalchurch.firebaseapp.com",
  projectId: "mizpahinternationalchurch",
  storageBucket: "mizpahinternationalchurch.appspot.com",
  messagingSenderId: "167177222865",
  appId: "1:167177222865:web:c8a74df917af5bd46b23f0",
  measurementId: "G-RX6FW06D63"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Import persistence dynamically to avoid TypeScript errors
// @ts-ignore
import { getReactNativePersistence } from 'firebase/auth';

// Auth instance with AsyncStorage persistence
export const auth = initializeAuth(app, {
  // @ts-ignore
  persistence: getReactNativePersistence(AsyncStorage)
});

// Firestore instance
export const db = getFirestore(app);