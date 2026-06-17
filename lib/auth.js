/* ═══════════════════════════════════════════════
   Authentification — hash bcrypt + JWT en cookie httpOnly
   ═══════════════════════════════════════════════ */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const COOKIE  = 'mlr_token';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 jours (secondes)

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error('JWT_SECRET manquant dans les variables d’environnement.');
  return s;
}

/* ── Mots de passe ── */
export async function hashPassword(pw)         { return bcrypt.hash(pw, 12); }
export async function verifyPassword(pw, hash) { return bcrypt.compare(pw, hash); }

/* ── JWT ── */
export function signToken(user) {
  return jwt.sign(
    { uid: user.id, email: user.email, adm: !!user.is_admin },
    secret(),
    { expiresIn: MAX_AGE }
  );
}

/* ── Cookies ── */
export function setAuthCookie(res, token) {
  res.setHeader('Set-Cookie',
    `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${MAX_AGE}`);
}
export function clearAuthCookie(res) {
  res.setHeader('Set-Cookie',
    `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`);
}

function readCookie(req) {
  if (req.cookies && req.cookies[COOKIE]) return req.cookies[COOKIE];
  const h = req.headers?.cookie;
  if (!h) return null;
  const part = h.split(';').map(s => s.trim()).find(s => s.startsWith(COOKIE + '='));
  return part ? decodeURIComponent(part.slice(COOKIE.length + 1)) : null;
}

/* Retourne { id, email, is_admin } depuis le cookie, ou null */
export function getAuth(req) {
  try {
    const tok = readCookie(req);
    if (!tok) return null;
    const p = jwt.verify(tok, secret());
    return { id: p.uid, email: p.email, is_admin: !!p.adm };
  } catch (_) {
    return null;
  }
}

/* Garde « connecté » — répond 401 et renvoie null si non authentifié */
export function requireAuth(req, res) {
  const u = getAuth(req);
  if (!u) { res.status(401).json({ error: 'Non authentifié.' }); return null; }
  return u;
}
