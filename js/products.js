const PRODUCTS = [
  /* ── TÉLÉPHONE ────────────────────────────── */
  {
    id:'p001', category:'telephone',
    name:{ fr:'Powerbank 30 000 mAh', mg:'Powerbank 30 000 mAh' },
    description:{ fr:'Batterie externe haute capacité, charge rapide USB-C 65W, indicateur LED', mg:"Bateria ivelany kapasité avo, USB-C 65W, fampisehoana LED" },
    features:{ fr:['30 000 mAh','Charge rapide 65W','2× USB-A + 1× USB-C','Affichage LED','Garantie 2 ans'], mg:['30 000 mAh','Fandehanana haingana 65W','2× USB-A + 1× USB-C','LED','Toky 2 taona'] },
    price_eur:18, image:'https://picsum.photos/seed/pb30k/400/400', rating:4.5
  },
  {
    id:'p002', category:'telephone',
    name:{ fr:'Câble USB-C 2 m Tressé', mg:'Tariby USB-C 2m Voafatotra' },
    description:{ fr:'Nylon tressé renforcé, charge rapide 100 W, compatible iPhone 15 et Android', mg:"Nylon voafatotra, 100W, mifanaraka iPhone 15 sy Android" },
    features:{ fr:['Longueur 2 m','Nylon tressé','100 W charge rapide','480 Mb/s transfert','Universel'], mg:['Lavany 2m','Nylon voafatotra','100W','480Mb/s','Eran-tsefo'] },
    price_eur:8, image:'https://picsum.photos/seed/usbc2m/400/400', rating:4.3
  },
  {
    id:'p003', category:'telephone',
    name:{ fr:'Chargeur GaN 65 W 3-en-1', mg:'Mpanafana GaN 65W 3-in-1' },
    description:{ fr:'Chargeur compact GaN avec 2 USB-C et 1 USB-A, charge simultanée', mg:"Mpanafana maivana GaN, 2 USB-C sy 1 USB-A, mampandeha miaraka" },
    features:{ fr:['65 W total','2× USB-C + 1× USB-A','Technologie GaN','Multi-appareils','Protection surtension'], mg:['65W total','2× USB-C + 1× USB-A','GaN','Multi-fitaovana','Fiarovana'] },
    price_eur:25, image:'https://picsum.photos/seed/gan65w/400/400', rating:4.6
  },
  {
    id:'p004', category:'telephone',
    name:{ fr:'Coque MagSafe Anti-choc', mg:'Coque MagSafe Anti-choc' },
    description:{ fr:'Protection renforcée compatible MagSafe, matière recyclée, certifiée MIL-STD', mg:"Fiarovana noho-choc mifanaraka MagSafe, akora azo averina, MIL-STD" },
    features:{ fr:['Compatible MagSafe','Anti-choc MIL-STD','Matière recyclée','Anti-rayures','Fine 1,5 mm'], mg:['MagSafe','MIL-STD','Akora azo averina','Anti-fety','1,5mm'] },
    price_eur:12, image:'https://picsum.photos/seed/coqmag/400/400', rating:4.2
  },
  {
    id:'p005', category:'telephone',
    name:{ fr:'Support Magnétique Voiture 360°', mg:'Tomponandraikitra Magnétique Fiara 360°' },
    description:{ fr:'Support universel pour tableau de bord ou grille d\'aération, rotation 360°', mg:"Tomponandraikitra eran-tsefo, fihodinana 360°" },
    features:{ fr:['Rotation 360°','Fixation magnétique forte','Tableau de bord / grille','Installation en 1 clic','Universel'], mg:['Fihodinana 360°','Magnétique mahery','Tableau de bord / grille','1 click','Eran-tsefo'] },
    price_eur:15, image:'https://picsum.photos/seed/carphold/400/400', rating:4.4
  },

  /* ── SON & IMAGE ──────────────────────────── */
  {
    id:'p006', category:'son-image',
    name:{ fr:'Écouteurs TWS Pro ANC 32 h', mg:'Sofina TWS Pro ANC 32h' },
    description:{ fr:'Réduction active du bruit, autonomie 32 h avec boîtier, IPX5, charge 10 min = 3 h', mg:"ANC, 32h, IPX5, fandefasana 10min=3h" },
    features:{ fr:['ANC hybride','32 h autonomie totale','Bluetooth 5.3','IPX5 waterproof','Charge rapide 10 min → 3 h'], mg:['ANC','32h','Bluetooth 5.3','IPX5','10min→3h'] },
    price_eur:45, image:'https://picsum.photos/seed/twspro/400/400', rating:4.7
  },
  {
    id:'p007', category:'son-image',
    name:{ fr:'Casque Studio Pro Noise-Cancel', mg:'Casque Studio Pro Noise-Cancel' },
    description:{ fr:'Casque over-ear Hi-Res Audio, ANC 40 dB, 30 h autonomie, Bluetooth + jack 3,5 mm', mg:"Casque over-ear Hi-Res, ANC 40dB, 30h, Bluetooth + jack 3.5mm" },
    features:{ fr:['ANC hybride 40 dB','Hi-Res Audio certifié','30 h autonomie','BT 5.0 + Jack 3,5 mm','Arceau pliable'], mg:['ANC 40dB','Hi-Res','30h','BT 5.0 + Jack','Azo alena'] },
    price_eur:89, image:'https://picsum.photos/seed/headpro/400/400', rating:4.8
  },
  {
    id:'p008', category:'son-image',
    name:{ fr:'Enceinte Bluetooth 20 W IP67', mg:'Fitaovana Feo Bluetooth 20W IP67' },
    description:{ fr:'Son 360° puissant, IP67 waterproof, 24 h autonomie, compatible TWS stéréo', mg:"Feo 360°, IP67, 24h, TWS stéréo" },
    features:{ fr:['20 W RMS','Son 360°','IP67 waterproof','24 h autonomie','Mode TWS paire stéréo'], mg:['20W RMS','360°','IP67','24h','TWS stéréo'] },
    price_eur:35, image:'https://picsum.photos/seed/btspkr/400/400', rating:4.5
  },
  {
    id:'p009', category:'son-image',
    name:{ fr:'Barre de Son 2.1 Dolby Atmos 120 W', mg:'Barre Feo 2.1 Dolby Atmos 120W' },
    description:{ fr:'Barre avec caisson basses externe, Dolby Atmos, HDMI ARC, Bluetooth 5.0', mg:"Barre miaraka amin'ny basses ivelany, Dolby Atmos, HDMI ARC" },
    features:{ fr:['120 W total','Dolby Atmos','HDMI ARC','Bluetooth 5.0','Télécommande incluse'], mg:['120W','Dolby Atmos','HDMI ARC','Bluetooth 5.0','Télécommande'] },
    price_eur:150, image:'https://picsum.photos/seed/sndbar/400/400', rating:4.6
  },

  /* ── BUREAU & GAMING ──────────────────────── */
  {
    id:'p010', category:'bureau-gaming',
    name:{ fr:'Souris Gaming RGB 16 000 DPI', mg:'Sary Gaming RGB 16 000 DPI' },
    description:{ fr:'Capteur optique précis 16 000 DPI, 7 boutons programmables, RGB 16,8 M couleurs', mg:"Capteur 16 000 DPI, bouton programmables 7, RGB 16,8M loko" },
    features:{ fr:['16 000 DPI ajustable','7 boutons programmables','RGB 16,8 M couleurs','Polling 1 000 Hz','Ergonomie droitier'], mg:['16 000 DPI','7 bouton','RGB 16,8M','1000Hz','Ergonomika'] },
    price_eur:30, image:'https://picsum.photos/seed/mouse16/400/400', rating:4.5
  },
  {
    id:'p011', category:'bureau-gaming',
    name:{ fr:'Clavier Mécanique RGB TKL', mg:'Klaviez Mécanique RGB TKL' },
    description:{ fr:'Switches Red linéaires, rétroéclairage RGB par touche, boîtier aluminium CNC', mg:"Switches Red, RGB isaky ny fanalahidy, aluminium CNC" },
    features:{ fr:['Switches Red linéaires','RGB par touche','Tenkeyless compact','USB-C détachable','Boîtier aluminium'], mg:['Switches Red','RGB','Compact TKL','USB-C','Aluminium'] },
    price_eur:65, image:'https://picsum.photos/seed/mechkbd/400/400', rating:4.7
  },
  {
    id:'p012', category:'bureau-gaming',
    name:{ fr:'Webcam 4K 60 fps Autofocus AI', mg:'Webcam 4K 60fps Autofocus AI' },
    description:{ fr:'Webcam professionnelle 4K avec autofocus AI, micro stéréo intégré, HDR', mg:"Webcam matihanina 4K, autofocus AI, micro stéréo, HDR" },
    features:{ fr:['4K 30 fps / 1080p 60 fps','Autofocus AI','Micro stéréo','HDR','Plug & Play'], mg:['4K/1080p 60fps','Autofocus AI','Micro stéréo','HDR','Plug & Play'] },
    price_eur:40, image:'https://picsum.photos/seed/webcam4k/400/400', rating:4.4
  },
  {
    id:'p013', category:'bureau-gaming',
    name:{ fr:'Hub USB-C 10-en-1 4K', mg:'Hub USB-C 10-in-1 4K' },
    description:{ fr:'HDMI 4K 60 Hz, 3× USB-A 3.0, 2× USB-C PD 100 W, Ethernet 1 Gbps, SD/MicroSD', mg:"HDMI 4K, 3×USB-A, 2×USB-C PD 100W, Ethernet 1Gbps, SD/MicroSD" },
    features:{ fr:['HDMI 4K @ 60 Hz','3× USB-A 3.0','2× USB-C PD 100 W','Ethernet 1 Gbps','SD + MicroSD'], mg:['HDMI 4K','3×USB-A 3.0','2×USB-C PD 100W','Ethernet 1Gbps','SD+MicroSD'] },
    price_eur:45, image:'https://picsum.photos/seed/hub10in1/400/400', rating:4.6
  },

  /* ── MAISON INTELLIGENTE ─────────────────── */
  {
    id:'p014', category:'maison-intelligente',
    name:{ fr:'Ampoule LED Smart RGB 12 W WiFi', mg:'Jiro LED Smart RGB 12W WiFi' },
    description:{ fr:'16,8 millions de couleurs, contrôle vocal Alexa / Google Home, E27', mg:"16,8M loko, vocon'olona Alexa/Google, E27" },
    features:{ fr:['12 W = 100 W equiv.','16,8 M couleurs','WiFi 2,4 GHz','Alexa & Google Home','Planification horaire'], mg:['12W=100W','16,8M loko','WiFi 2,4GHz','Alexa/Google','Fandaminana ora'] },
    price_eur:15, image:'https://picsum.photos/seed/ledsmrt/400/400', rating:4.3
  },
  {
    id:'p015', category:'maison-intelligente',
    name:{ fr:'Prise Connectée WiFi 16 A Matter', mg:'Prise Mifandray WiFi 16A Matter' },
    description:{ fr:'Suivi consommation en temps réel, compatible Matter/Zigbee, timer programmable', mg:"Fanarahana fampiasana, Matter/Zigbee, timer" },
    features:{ fr:['16 A / 3 680 W','Suivi consommation','Timer programmable','Matter + Zigbee','Alexa / Google'], mg:['16A / 3680W','Fanarahana','Timer','Matter+Zigbee','Alexa/Google'] },
    price_eur:20, image:'https://picsum.photos/seed/smtplug/400/400', rating:4.4
  },
  {
    id:'p016', category:'maison-intelligente',
    name:{ fr:'Caméra Surveillance 4K IP67', mg:'Kamera Fanaraha-maso 4K IP67' },
    description:{ fr:'Vision nocturne couleur, détection IA (humains / véhicules), stockage local SD', mg:"Fahitana alina loko, AI, fitahirizana local SD" },
    features:{ fr:['4K Ultra HD','Vision nuit couleur','IA humains / véhicules','IP67 waterproof','Stockage SD local'], mg:['4K','Alina loko','AI','IP67','SD local'] },
    price_eur:55, image:'https://picsum.photos/seed/ipcam4k/400/400', rating:4.5
  },
  {
    id:'p017', category:'maison-intelligente',
    name:{ fr:'Routeur WiFi 6 AX3000 Dual-Band', mg:'Routeur WiFi 6 AX3000 Dual-Band' },
    description:{ fr:'WiFi 6 bi-bande, jusqu\'à 50 appareils, 4 ports Gigabit, portée 200 m²', mg:"WiFi 6 bi-bande, 50 fitaovana, 4 ports Gigabit, 200m²" },
    features:{ fr:['WiFi 6 AX3000','Bi-bande 2,4 + 5 GHz','4 ports Gigabit','OFDMA + MU-MIMO','Portée 200 m²'], mg:['WiFi 6 AX3000','2,4+5GHz','4×Gigabit','OFDMA+MU-MIMO','200m²'] },
    price_eur:80, image:'https://picsum.photos/seed/wifi6ax/400/400', rating:4.7
  },

  /* ── MONTRE CONNECTÉE ────────────────────── */
  {
    id:'p018', category:'montre',
    name:{ fr:'Smartwatch Fitness GPS 7 jours', mg:'Smartwatch Fitness GPS 7 andro' },
    description:{ fr:'100+ modes sport, GPS intégré, cardiofréquencemètre 24/7, IP68', mg:"100+ mode sport, GPS, cardio 24/7, IP68" },
    features:{ fr:['GPS intégré','100+ modes sport','Cardio 24/7','7 jours autonomie','IP68 waterproof'], mg:['GPS','100+ mode','Cardio 24/7','7 andro','IP68'] },
    price_eur:40, image:'https://picsum.photos/seed/fitgps/400/400', rating:4.4
  },
  {
    id:'p019', category:'montre',
    name:{ fr:'Montre GPS Sport Multisport 14 j', mg:'Famantaranandro GPS Sport 14 andro' },
    description:{ fr:'GPS multi-bandes, cartes hors-ligne, altimètre barométrique, SpO2 + ECG', mg:"GPS multi-bandes, sarintany offline, altimètre, SpO2+ECG" },
    features:{ fr:['GPS multi-bandes','Cartes offline','Altimètre barométrique','SpO2 + ECG','14 jours autonomie'], mg:['GPS multi-bandes','Sarintany offline','Altimètre baro.','SpO2+ECG','14 andro'] },
    price_eur:120, image:'https://picsum.photos/seed/gpsmlt/400/400', rating:4.7
  },
  {
    id:'p020', category:'montre',
    name:{ fr:'Bracelet Connecté Sport Léger', mg:'Fisikinana Mifandray Sport' },
    description:{ fr:'Suivi sommeil, compteur de pas, notifications smartphone, 14 j autonomie', mg:"Fanarahana torimaso, dingana, notifications, 14 andro" },
    features:{ fr:['Cardio 24/7','Suivi sommeil','Compteur de pas','Notifications smartphone','14 jours autonomie'], mg:['Cardio 24/7','Torimaso','Dingana','Notifications','14 andro'] },
    price_eur:25, image:'https://picsum.photos/seed/sptband/400/400', rating:4.3
  },
  {
    id:'p021', category:'montre',
    name:{ fr:'Smartwatch Luxe AMOLED Always-On', mg:'Smartwatch Luxe AMOLED Always-On' },
    description:{ fr:'Écran AMOLED 1,9" Always-On, boîtier acier inoxydable, GPS + ECG + SpO2', mg:"AMOLED 1,9\" Always-On, acier inoxydable, GPS+ECG+SpO2" },
    features:{ fr:['AMOLED 1,9" AOD','Acier inoxydable 316L','GPS + GLONASS','ECG + SpO2','3 jours autonomie'], mg:['AMOLED 1,9" AOD','Acier 316L','GPS+GLONASS','ECG+SpO2','3 andro'] },
    price_eur:200, image:'https://picsum.photos/seed/luxwatch/400/400', rating:4.8
  }
];

const CATEGORIES = [
  { slug:'telephone',         image:'https://picsum.photos/seed/cat-phone/600/350' },
  { slug:'son-image',         image:'https://picsum.photos/seed/cat-audio/600/350' },
  { slug:'bureau-gaming',     image:'https://picsum.photos/seed/cat-gaming/600/350' },
  { slug:'maison-intelligente', image:'https://picsum.photos/seed/cat-home/600/350' },
  { slug:'montre',            image:'https://picsum.photos/seed/cat-watch/600/350' },
];

function getProductsByCategory(cat) {
  return PRODUCTS.filter(p => p.category === cat);
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

function getSimilarProducts(product, limit = 4) {
  return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, limit);
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.innerHTML = `
    <a href="product.html?id=${product.id}" class="product-card-link" aria-label="${product.name[currentLang]}">
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name[currentLang]} — ${t('category.' + product.category)} | MLR TECH Madagascar" loading="lazy" width="400" height="400">
      </div>
      <div class="product-card-body">
        <p class="product-cat">${t('category.' + product.category)}</p>
        <h3 class="product-name">${product.name[currentLang]}</h3>
        <div class="product-rating" aria-label="Note: ${product.rating}/5">${renderStars(product.rating)}</div>
        <div class="product-price-row">
          <span class="product-price" data-price-eur="${product.price_eur}">${formatPrice(product.price_eur)}</span>
          <span class="dhl-badge">${t('products.dhl')}</span>
        </div>
      </div>
    </a>
    <button class="btn-add-cart" data-product-id="${product.id}" aria-label="${t('products.add')} ${product.name[currentLang]}">
      ${t('products.add')}
    </button>
  `;
  card.querySelector('.btn-add-cart').addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(product.id);
  });
  return card;
}

function renderProductGrid(products, container) {
  container.innerHTML = '';
  if (!products.length) {
    container.innerHTML = '<p class="no-results">Aucun produit trouvé.</p>';
    return;
  }
  products.forEach(p => container.appendChild(createProductCard(p)));
}
