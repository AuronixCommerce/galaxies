# Firebase migration components

These modules are **templates, not wired into the source application**.

- `client.js`: initializes the provided `galaxybets-3e439` Firebase Web project, with optional Vite environment overrides.
- `auth.js`: email/password registration, login, verification email, password reset, logout, and ID token retrieval.
- `admin.js`: Firebase Admin SDK, requiring service-account credentials in server-only environment variables.
- `requireAuth.js`: sample Express middleware verifying Firebase ID tokens and verified email status.

To use in the original SolidJS app:

1. Install `firebase` and `firebase-admin` (backend dependency only).
2. Move / import frontend modules into `src/`, then replace existing `/auth/login` and `/auth/register` flows.
3. Change the API client to attach `Authorization: Bearer <Firebase ID token>` and update the backend authorization guard. Avoid writing Firebase ID tokens to JavaScript-readable cookies.
4. Use the verified Firebase UID in server-side Firestore profiles; store usernames separately, with uniqueness enforced by server-side transactions.
5. Implement secure server-managed wallets, settlements, and game logic before enabling wagering.
6. Keep all privileged data mutations in backend code and deploy restrictive Firestore Rules.

**Firebase project:** `galaxybets-3e439`. Firebase Auth and Firestore must be enabled in the Firebase Console, and authorized production domain(s) configured. No Firebase Admin private keys have been committed.
