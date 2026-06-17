-- ═══════════════════════════════════════════════
-- MLR TECH — Schéma base de données (Vercel Postgres)
-- À exécuter UNE fois depuis l'onglet "Query" de la base.
-- ═══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  phone         TEXT,
  is_admin      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS addresses (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient   TEXT,
  line1       TEXT,
  line2       TEXT,
  city        TEXT,
  region      TEXT,
  postal_code TEXT,
  country     TEXT DEFAULT 'Madagascar',
  phone       TEXT,
  is_default  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id              SERIAL PRIMARY KEY,
  user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_number    TEXT UNIQUE NOT NULL,
  status          TEXT NOT NULL DEFAULT 'en_preparation'
                    CHECK (status IN ('en_preparation','expediee','en_transit','livree')),
  tracking_number TEXT,                       -- prêt pour un transporteur réel
  carrier         TEXT,                       -- nom du transporteur (rempli plus tard)
  total_eur       NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id         SERIAL PRIMARY KEY,
  order_id   INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT,
  name       TEXT,
  price_eur  NUMERIC(10,2),
  qty        INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_orders_user    ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_addresses_user ON addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_orderitems_ord ON order_items(order_id);

-- Pour te déclarer administrateur (après avoir créé ton compte) :
--   UPDATE users SET is_admin = TRUE WHERE email = 'ton-email@exemple.com';
