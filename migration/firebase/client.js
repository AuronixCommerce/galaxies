// Firebase web configuration for GalaxyBets (public client identifiers).
// These settings are not service-account credentials.
// For a different Firebase project, override using VITE_FIREBASE_* variables.
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCTuCst8hblsyZLAjoI6EZgTd0dfXVwuAc',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'galaxybets-3e439.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://galaxybets-3e439-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'galaxybets-3e439',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'galaxybets-3e439.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '254929974667',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:254929974667:web:d36292cb437225054e2b8e',
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
