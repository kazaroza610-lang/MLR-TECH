import { sql } from '../lib/db.js';
import { getAuth, requireAuth } from '../lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  /* ── GET : liste des avis pour un produit ── */
  if (req.method === 'GET') {
    const { product_id } = req.query;
    if (!product_id) return res.status(400).json({ error: 'product_id requis.' });

    try {
      const { rows } = await sql`
        SELECT r.id, r.rating, r.comment, r.created_at,
               u.first_name,
               LEFT(u.last_name, 1) AS last_name_initial
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.product_id = ${product_id}
        ORDER BY r.created_at DESC
      `;

      // Vérifie si l'utilisateur courant a déjà laissé un avis
      let user_review = null;
      try {
        const user = await getAuth(req);
        if (user) {
          const { rows: existing } = await sql`
            SELECT id FROM reviews WHERE product_id = ${product_id} AND user_id = ${user.id}
          `;
          user_review = existing[0] || null;
        }
      } catch (_) {}

      return res.status(200).json({ reviews: rows, user_review });
    } catch (e) {
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
  }

  /* ── POST : publier un avis (authentifié) ── */
  if (req.method === 'POST') {
    const user = await requireAuth(req, res);
    if (!user) return;

    const { product_id, rating, comment } = req.body || {};

    if (!product_id || !rating || !comment) {
      return res.status(400).json({ error: 'Champs manquants.' });
    }
    const r = parseInt(rating, 10);
    if (isNaN(r) || r < 1 || r > 5) {
      return res.status(400).json({ error: 'Note invalide (1 à 5).' });
    }
    const c = String(comment).trim();
    if (c.length < 10) {
      return res.status(400).json({ error: 'Commentaire trop court (10 caractères minimum).' });
    }

    try {
      const { rows: existing } = await sql`
        SELECT id FROM reviews WHERE product_id = ${product_id} AND user_id = ${user.id}
      `;
      if (existing.length) {
        return res.status(409).json({ error: 'Vous avez déjà laissé un avis pour ce produit.' });
      }

      const { rows } = await sql`
        INSERT INTO reviews (product_id, user_id, rating, comment)
        VALUES (${product_id}, ${user.id}, ${r}, ${c})
        RETURNING id
      `;
      return res.status(201).json({ review_id: rows[0].id });
    } catch (e) {
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
  }

  return res.status(405).json({ error: 'Méthode non autorisée.' });
}
