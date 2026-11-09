// Middleware template. Integrate only after existing auth routes are migrated.
// Firebase ID tokens are verified server-side. Do not trust client-provided UID.
const { adminAuth } = require('./admin');

async function requireFirebaseAuth(req, res, next) {
  const match = /^Bearer (.+)$/i.exec(req.headers.authorization || '');
  if (!match) return res.status(401).json({ error: 'UNAUTHORIZED' });

  try {
    const decoded = await adminAuth().verifyIdToken(match[1], true);
    if (!decoded.email_verified) {
      return res.status(403).json({ error: 'EMAIL_NOT_VERIFIED' });
    }
    req.firebaseUser = decoded;
    req.userId = decoded.uid;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'UNAUTHORIZED' });
  }
}

module.exports = { requireFirebaseAuth };
