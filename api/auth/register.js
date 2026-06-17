import { sql } from '../../lib/db.js';
import { registerSchema } from '../../lib/validate.js';
import { hashPassword, signToken, setAuthCookie } from '../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée.' });

  const parsed = registerSchema.safeParse(req.body || {});
  if (!parsed.success) {
    const msg = parsed.error.issues?.[0]?.message || 'Données invalides.';
    return res.status(400).json({ error: msg });
  }
  const { first_name, last_name, email, password, phone } = parsed.data;
  const em = email.toLowerCase();

  try {
    const exists = await sql`SELECT id FROM users WHERE email = ${em}`;
    if (exists.rows.length) {
      return res.status(409).json({ error: 'Un compte existe déjà avec cet email.' });
    }
    const hash = await hashPassword(password);
    const { rows } = await sql`
      INSERT INTO users (email, password_hash, first_name, last_name, phone)
      VALUES (${em}, ${hash}, ${first_name}, ${last_name}, ${phone || null})
      RETURNING id, email, first_name, last_name, phone, is_admin`;
    const user = rows[0];
    setAuthCookie(res, signToken(user));
    return res.status(201).json({ user });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur serveur. Réessayez.' });
  }
}
