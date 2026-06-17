import { clearAuthCookie } from '../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée.' });
  clearAuthCookie(res);
  return res.status(200).json({ ok: true });
}
