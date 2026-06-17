import { sql } from '../../lib/db.js';
import { requireAuth } from '../../lib/auth.js';
import { addressSchema } from '../../lib/validate.js';

export default async function handler(req, res) {
  const a = requireAuth(req, res);
  if (!a) return;

  try {
    if (req.method === 'GET') {
      const { rows } = await sql`
        SELECT * FROM addresses WHERE user_id = ${a.id} ORDER BY id DESC`;
      return res.status(200).json({ addresses: rows });
    }

    if (req.method === 'POST') {
      const p = addressSchema.safeParse(req.body || {});
      if (!p.success) return res.status(400).json({ error: 'Adresse invalide.' });
      const d = p.data;
      const { rows } = await sql`
        INSERT INTO addresses (user_id, recipient, line1, line2, city, region, phone, country)
        VALUES (${a.id}, ${d.recipient || null}, ${d.line1}, ${d.line2 || null},
                ${d.city}, ${d.region || null}, ${d.phone || null}, ${d.country || 'Madagascar'})
        RETURNING *`;
      return res.status(201).json({ address: rows[0] });
    }

    if (req.method === 'DELETE') {
      const id = Number(req.body?.id);
      if (!id) return res.status(400).json({ error: 'Identifiant requis.' });
      // La clause user_id garantit qu'on ne supprime que SES adresses
      await sql`DELETE FROM addresses WHERE id = ${id} AND user_id = ${a.id}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Méthode non autorisée.' });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
}
