// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCh-dSjRIwKmv9_6_dQ_qJxsRDG8r9TauU",
  authDomain: "mizpahinternationalchurch.firebaseapp.com",
  projectId: "mizpahinternationalchurch",
  storageBucket: "mizpahinternationalchurch.appspot.com",
  messagingSenderId: "167177222865",
  appId: "1:167177222865:web:c8a74df917af5bd46b23f0",
  measurementId: "G-RX6FW06D63"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app); // ✅ No persistence here
export const db = getFirestore(app);
