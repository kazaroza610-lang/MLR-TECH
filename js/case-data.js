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

/* Silhouettes basées sur de vraies photos produit (dos réel, fond détouré).
   Chaque template PNG a son cadre + module caméra réels en pixels opaques et
   son intérieur transparent : le visuel du client est dessiné dans `printZone`
   (coordonnées normalisées 0–1 par rapport à l'image source), puis le template
   est superposé par-dessus pour révéler le cadre et la caméra réels. */
const CASE_SILHOUETTES = {
  apple: {
    image: 'assets/images/products/template-apple.png',
    printZone: { x: 0.10, y: 0.069, w: 0.80, h: 0.909, radius: 0.12 },
  },
  samsung: {
    image: 'assets/images/products/template-samsung.png',
    printZone: { x: 0.1075, y: 0.069, w: 0.7875, h: 0.859, radius: 0.10 },
  },
  generic: {
    image: 'assets/images/products/template-generic.png',
    printZone: { x: 0.1225, y: 0.081, w: 0.755, h: 0.844, radius: 0.10 },
  },
};

/* Couleurs d'appareil génériques (cosmétique, teinte le contour du téléphone) */
const CASE_DEVICE_COLORS = [
  { id: 'argent',  label: 'Argent',        hex: '#c7c9cc' },
  { id: 'noir',    label: 'Noir sidéral',  hex: '#1c1c1e' },
  { id: 'bleu',    label: 'Bleu titane',   hex: '#3a5169' },
  { id: 'or',      label: 'Or',            hex: '#cdb586' },
];

/* Couleurs de coque disponibles pour chaque type (matériau visible derrière le visuel) */
const CASE_COLORS = [
  { id: 'transparent', label: 'Transparent', hex: '#e9e9e9cc' },
  { id: 'noir',         label: 'Noir',        hex: '#1a1a1a' },
  { id: 'blanc',        label: 'Blanc',       hex: '#f5f5f5' },
  { id: 'marine',       label: 'Bleu marine', hex: '#1e3a5f' },
];

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
