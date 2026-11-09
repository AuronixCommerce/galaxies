# GalaxyBets → Firebase + Vercel migration

**Not completed. Do not launch a real-money deployment from this workspace.**

## Verified starting point

- Source repository: `wwal3x60-ui/galaxybets` (SolidJS + Vite frontend, Express + Socket.IO backend, MySQL).
- Target: `AuronixCommerce/galaxies`.
- Original backend does `sql.query(...)` throughout the API, caches, and games, and uses MySQL transactions to protect balances and settlements.
- The original frontend stores its own JWT and calls `/auth/login` and `/auth/register`, so both frontend and backend must change together.
- Existing Socket.IO connections need deployment/runtime validation on Vercel; simply building Vite is insufficient.

## Target architecture

- Frontend: Vercel Vite build serving SPA routes.
- API: Vercel-compatible Node.js route handlers / supported Express entrypoint.
- Authentication: Firebase Authentication email/password; ID tokens validated via Firebase Admin SDK in every protected API.
- Database: Cloud Firestore, with server-only access for wallet and game state.
- Realtime: evaluate Vercel-compatible Socket.IO implementation or switch to a managed realtime provider / Firestore listeners where appropriate; prove behavior under multiple instances.
- Server jobs: scheduled functions / durable queues rather than in-memory loops or server startup jobs.
- Financial ledger: append-only transactions and atomic, idempotent Firestore transactions; no client-authorized balance changes.

## Migration checklist

1. Import all legitimate source code and assets (without Git history if licensing or ownership terms require it) into this destination repository. Audit backup SQL files and secrets before publishing.
2. Set up a Firebase project, enable Authentication providers, create Firestore, and record project IDs. Do not share the service-account private key in chat or Git.
3. Migrate user sign-in and sign-up UI to Firebase SDK; replace original JWT in API requests with Firebase ID tokens.
4. Replace backend auth guards and map old user IDs to Firebase UIDs; plan import of password hashes only where Firebase supports the existing hash format, otherwise use password resets.
5. Replace each MySQL query and transaction with reviewed Firestore data access. Audit every game, balance, payout, refund, affiliate, withdrawal, and admin route.
6. Design Firestore document IDs and indexes. Do not directly translate relational joins; design query models and server-only wallet ledger.
7. Refactor Socket.IO, caches, timers, and background workers so they work across serverless instances and do not rely on process-local state.
8. Add safe Firestore Security Rules (initially deny all client access), Vercel environment variables, and CORS / allowed domains.
9. Build, test end-to-end including concurrency/double-spend tests, login, logout, payout idempotency, and authorization; review licensing and regulatory compliance.
10. Deploy to Vercel only when all critical workflows pass and monitoring is configured.

## Firebase environment variables

Frontend build variables:
```dotenv
VITE_FIREBASE_API_KEY=your_public_web_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_APP_ID=your-web-app-id
```

Backend-only variables (Vercel encrypted environment variables):
```dotenv
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY=your-service-account-private-key
```

Never prefix admin secrets with `VITE_`; those variables are embedded into the browser bundle.

## Scaffolded code

- `migration/firebase/admin.js`: initialized Firebase Admin SDK, intended for the backend only.
- `migration/firebase/requireAuth.js`: sample Express middleware to verify Firebase ID tokens server-side.
- `migration/firebase/client.js`: Firebase Web SDK initialization template.
- `firestore.rules`: default-deny Firestore rules (safe but not functional for direct client reads/writes).

These files are *isolated migration templates*, not yet wired to the source code. They intentionally do not impersonate a full migration.

## Local checkout and push

If you have already cloned the original into `C:\Codes\galaxybetsupdated`, first inspect the destination remote and import files only after auditing the source. You can connect the target repo with:
```powershell
cd C:\Codes\galaxybetsupdated
git remote add galaxies https://github.com/AuronixCommerce/galaxies.git
```
Do not force push to the destination: it already contains migration documentation, and the current source and destination histories are unrelated. Prefer a clean checkout / copied source files on a new branch, or import via a PR.

## Important constraints

Firebase Authentication alone cannot replace MySQL, and Vercel cannot guarantee legacy continuously-running process behavior. Do not remove the Render deployment or MySQL data until production parity is verified and a rollback plan is ready.
