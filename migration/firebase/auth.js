// SolidJS/Vite-compatible Firebase Authentication helpers.
// Integrate in src/components/Signin/signin.jsx and src/contexts/usercontextprovider.jsx
// only after backend identity and user-profile endpoints are migrated.
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { firebaseAuth } from './client';

export async function registerWithEmail(email, password) {
  const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  await sendEmailVerification(credential.user);
  return credential.user;
}

export async function loginWithEmail(email, password) {
  const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return credential.user;
}

export async function requestPasswordReset(email) {
  await sendPasswordResetEmail(firebaseAuth, email);
}

export async function logoutFirebase() {
  await signOut(firebaseAuth);
}

export async function getFirebaseIdToken() {
  const user = firebaseAuth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}

export function watchFirebaseAuth(callback) {
  return onAuthStateChanged(firebaseAuth, callback);
}
