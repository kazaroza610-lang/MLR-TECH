import { sql } from '../../lib/db.js';
import { getAuth } from '../../lib/auth.js';

export default async function handler(req, res) {
  const a = getAuth(req);
  if (!a) return res.status(200).json({ user: null });
  try {
    const { rows } = await sql`
      SELECT id, email, first_name, last_name, phone, is_admin
      FROM users WHERE id = ${a.id}`;
    return res.status(200).json({ user: rows[0] || null });
  } catch (e) {
    return res.status(200).json({ user: null });
  }
}
