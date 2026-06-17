import { sql, genOrderNumber } from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';
import { orderSchema } from '../lib/validate.js';

export default async function handler(req, res) {
  const a = requireAuth(req, res);
  if (!a) return;

  try {
    if (req.method === 'GET') {
      const id = req.query.id ? Number(req.query.id) : null;
      if (id) {
        // Détail d'une commande — réservé à son propriétaire
        const o = await sql`SELECT * FROM orders WHERE id = ${id} AND user_id = ${a.id}`;
        if (!o.rows.length) return res.status(404).json({ error: 'Commande introuvable.' });
        const items = await sql`SELECT * FROM order_items WHERE order_id = ${id}`;
        return res.status(200).json({ order: o.rows[0], items: items.rows });
      }
      const { rows } = await sql`
        SELECT * FROM orders WHERE user_id = ${a.id} ORDER BY created_at DESC`;
      return res.status(200).json({ orders: rows });
    }

    if (req.method === 'POST') {
      const p = orderSchema.safeParse(req.body || {});
      if (!p.success) return res.status(400).json({ error: 'Commande invalide.' });
      const items = p.data.items;
      const total = items.reduce((s, it) => s + it.price_eur * it.qty, 0);
      const num = genOrderNumber();

      const ins = await sql`
        INSERT INTO orders (user_id, order_number, status, total_eur)
        VALUES (${a.id}, ${num}, 'en_preparation', ${total})
        RETURNING *`;
      const order = ins.rows[0];

      for (const it of items) {
        await sql`
          INSERT INTO order_items (order_id, product_id, name, price_eur, qty)
          VALUES (${order.id}, ${it.product_id}, ${it.name}, ${it.price_eur}, ${it.qty})`;
      }
      return res.status(201).json({ order });
    }

    return res.status(405).json({ error: 'Méthode non autorisée.' });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
}
