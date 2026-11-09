// Server-side Firebase initialization for future Vercel API functions.
// Install firebase-admin in the migrated application first.
// FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY
// must be set in Vercel environment variables (not committed to Git).
const { initializeApp, getApps, cert, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

function getFirebaseApp() {
  if (getApps().length) return getApps()[0];
  const { FIREBASE_PROJECT_ID: projectId, FIREBASE_CLIENT_EMAIL: clientEmail, FIREBASE_PRIVATE_KEY: privateKey } = process.env;
  if (projectId && clientEmail && privateKey) {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
      projectId,
    });
  }
  // Google Application Default Credentials for local trusted environments.
  return initializeApp({ credential: applicationDefault() });
}

function adminAuth() { return getAuth(getFirebaseApp()); }
function adminDb() { return getFirestore(getFirebaseApp()); }

module.exports = { getFirebaseApp, adminAuth, adminDb };
