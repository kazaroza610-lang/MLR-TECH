import { sql } from '../../lib/db.js';
import { requireAuth } from '../../lib/auth.js';

const STATUSES = ['en_preparation', 'expediee', 'en_transit', 'livree'];

export default async function handler(req, res) {
  const a = requireAuth(req, res);
  if (!a) return;

  try {
    // Vérification fraîche en base (le jeton pourrait être antérieur à l'octroi du rôle)
    const who = await sql`SELECT is_admin FROM users WHERE id = ${a.id}`;
    if (!who.rows[0]?.is_admin) return res.status(403).json({ error: 'Accès réservé à l’administration.' });

    if (req.method === 'GET') {
      const { rows } = await sql`
        SELECT o.*, u.email
        FROM orders o
        JOIN users u ON u.id = o.user_id
        ORDER BY o.created_at DESC`;
      return res.status(200).json({ orders: rows });
    }

    if (req.method === 'PUT') {
      const { id, status, tracking_number, carrier } = req.body || {};
      if (!id || !STATUSES.includes(status)) {
        return res.status(400).json({ error: 'Statut ou identifiant invalide.' });
      }
      const { rows } = await sql`
        UPDATE orders
        SET status = ${status},
            tracking_number = ${tracking_number || null},
            carrier = ${carrier || null},
            updated_at = now()
        WHERE id = ${Number(id)}
        RETURNING *`;
      return res.status(200).json({ order: rows[0] });
    }

    return res.status(405).json({ error: 'Méthode non autorisée.' });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
}
