import { sql } from '../../lib/db.js';
import { requireAuth } from '../../lib/auth.js';
import { profileSchema } from '../../lib/validate.js';

export default async function handler(req, res) {
  const a = requireAuth(req, res);
  if (!a) return;

  try {
    if (req.method === 'GET') {
      const { rows } = await sql`
        SELECT id, email, first_name, last_name, phone, is_admin
        FROM users WHERE id = ${a.id}`;
      return res.status(200).json({ user: rows[0] });
    }

    if (req.method === 'PUT') {
      const p = profileSchema.safeParse(req.body || {});
      if (!p.success) return res.status(400).json({ error: 'Données invalides.' });
      const { first_name, last_name, phone } = p.data;
      const { rows } = await sql`
        UPDATE users
        SET first_name = ${first_name}, last_name = ${last_name}, phone = ${phone || null}
        WHERE id = ${a.id}
        RETURNING id, email, first_name, last_name, phone, is_admin`;
      return res.status(200).json({ user: rows[0] });
    }

    return res.status(405).json({ error: 'Méthode non autorisée.' });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
}
