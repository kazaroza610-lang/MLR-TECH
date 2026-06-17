/* Point d'accès unique à la base Vercel Postgres.
   @vercel/postgres lit automatiquement la variable
   d'environnement POSTGRES_URL injectée par Vercel. */
export { sql } from '@vercel/postgres';

/* Génère un numéro de commande lisible : MLR-AAAAMMJJ-XXXX */
export function genOrderNumber() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `MLR-${ymd}-${rnd}`;
}
