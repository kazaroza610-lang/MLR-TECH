/* ── Configurateur de coques — données statiques ───────────── */

const CASE_BRANDS = [
  {
    id: 'apple', label: 'Apple', silhouette: 'apple',
    models: [
      'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
      'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
      'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 Mini',
      'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 Mini',
      'iPhone SE (2022)', 'iPhone SE (2020)',
      'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
    ],
  },
  {
    id: 'samsung', label: 'Samsung', silhouette: 'samsung',
    models: [
      'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24',
      'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23',
      'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22',
      'Galaxy A54', 'Galaxy A34', 'Galaxy A14',
      'Galaxy Z Fold 5', 'Galaxy Z Flip 5',
    ],
  },
  {
    id: 'xiaomi', label: 'Xiaomi', silhouette: 'generic',
    models: [
      'Xiaomi 14 Pro', 'Xiaomi 14', 'Xiaomi 13 Pro', 'Xiaomi 13', 'Xiaomi 13T',
      'Redmi Note 13 Pro', 'Redmi Note 12', 'Redmi 12',
      'POCO X6 Pro', 'POCO F5',
    ],
  },
  {
    id: 'google', label: 'Google', silhouette: 'generic',
    models: [
      'Pixel 8 Pro', 'Pixel 8', 'Pixel 7a', 'Pixel 7 Pro', 'Pixel 7',
      'Pixel 6a', 'Pixel 6 Pro', 'Pixel 6',
    ],
  },
  {
    id: 'oneplus', label: 'OnePlus', silhouette: 'generic',
    models: [
      'OnePlus 12', 'OnePlus 11', 'OnePlus 10 Pro', 'OnePlus 10T',
      'OnePlus Nord 3', 'OnePlus Nord CE 3',
    ],
  },
  {
    id: 'huawei', label: 'Huawei', silhouette: 'generic',
    models: [
      'P60 Pro', 'P50 Pro', 'Mate 50 Pro', 'Mate 40 Pro',
      'Nova 11', 'Nova 10',
    ],
  },
  {
    id: 'oppo', label: 'Oppo', silhouette: 'generic',
    models: [
      'Find X6 Pro', 'Find X5 Pro', 'Reno 11', 'Reno 10', 'A98', 'A78',
    ],
  },
];

/* Silhouettes génériques : coordonnées normalisées (0–1) sur un canvas carré.
   `camera` décrit la forme du module caméra à exclure de la zone imprimable. */
const CASE_SILHOUETTES = {
  apple: {
    body: { x: 0.16, y: 0.05, w: 0.68, h: 0.90, radius: 0.16 },
    printZone: { x: 0.19, y: 0.08, w: 0.62, h: 0.84, radius: 0.13 },
    camera: { type: 'apple-module', x: 0.24, y: 0.11, w: 0.22, h: 0.22, radius: 0.05 },
  },
  samsung: {
    body: { x: 0.16, y: 0.05, w: 0.68, h: 0.90, radius: 0.12 },
    printZone: { x: 0.19, y: 0.08, w: 0.62, h: 0.84, radius: 0.10 },
    camera: { type: 'samsung-strip', x: 0.24, y: 0.10, w: 0.07, h: 0.20 },
  },
  generic: {
    body: { x: 0.16, y: 0.05, w: 0.68, h: 0.90, radius: 0.10 },
    printZone: { x: 0.19, y: 0.08, w: 0.62, h: 0.84, radius: 0.08 },
    camera: { type: 'single-circle', x: 0.27, y: 0.13, w: 0.12, h: 0.12 },
  },
};

/* Types de coque disponibles */
const CASE_TYPES = [
  { id: 'rigide-fine',        label: 'Coque rigide - Extra fine',             description: 'Plastique fin et léger',         sides: 'back',           price_eur: 19.99, popular: false },
  { id: 'silicone',           label: 'Coque silicone souple',                 description: 'Flexible et antichoc',           sides: 'back',           price_eur: 22.99, popular: true  },
  { id: 'cordon',             label: 'Coque à cordon - Mains libres',         description: 'Avec bandoulière',                sides: 'back',           price_eur: 26.99, popular: false },
  { id: 'rigide-integrale',   label: 'Coque rigide - Impression intégrale',   description: 'Impression bords compris',       sides: 'front-back-edge', price_eur: 27.99, popular: false },
  { id: 'magsafe',            label: 'Coque MagSafe - Protection premium',    description: 'Compatible MagSafe',              sides: 'back',           price_eur: 29.99, popular: true  },
  { id: 'renforcee',          label: 'Coque renforcée - Double protection',   description: 'Antichoc renforcé',               sides: 'back-edge',      price_eur: 25.99, popular: false },
  { id: 'portefeuille-avant', label: 'Coque portefeuille - Impression avant', description: 'Avec porte-cartes',               sides: 'front',          price_eur: 24.99, popular: false },
  { id: 'portefeuille-complete', label: 'Coque portefeuille - Impression complète', description: 'Avec porte-cartes',        sides: 'front-back',     price_eur: 28.99, popular: false },
];

const CASE_SIDES_LABEL = {
  back: 'Arrière uniquement',
  front: 'Avant uniquement',
  'front-back': 'Avant + Arrière',
  'front-back-edge': 'Avant + Arrière + Bords',
  'back-edge': 'Arrière + Bords',
};
