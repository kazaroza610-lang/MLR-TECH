/* Schémas de validation serveur (zod) — toutes les entrées
   utilisateur sont validées ici, en plus du contrôle navigateur. */
import { z } from 'zod';

const optStr = (max) => z.string().trim().max(max).optional().or(z.literal(''));

export const registerSchema = z.object({
  first_name: z.string().trim().min(1).max(80),
  last_name:  z.string().trim().min(1).max(80),
  email:      z.string().trim().email().max(160),
  password:   z.string().min(8).max(200),
  phone:      optStr(40),
});

export const loginSchema = z.object({
  email:    z.string().trim().email().max(160),
  password: z.string().min(1).max(200),
});

export const profileSchema = z.object({
  first_name: z.string().trim().min(1).max(80),
  last_name:  z.string().trim().min(1).max(80),
  phone:      optStr(40),
});

export const addressSchema = z.object({
  recipient: optStr(120),
  line1:     z.string().trim().min(1).max(200),
  line2:     optStr(200),
  city:      z.string().trim().min(1).max(120),
  region:    optStr(120),
  phone:     optStr(40),
  country:   optStr(80),
});

export const orderSchema = z.object({
  items: z.array(z.object({
    product_id: z.string().max(40),
    name:       z.string().max(200),
    price_eur:  z.number().nonnegative(),
    qty:        z.number().int().positive().max(999),
  })).min(1).max(100),
});
