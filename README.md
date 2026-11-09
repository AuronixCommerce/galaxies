# Galaxies — migration workspace

This repository is the destination for migrating the GalaxyBets SolidJS + Express application from MySQL and Render to Firebase Authentication, Cloud Firestore, and Vercel.

**Status: migration in progress — not ready for production or real-money use.**

Source code: https://github.com/wwal3x60-ui/galaxybets

The original site has an extensive MySQL backend. Firebase Auth only replaces identity management; it does not replace database queries, balances, game settlement, or real-time state. These must be rewritten and verified before enabling production features. Never put Firebase Admin credentials in Git, and never enable client-side wallet balance writes.

See the migration instructions added in this repository. Do not deploy it as a fully functional casino until completed, audited, and tested.
