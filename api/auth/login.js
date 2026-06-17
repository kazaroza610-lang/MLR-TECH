import { sql } from '../../lib/db.js';
import { loginSchema } from '../../lib/validate.js';
import { verifyPassword, signToken, setAuthCookie } from '../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée.' });

  const parsed = loginSchema.safeParse(req.body || {});
  if (!parsed.success) return res.status(400).json({ error: 'Données invalides.' });
  const em = parsed.data.email.toLowerCase();

  try {
    const { rows } = await sql`
      SELECT id, email, password_hash, first_name, last_name, phone, is_admin
      FROM users WHERE email = ${em}`;
    const u = rows[0];
    // Même message dans les deux cas → pas d'énumération de comptes
    if (!u || !(await verifyPassword(parsed.data.password, u.password_hash))) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }
    setAuthCookie(res, signToken(u));
    delete u.password_hash;
    return res.status(200).json({ user: u });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur serveur. Réessayez.' });
  }
}
