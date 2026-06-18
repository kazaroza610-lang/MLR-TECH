/* ── Configuration globale livraison ── */
const DELIVERY_DAYS = 10; // à modifier ici pour changer le délai sur tout le site

const PRODUCTS = [
  /* ── TÉLÉPHONE ────────────────────────────── */
  {
    id:'p001', category:'telephone', subcategory:'batterie-externe',
    name:{ fr:'Powerbank 30 000 mAh', mg:'Powerbank 30 000 mAh' },
    description:{ fr:'Batterie externe haute capacité, charge rapide USB-C 65W, indicateur LED', mg:"Bateria ivelany kapasité avo, USB-C 65W, fampisehoana LED" },
    features:{ fr:['30 000 mAh','Charge rapide 65W','2× USB-A + 1× USB-C','Affichage LED','Garantie 2 ans'], mg:['30 000 mAh','Fandehanana haingana 65W','2× USB-A + 1× USB-C','LED','Toky 2 taona'] },
    price_eur:18, image:'https://picsum.photos/seed/pb30k/400/400', rating:4.5
  },
  {
    id:'p002', category:'telephone', subcategory:'chargeurs-cables',
    name:{ fr:'Câble USB-C 2 m Tressé', mg:'Tariby USB-C 2m Voafatotra' },
    description:{ fr:'Nylon tressé renforcé, charge rapide 100 W, compatible iPhone 15 et Android', mg:"Nylon voafatotra, 100W, mifanaraka iPhone 15 sy Android" },
    features:{ fr:['Longueur 2 m','Nylon tressé','100 W charge rapide','480 Mb/s transfert','Universel'], mg:['Lavany 2m','Nylon voafatotra','100W','480Mb/s','Eran-tsefo'] },
    price_eur:8, image:'https://picsum.photos/seed/usbc2m/400/400', rating:4.3
  },
  {
    id:'p003', category:'telephone', subcategory:'chargeurs-cables',
    name:{ fr:'Chargeur GaN 65 W 3-en-1', mg:'Mpanafana GaN 65W 3-in-1' },
    description:{ fr:'Chargeur compact GaN avec 2 USB-C et 1 USB-A, charge simultanée', mg:"Mpanafana maivana GaN, 2 USB-C sy 1 USB-A, mampandeha miaraka" },
    features:{ fr:['65 W total','2× USB-C + 1× USB-A','Technologie GaN','Multi-appareils','Protection surtension'], mg:['65W total','2× USB-C + 1× USB-A','GaN','Multi-fitaovana','Fiarovana'] },
    price_eur:25, image:'https://picsum.photos/seed/gan65w/400/400', rating:4.6
  },
  {
    id:'p004', category:'telephone', subcategory:'coques-protections',
    name:{ fr:'Coque MagSafe Anti-choc', mg:'Coque MagSafe Anti-choc' },
    description:{ fr:'Protection renforcée compatible MagSafe, matière recyclée, certifiée MIL-STD', mg:"Fiarovana noho-choc mifanaraka MagSafe, akora azo averina, MIL-STD" },
    features:{ fr:['Compatible MagSafe','Anti-choc MIL-STD','Matière recyclée','Anti-rayures','Fine 1,5 mm'], mg:['MagSafe','MIL-STD','Akora azo averina','Anti-fety','1,5mm'] },
    price_eur:12, image:'https://picsum.photos/seed/coqmag/400/400', rating:4.2
  },
  {
    id:'p005', category:'telephone', subcategory:'supports',
    name:{ fr:'Support Magnétique Voiture 360°', mg:'Tomponandraikitra Magnétique Fiara 360°' },
    description:{ fr:'Support universel pour tableau de bord ou grille d\'aération, rotation 360°', mg:"Tomponandraikitra eran-tsefo, fihodinana 360°" },
    features:{ fr:['Rotation 360°','Fixation magnétique forte','Tableau de bord / grille','Installation en 1 clic','Universel'], mg:['Fihodinana 360°','Magnétique mahery','Tableau de bord / grille','1 click','Eran-tsefo'] },
    price_eur:15, image:'https://picsum.photos/seed/carphold/400/400', rating:4.4
  },

  /* ── SON & IMAGE ──────────────────────────── */
  {
    id:'p006', category:'son-image', subcategory:'ecouteurs-sans-fil',
    name:{ fr:'Écouteurs TWS Pro ANC 32 h', mg:'Sofina TWS Pro ANC 32h' },
    description:{ fr:'Réduction active du bruit, autonomie 32 h avec boîtier, IPX5, charge 10 min = 3 h', mg:"ANC, 32h, IPX5, fandefasana 10min=3h" },
    features:{ fr:['ANC hybride','32 h autonomie totale','Bluetooth 5.3','IPX5 waterproof','Charge rapide 10 min → 3 h'], mg:['ANC','32h','Bluetooth 5.3','IPX5','10min→3h'] },
    price_eur:45, image:'https://picsum.photos/seed/twspro/400/400', rating:4.7
  },
  {
    id:'p007', category:'son-image', subcategory:'ecouteurs-sans-fil',
    name:{ fr:'Casque Studio Pro Noise-Cancel', mg:'Casque Studio Pro Noise-Cancel' },
    description:{ fr:'Casque over-ear Hi-Res Audio, ANC 40 dB, 30 h autonomie, Bluetooth + jack 3,5 mm', mg:"Casque over-ear Hi-Res, ANC 40dB, 30h, Bluetooth + jack 3.5mm" },
    features:{ fr:['ANC hybride 40 dB','Hi-Res Audio certifié','30 h autonomie','BT 5.0 + Jack 3,5 mm','Arceau pliable'], mg:['ANC 40dB','Hi-Res','30h','BT 5.0 + Jack','Azo alena'] },
    price_eur:89, image:'https://picsum.photos/seed/headpro/400/400', rating:4.8
  },
  {
    id:'p008', category:'son-image', subcategory:'enceintes-bluetooth',
    name:{ fr:'Enceinte Bluetooth 20 W IP67', mg:'Fitaovana Feo Bluetooth 20W IP67' },
    description:{ fr:'Son 360° puissant, IP67 waterproof, 24 h autonomie, compatible TWS stéréo', mg:"Feo 360°, IP67, 24h, TWS stéréo" },
    features:{ fr:['20 W RMS','Son 360°','IP67 waterproof','24 h autonomie','Mode TWS paire stéréo'], mg:['20W RMS','360°','IP67','24h','TWS stéréo'] },
    price_eur:35, image:'https://picsum.photos/seed/btspkr/400/400', rating:4.5
  },
  {
    id:'p009', category:'son-image', subcategory:'enceintes-bluetooth',
    name:{ fr:'Barre de Son 2.1 Dolby Atmos 120 W', mg:'Barre Feo 2.1 Dolby Atmos 120W' },
    description:{ fr:'Barre avec caisson basses externe, Dolby Atmos, HDMI ARC, Bluetooth 5.0', mg:"Barre miaraka amin'ny basses ivelany, Dolby Atmos, HDMI ARC" },
    features:{ fr:['120 W total','Dolby Atmos','HDMI ARC','Bluetooth 5.0','Télécommande incluse'], mg:['120W','Dolby Atmos','HDMI ARC','Bluetooth 5.0','Télécommande'] },
    price_eur:150, image:'https://picsum.photos/seed/sndbar/400/400', rating:4.6
  },

  /* ── BUREAU & GAMING ──────────────────────── */
  {
    id:'p010', category:'bureau-gaming', subcategory:'claviers-souris',
    name:{ fr:'Souris Gaming RGB 16 000 DPI', mg:'Sary Gaming RGB 16 000 DPI' },
    description:{ fr:'Capteur optique précis 16 000 DPI, 7 boutons programmables, RGB 16,8 M couleurs', mg:"Capteur 16 000 DPI, bouton programmables 7, RGB 16,8M loko" },
    features:{ fr:['16 000 DPI ajustable','7 boutons programmables','RGB 16,8 M couleurs','Polling 1 000 Hz','Ergonomie droitier'], mg:['16 000 DPI','7 bouton','RGB 16,8M','1000Hz','Ergonomika'] },
    price_eur:30, image:'https://picsum.photos/seed/mouse16/400/400', rating:4.5
  },
  {
    id:'p011', category:'bureau-gaming', subcategory:'claviers-souris',
    name:{ fr:'Clavier Mécanique RGB TKL', mg:'Klaviez Mécanique RGB TKL' },
    description:{ fr:'Switches Red linéaires, rétroéclairage RGB par touche, boîtier aluminium CNC', mg:"Switches Red, RGB isaky ny fanalahidy, aluminium CNC" },
    features:{ fr:['Switches Red linéaires','RGB par touche','Tenkeyless compact','USB-C détachable','Boîtier aluminium'], mg:['Switches Red','RGB','Compact TKL','USB-C','Aluminium'] },
    price_eur:65, image:'https://picsum.photos/seed/mechkbd/400/400', rating:4.7
  },
  {
    id:'p012', category:'bureau-gaming', subcategory:'claviers-souris',
    name:{ fr:'Webcam 4K 60 fps Autofocus AI', mg:'Webcam 4K 60fps Autofocus AI' },
    description:{ fr:'Webcam professionnelle 4K avec autofocus AI, micro stéréo intégré, HDR', mg:"Webcam matihanina 4K, autofocus AI, micro stéréo, HDR" },
    features:{ fr:['4K 30 fps / 1080p 60 fps','Autofocus AI','Micro stéréo','HDR','Plug & Play'], mg:['4K/1080p 60fps','Autofocus AI','Micro stéréo','HDR','Plug & Play'] },
    price_eur:40, image:'https://picsum.photos/seed/webcam4k/400/400', rating:4.4
  },
  {
    id:'p013', category:'bureau-gaming', subcategory:'claviers-souris',
    name:{ fr:'Hub USB-C 10-en-1 4K', mg:'Hub USB-C 10-in-1 4K' },
    description:{ fr:'HDMI 4K 60 Hz, 3× USB-A 3.0, 2× USB-C PD 100 W, Ethernet 1 Gbps, SD/MicroSD', mg:"HDMI 4K, 3×USB-A, 2×USB-C PD 100W, Ethernet 1Gbps, SD/MicroSD" },
    features:{ fr:['HDMI 4K @ 60 Hz','3× USB-A 3.0','2× USB-C PD 100 W','Ethernet 1 Gbps','SD + MicroSD'], mg:['HDMI 4K','3×USB-A 3.0','2×USB-C PD 100W','Ethernet 1Gbps','SD+MicroSD'] },
    price_eur:45, image:'https://picsum.photos/seed/hub10in1/400/400', rating:4.6
  },
  {
    id:'p017', category:'bureau-gaming', subcategory:'routeurs-wifi',
    name:{ fr:'Routeur WiFi 6 AX3000 Dual-Band', mg:'Routeur WiFi 6 AX3000 Dual-Band' },
    description:{ fr:'WiFi 6 bi-bande, jusqu\'à 50 appareils, 4 ports Gigabit, portée 200 m²', mg:"WiFi 6 bi-bande, 50 fitaovana, 4 ports Gigabit, 200m²" },
    features:{ fr:['WiFi 6 AX3000','Bi-bande 2,4 + 5 GHz','4 ports Gigabit','OFDMA + MU-MIMO','Portée 200 m²'], mg:['WiFi 6 AX3000','2,4+5GHz','4×Gigabit','OFDMA+MU-MIMO','200m²'] },
    price_eur:80, image:'https://picsum.photos/seed/wifi6ax/400/400', rating:4.7
  },

  /* ── MONTRES (désormais sous Bureau & Gaming) ── */
  {
    id:'p018', category:'bureau-gaming', subcategory:'montre-connectee',
    name:{ fr:'Smartwatch Fitness GPS 7 jours', mg:'Smartwatch Fitness GPS 7 andro' },
    description:{ fr:'100+ modes sport, GPS intégré, cardiofréquencemètre 24/7, IP68', mg:"100+ mode sport, GPS, cardio 24/7, IP68" },
    features:{ fr:['GPS intégré','100+ modes sport','Cardio 24/7','7 jours autonomie','IP68 waterproof'], mg:['GPS','100+ mode','Cardio 24/7','7 andro','IP68'] },
    price_eur:40, image:'https://picsum.photos/seed/fitgps/400/400', rating:4.4
  },
  {
    id:'p019', category:'bureau-gaming', subcategory:'montre-connectee',
    name:{ fr:'Montre GPS Sport Multisport 14 j', mg:'Famantaranandro GPS Sport 14 andro' },
    description:{ fr:'GPS multi-bandes, cartes hors-ligne, altimètre barométrique, SpO2 + ECG', mg:"GPS multi-bandes, sarintany offline, altimètre, SpO2+ECG" },
    features:{ fr:['GPS multi-bandes','Cartes offline','Altimètre barométrique','SpO2 + ECG','14 jours autonomie'], mg:['GPS multi-bandes','Sarintany offline','Altimètre baro.','SpO2+ECG','14 andro'] },
    price_eur:120, image:'https://picsum.photos/seed/gpsmlt/400/400', rating:4.7
  },
  {
    id:'p020', category:'bureau-gaming', subcategory:'montre-connectee',
    name:{ fr:'Bracelet Connecté Sport Léger', mg:'Fisikinana Mifandray Sport' },
    description:{ fr:'Suivi sommeil, compteur de pas, notifications smartphone, 14 j autonomie', mg:"Fanarahana torimaso, dingana, notifications, 14 andro" },
    features:{ fr:['Cardio 24/7','Suivi sommeil','Compteur de pas','Notifications smartphone','14 jours autonomie'], mg:['Cardio 24/7','Torimaso','Dingana','Notifications','14 andro'] },
    price_eur:25, image:'https://picsum.photos/seed/sptband/400/400', rating:4.3
  },
  {
    id:'p021', category:'bureau-gaming', subcategory:'montre-connectee',
    name:{ fr:'Smartwatch Luxe AMOLED Always-On', mg:'Smartwatch Luxe AMOLED Always-On' },
    description:{ fr:'Écran AMOLED 1,9" Always-On, boîtier acier inoxydable, GPS + ECG + SpO2', mg:"AMOLED 1,9\" Always-On, acier inoxydable, GPS+ECG+SpO2" },
    features:{ fr:['AMOLED 1,9" AOD','Acier inoxydable 316L','GPS + GLONASS','ECG + SpO2','3 jours autonomie'], mg:['AMOLED 1,9" AOD','Acier 316L','GPS+GLONASS','ECG+SpO2','3 andro'] },
    price_eur:200, image:'https://picsum.photos/seed/luxwatch/400/400', rating:4.8
  },

  /* ── CONSOLES & JEUX VIDÉO ───────────────── */
  {
    id:'p022', category:'consoles-jeux', subcategory:'consoles',
    name:{ fr:'Console SONY PS5 Slim Digital', mg:'Console SONY PS5 Slim Digital' },
    description:{ fr:'Console next-gen 100% numérique, plus compacte, avec SSD ultra-rapide, Ray Tracing, Audio 3D et manette DualSense.', mg:'Console next-gen nomerika manontolo, SSD haingana, Ray Tracing, Audio 3D ary DualSense.' },
    description_complete: 'La PS5 Slim est l\'édition 100 % numérique et compacte de la console next-gen de Sony. Son atout maître : un SSD ultra-rapide qui élimine quasiment les temps de chargement — vos jeux se lancent en quelques secondes.',
    contenu_boite: [
      '1 console PlayStation 5 Slim Édition Numérique',
      '1 manette sans fil DualSense',
      '1 câble HDMI 2.1',
      '1 cordon d\'alimentation',
      '1 câble USB-C',
      '2 supports de base horizontaux',
      'Documentation et guide de démarrage rapide',
    ],
    // Dimensions PS5 Slim (CFI-2016) — source : Sony officiel. À vérifier sur fr.playstation.com si besoin.
    dimensions: { longueur_cm: 35.8, largeur_cm: 21.6, hauteur_cm: 9.6, unite: 'cm' },
    poids_kg: 2.6, // poids approximatif PS5 Slim Digital — à confirmer sur le site Sony
    stockage: '825 Go', // capacité SSD officielle PS5 Slim Digital
    features:{ fr:['SSD ultra-rapide','Ray Tracing','Audio 3D immersif','Manette DualSense incluse','Gâchettes adaptatives'], mg:['SSD haingana','Ray Tracing','Audio 3D','DualSense','Gâchettes adaptatives'] },
    price_eur:550, image:'images/products/ps5-digital.jpeg', rating:4.9
  },
  {
    id:'p023', category:'consoles-jeux', subcategory:'consoles',
    name:{ fr:'Nintendo Switch Joy-Con Rouge & Bleu Néon', mg:'Nintendo Switch Joy-Con Mena & Manga Néon' },
    description:{ fr:'Console hybride portable et salon avec Joy-Con rouge et bleu néon détachables. Profitez de vos jeux en TV, en mode tablette ou en nomade. Jusqu\'à 8 joueurs en multijoueur local.', mg:'Console hybride entin-dalana sy efitrano miaraka amin\'ny Joy-Con mena sy manga azo esorina. Miraketrika hatramin\'ny 8 mpilalao amin\'ny multiplayer local.' },
    description_complete: 'La Nintendo Switch est une console hybride qui s\'adapte à votre style de vie : branchez-la sur votre TV en mode console salon, posez-la sur une table en mode tablette, ou emportez-la partout en mode portable. Les Joy-Con rouge et bleu néon se détachent facilement pour jouer à deux sans accessoire supplémentaire. Avec plus de 6 500 jeux disponibles et jusqu\'à 8 consoles en multijoueur local, c\'est la console idéale pour toute la famille.',
    poids_kg: 0.398,
    dimensions: { longueur_cm: 23.86, largeur_cm: 10.2, hauteur_cm: 1.4, unite: 'cm' },
    stockage: '32 Go',
    contenu_boite: [
      '1 console Nintendo Switch',
      '1 station d\'accueil Nintendo Switch (dock TV)',
      '1 Joy-Con rouge néon (gauche)',
      '1 Joy-Con bleu néon (droit)',
      '2 sangles Joy-Con',
      '1 grip Joy-Con',
      '1 câble HDMI',
      '1 adaptateur secteur',
    ],
    features:{ fr:['Écran 6,2" LCD tactile 1280×720','WiFi 802.11ac + Bluetooth 4.1','Autonomie jusqu\'à 6,5 h','Compatible TV via station d\'accueil','2 Joy-Con détachables inclus'], mg:['Sary 6,2" LCD tactile','WiFi + Bluetooth 4.1','6,5h bateria','Mifandray TV','Joy-Con 2 azo esorina'] },
    isNew: true,
    price_eur:280, image:'assets/images/products/nintendo-switch-neon.jpg', rating:4.8
  },

  {
    id:'p024', category:'consoles-jeux', subcategory:'consoles',
    name:{ fr:'Nintendo Switch 2', mg:'Nintendo Switch 2' },
    description:{ fr:'La nouvelle génération de console hybride Nintendo. Écran Full HD 7,9", 256 Go de stockage, Joy-Con 2 repensés. Jouez en mode TV, tablette ou portable, où que vous soyez.', mg:'Console hybride vaovao Nintendo. Sary Full HD 7,9", 256 Go, Joy-Con 2 vaovao. Lalao amin\'ny TV, tablette na entin-dalana.' },
    description_complete: 'La Nintendo Switch 2 est la nouvelle génération de console hybride qui repousse les limites du gaming. Son écran Full HD de 7,9 pouces offre une image nette et lumineuse, que ce soit en mode portable ou posé sur une table. Avec 256 Go de stockage intégré, vous pouvez emporter toute votre bibliothèque de jeux sans carte microSD. Les Joy-Con 2 entièrement repensés sont plus ergonomiques, plus précis et intègrent de nouvelles fonctionnalités. Compatible avec une grande partie du catalogue Nintendo Switch, la Switch 2 est la console idéale pour les gamers exigeants.',
    poids_kg: 0.53,
    dimensions: { longueur_cm: 27.18, largeur_cm: 11.43, hauteur_cm: 1.4, unite: 'cm' },
    stockage: '256 Go',
    contenu_boite: [
      '1 console Nintendo Switch 2',
      '1 Joy-Con 2 gauche',
      '1 Joy-Con 2 droit',
      '1 support Joy-Con 2',
      '2 dragonnes Joy-Con 2',
      '1 station d\'accueil Nintendo Switch 2',
      '1 câble HDMI ultra haute vitesse',
      '1 adaptateur secteur',
      '1 câble de recharge USB-C',
    ],
    features:{ fr:['Écran Full HD 1080p 7,9" tactile','256 Go de stockage interne','2 ports USB-C','Joy-Con 2 repensés et améliorés','Compatible jeux Nintendo Switch'], mg:['Sary Full HD 1080p 7,9"','256 Go fitahirizana','2 ports USB-C','Joy-Con 2 vaovao','Mifanaraka Switch 1'] },
    isNew: true,
    price_eur:500, image:'assets/images/products/nintendo-switch-2.jpg', rating:4.9
  },

  {
    id:'p025', category:'consoles-jeux', subcategory:'consoles',
    name:{ fr:'Xbox Series S 512 Go', mg:'Xbox Series S 512 Go' },
    description:{ fr:'La console next-gen la plus compacte de Microsoft. 512 Go SSD, résolution 1440p native, jusqu\'à 120 FPS, rétrocompatibilité totale Xbox.', mg:'Console next-gen kely indrindra amin\'i Microsoft. 512 Go SSD, 1440p, hatramin\'ny 120 FPS, mifanaraka Xbox rehetra.' },
    description_complete: 'La Xbox Series S est la console next-gen la plus abordable et la plus compacte de Microsoft. Grâce à son SSD NVMe custom de 512 Go, les temps de chargement sont quasi instantanés. Elle affiche en 1440p natif et supporte l\'upscaling 4K, pour une image nette sur tous vos écrans. Avec jusqu\'à 120 FPS sur les jeux compatibles, le rendu est fluide comme jamais. Le ray tracing et l\'audio spatial Dolby Atmos garantissent une immersion totale. Compatible avec 100 % des jeux Xbox One et des centaines de jeux Xbox 360 et Xbox Original, elle donne accès à une bibliothèque immense dès le premier jour. Idéale en complément de Xbox Game Pass Ultimate.',
    poids_kg: 1.93,
    dimensions: { longueur_cm: 27.5, largeur_cm: 15.1, hauteur_cm: 6.5, unite: 'cm' },
    stockage: '512 Go SSD NVMe',
    contenu_boite: [
      '1 console Xbox Series S (Robot White)',
      '1 manette sans fil Xbox (Carbon Black)',
      '1 câble HDMI haute vitesse',
      '1 câble d\'alimentation',
      '2 piles AA',
    ],
    features:{ fr:['512 Go SSD NVMe custom','Résolution 1440p / 4K upscaling','Jusqu\'à 120 FPS','10 Go RAM GDDR6','Rétrocompatibilité Xbox One / 360 / Original'], mg:['512 Go SSD NVMe','1440p / 4K upscaling','Hatramin\'ny 120 FPS','10 Go RAM GDDR6','Mifanaraka Xbox One / 360 / Original'] },
    isNew: true,
    price_eur:300, image:'assets/images/products/xbox-series-s.webp', rating:4.7
  },

  {
    id:'p026', category:'consoles-jeux', subcategory:'consoles',
    name:{ fr:'Xbox Series X 1 To', mg:'Xbox Series X 1 To' },
    description:{ fr:'La console next-gen la plus puissante de Microsoft. 1 To SSD, 4K natif, jusqu\'à 120 FPS, lecteur Blu-ray 4K UHD, rétrocompatibilité totale Xbox. Disponible en noir ou blanc.', mg:'Console next-gen mahery indrindra amin\'i Microsoft. 1 To SSD, 4K, hatramin\'ny 120 FPS, lecteur Blu-ray, mifanaraka Xbox rehetra. Mainty na fotsy.' },
    description_complete: 'La Xbox Series X est la console de jeux vidéo la plus puissante jamais conçue par Microsoft. Grâce à son SSD NVMe personnalisé d\'1 To, les temps de chargement sont quasi instantanés — jusqu\'à 40 fois plus rapides que la génération précédente. Elle cible le 4K natif à 60 FPS avec la possibilité d\'atteindre 120 FPS sur les titres compatibles, pour une fluidité de jeu sans compromis. Le ray tracing matériel, l\'audio spatial Dolby Atmos et le HDR10 garantissent une immersion totale. Son lecteur Blu-ray 4K UHD intégré vous permet de profiter de vos films en qualité maximale. Compatible avec 100 % des jeux Xbox One et des milliers de titres Xbox 360 et Xbox Original, la Series X est la porte d\'entrée vers l\'un des catalogues les plus vastes du gaming. Disponible en Carbon Black (noir) et Robot White (blanc).',
    poids_kg: 4.46,
    dimensions: { longueur_cm: 30.1, largeur_cm: 15.1, hauteur_cm: 15.1, unite: 'cm' },
    stockage: '1 To SSD NVMe',
    variants: [
      { id: 'black', label: 'Noir',  colorHex: '#1a1a1a', image: 'assets/images/products/xbox-series-x-black.jpg' },
      { id: 'white', label: 'Blanc', colorHex: '#e8e8e8', image: 'assets/images/products/xbox-series-x-white.jpg' },
    ],
    contenu_boite: [
      '1 console Xbox Series X',
      '1 manette sans fil Xbox (Carbon Black)',
      '1 câble HDMI haute vitesse',
      '1 câble d\'alimentation',
      '2 piles AA',
    ],
    features:{ fr:['4K natif / 120 FPS','1 To SSD NVMe custom','16 Go RAM GDDR6','Lecteur Blu-ray 4K UHD intégré','Rétrocompatibilité Xbox One / 360 / Original'], mg:['4K natif / 120 FPS','1 To SSD NVMe','16 Go RAM GDDR6','Lecteur Blu-ray 4K UHD','Mifanaraka Xbox One / 360 / Original'] },
    isNew: false,
    price_eur:500, image:'assets/images/products/xbox-series-x-black.jpg', rating:4.9
  },

  {
    id:'p027', category:'consoles-jeux', subcategory:'consoles',
    name:{ fr:'Console PlayStation 5 Édition Standard (Modèle - Slim)', mg:'Console PlayStation 5 Édition Standard (Modèle - Slim)' },
    description:{ fr:'La PS5 Slim Chassis E : design épuré, 1 To SSD, 4K 120 FPS, lecteur de disque intégré, ray tracing et audio 3D. La next-gen PlayStation à son meilleur.', mg:'PS5 Slim Chassis E vaovao : 1 To SSD, 4K 120 FPS, lecteur disque, ray tracing sy audio 3D. Next-gen PlayStation tsara indrindra.' },
    description_complete: 'La PlayStation 5 Slim Chassis E est la nouvelle révision de la console next-gen de Sony, alliant puissance et compacité. Son SSD ultra-rapide de 1 To (5 500 Mo/s) élimine quasiment les temps de chargement. Elle affiche jusqu\'en 4K à 120 FPS sur les jeux compatibles, avec le ray tracing pour un rendu visuel réaliste et le Tempest 3D Audio pour une immersion sonore totale. La manette DualSense intègre des gâchettes adaptatives et un retour haptique qui font vivre chaque action. Compatible avec toute la bibliothèque PS4 et la majorité des jeux PS5. Astro\'s Playroom est préinstallé pour découvrir les capacités de la console dès le premier allumage.',
    poids_kg: 3.2,
    dimensions: { longueur_cm: 35.8, largeur_cm: 21.6, hauteur_cm: 8.0, unite: 'cm' },
    stockage: '1 To SSD',
    contenu_boite: [
      '1 console PlayStation 5 Slim (Chassis E)',
      '1 manette DualSense',
      '1 pied console',
      '1 câble HDMI 2.1',
      '1 câble d\'alimentation',
      '1 câble USB Type-C',
      'Astro\'s Playroom (préinstallé)',
    ],
    features:{ fr:['4K natif / 120 FPS','1 To SSD (5 500 Mo/s)','16 Go RAM GDDR6','Lecteur disque Blu-ray 4K intégré','Gâchettes adaptatives + retour haptique DualSense'], mg:['4K / 120 FPS','1 To SSD haingana','16 Go RAM GDDR6','Lecteur disque Blu-ray 4K','DualSense gâchettes adaptatives'] },
    isNew: true,
    price_eur:650, image:'assets/images/products/ps5-slim-chassis-e.jpg', rating:4.9
  },

  {
    id:'p028', category:'consoles-jeux', subcategory:'accessoires-console',
    name:{ fr:'Batterie Externe pour Manettes PS5®', mg:'Bateria ivelany ho an\'ny Manette PS5®' },
    description:{ fr:'Prolongez vos sessions de jeu jusqu\'à 6 heures supplémentaires. Compatible DualSense™ et DualSense Edge™ via USB-C. Indicateur de niveau de batterie intégré.', mg:'Halavao ny fotoana filalaovana hatramin\'ny 6 ora fanampiny. Mifanaraka amin\'ny DualSense™ sy DualSense Edge™ USB-C.' },
    description_complete: 'Ne laissez plus jamais votre manette PS5 à plat en pleine partie. La Batterie Externe pour Manettes PS5® ajoute jusqu\'à 6 heures d\'autonomie supplémentaire à votre DualSense™ ou DualSense Edge™ grâce à sa connexion USB-C simple et rapide. Son indicateur de niveau de batterie intégré vous permet de suivre la charge restante en un coup d\'œil. Le câble de charge de 50 cm inclus assure une prise en main confortable pendant le jeu. Compacte et légère, elle se glisse facilement dans votre sac pour jouer partout sans interruption.',
    poids_kg: 0.09,
    dimensions: { longueur_cm: 10.5, largeur_cm: 4.2, hauteur_cm: 2.1, unite: 'cm' },
    stockage: null,
    contenu_boite: [
      '1 batterie externe pour manette PS5',
      '1 câble de charge USB-C (50 cm)',
      '1 manuel d\'utilisation',
    ],
    features:{ fr:['Jusqu\'à 6 h d\'autonomie supplémentaire','Compatible DualSense™ et DualSense Edge™','Connexion USB-C universelle','Indicateur de niveau de batterie intégré','Câble de charge 50 cm inclus'], mg:['Hatramin\'ny 6 ora fanampiny','Mifanaraka DualSense™ sy DualSense Edge™','USB-C','Fampisehoana bateria','Tariby 50 cm'] },
    compatibility: [
      { platform: 'ps5', label: 'PlayStation 5' },
    ],
    images: [
      'assets/images/products/batterie-manette-ps5.jpg',
      'assets/images/products/batterie-manette-ps5-solo.jpg',
    ],
    isNew: true,
    price_eur:50, image:'assets/images/products/batterie-manette-ps5.jpg', rating:4.6
  },

  {
    id:'p029', category:'consoles-jeux', subcategory:'accessoires-console',
    name:{ fr:'Manette Pro Sans Fil Nintendo Switch', mg:'Manette Pro Sans Fil Nintendo Switch' },
    description:{ fr:'Manette sans fil Pro pour Nintendo Switch, Switch 2, Lite & OLED. Joysticks Hall Effect anti-dérive, gyroscope 6 axes, boutons programmables M1/M2, vibration réglable.', mg:'Manette sans fil Pro ho an\'ny Nintendo Switch rehetra. Hall Effect joystick tsy mivily, gyroscope 6 axes, bouton programmable M1/M2.' },
    description_complete: 'Profitez d\'une expérience de jeu premium sur Nintendo Switch avec cette manette Pro sans fil AceGamer. Ses joysticks à effet Hall élimine définitivement le problème de dérive de stick grâce à leur technologie magnétique — sans pièces en contact, pas d\'usure. Le gyroscope 6 axes permet un contrôle de mouvement précis, idéal pour les jeux de tir ou de sport. Les deux boutons programmables M1 et M2 situés sous la manette vous permettent d\'assigner n\'importe quelle touche pour un avantage tactique. La vibration est réglable selon vos préférences. L\'indicateur 4 LED vous informe en temps réel du niveau de batterie. Compatible avec toute la gamme Nintendo Switch : Switch 1, Switch 2, Switch Lite et Switch OLED.',
    poids_kg: 0.28,
    dimensions: { longueur_cm: 15.2, largeur_cm: 10.3, hauteur_cm: 6.1, unite: 'cm' },
    stockage: null,
    contenu_boite: [
      '1 manette Pro sans fil AceGamer (Rouge & Bleu Néon)',
      '1 câble USB-C de recharge',
      '1 manuel d\'utilisation',
    ],
    features:{ fr:['Joysticks Hall Effect anti-dérive','Gyroscope 6 axes','2 boutons programmables M1/M2','Vibration réglable','Compatible Switch / Switch 2 / Lite / OLED'], mg:['Hall Effect joystick tsy mivily','Gyroscope 6 axes','Bouton M1/M2 programmable','Vibration azo apetraka','Mifanaraka Switch / Switch 2 / Lite / OLED'] },
    compatibility: [
      { platform: 'switch', label: 'Nintendo Switch' },
      { platform: 'switch', label: 'Nintendo Switch 2' },
      { platform: 'switch', label: 'Nintendo Switch Lite' },
      { platform: 'switch', label: 'Nintendo Switch OLED' },
    ],
    isNew: true,
    price_eur:60, image:'assets/images/products/manette-pro-switch.jpg', rating:4.5
  },

  {
    id:'p030', category:'consoles-jeux', subcategory:'accessoires-console',
    name:{ fr:'Joy-Con Nintendo Switch (Paire)', mg:'Joy-Con Nintendo Switch (Paire)' },
    description:{ fr:'Paire de manettes Joy-Con officielles Nintendo pour Switch. Détection de mouvement, retour HD Rumble, capteur IR et connexion sans fil Bluetooth.', mg:'Joy-Con ofisialy Nintendo roa ho an\'ny Switch. Fihetsika detection, HD Rumble, IR sensor ary Bluetooth.' },
    description_complete: 'Les Joy-Con sont les manettes iconiques de la Nintendo Switch, offrant une expérience de jeu unique et polyvalente. Utilisez-les attachés à la console en mode portable, posés sur la poignée en mode TV, ou tenus séparément pour jouer à deux sans accessoire supplémentaire. Chaque Joy-Con intègre un gyroscope et un accéléromètre pour la détection de mouvement précise, un moteur HD Rumble pour des retours haptiques réalistes, et un capteur IR pour détecter formes et distances. Le bouton NFC intégré permet de lire les figurines amiibo. Les Joy-Con se rechargent directement sur la console Switch.',
    poids_kg: 0.099,
    dimensions: { longueur_cm: 10.2, largeur_cm: 3.5, hauteur_cm: 5.6, unite: 'cm' },
    stockage: null,
    contenu_boite: [
      '2 manettes Joy-Con',
      '2 dragonne Joy-Con',
    ],
    features:{ fr:['Gyroscope et accéléromètre intégrés','Retour haptique HD Rumble','Capteur infrarouge (IR)','Compatible amiibo (NFC)','Connexion Bluetooth sans fil'], mg:['Gyroscope sy accelerometre','HD Rumble haptique','Capteur IR','Amiibo NFC','Bluetooth'] },
    compatibility: [
      { platform: 'switch', label: 'Nintendo Switch' },
      { platform: 'switch', label: 'Nintendo Switch 2' },
      { platform: 'switch', label: 'Nintendo Switch OLED' },
    ],
    isNew: false,
    price_eur:70, image:'assets/images/products/joy-con-switch.jpg', rating:4.7
  },

  {
    id:'p031', category:'consoles-jeux', subcategory:'accessoires-console',
    name:{ fr:'Station de Charge Xbox avec Ventilateur', mg:'Station de Charge Xbox miaraka amin\'ny Ventilateur' },
    description:{ fr:'Station de charge verticale pour manettes Xbox avec ventilateur de refroidissement intégré. 2 emplacements de charge simultanés, batteries rechargeables incluses.', mg:'Station de charge verticale ho an\'ny Xbox miaraka amin\'ny ventilateur. Fitoerana 2 miaraka, bateria azo rechargé.' },
    description_complete: 'Gardez vos manettes Xbox toujours prêtes à l\'emploi avec cette station de charge verticale tout-en-un. Elle accueille simultanément 2 manettes Xbox et les recharge grâce aux batteries rechargeables incluses — fini les piles jetables. Le ventilateur de refroidissement intégré dissipe la chaleur pendant la charge pour prolonger la durée de vie de vos manettes. Le support vertical économise de la place sur votre bureau et met en valeur vos manettes. Compatible avec les manettes Xbox Series X|S et Xbox One. Les indicateurs LED vous indiquent en temps réel le statut de charge.',
    poids_kg: 0.32,
    dimensions: { longueur_cm: 18.5, largeur_cm: 9.2, hauteur_cm: 12.0, unite: 'cm' },
    stockage: null,
    contenu_boite: [
      '1 station de charge verticale',
      '2 batteries rechargeables',
      '1 câble USB de charge',
      '1 manuel d\'utilisation',
    ],
    features:{ fr:['Charge 2 manettes simultanément','Ventilateur de refroidissement intégré','2 batteries rechargeables incluses','Indicateurs LED de charge','Compatible Xbox Series X|S et Xbox One'], mg:['Charge manette 2 miaraka','Ventilateur an\'ny hafanana','Bateria 2 azo rechargé','LED indicator','Mifanaraka Xbox Series X|S sy Xbox One'] },
    compatibility: [
      { platform: 'xbox', label: 'Xbox Series X' },
    ],
    isNew: true,
    price_eur:80, image:'assets/images/products/station-charge-xbox.jpg', rating:4.4
  },

  {
    id:'p032', category:'consoles-jeux', subcategory:'accessoires-console',
    name:{ fr:'Station de Charge PS5 avec Ventilateur RGB', mg:'Station de Charge PS5 miaraka amin\'ny Ventilateur RGB' },
    description:{ fr:'Support vertical PS5 tout-en-un : charge 2 manettes DualSense, ventilateur de refroidissement, hub USB 3 ports et éclairage RGB. Compatible toutes versions PS5.', mg:'Support vertical PS5 : charge DualSense 2, ventilateur, hub USB 3 ports sy RGB. Mifanaraka amin\'ny PS5 rehetra.' },
    description_complete: 'Optimisez votre setup PS5 avec cette station multifonction haut de gamme. Elle positionne votre console PS5 en mode vertical tout en la refroidissant activement grâce à son ventilateur intégré à vitesse automatique. Deux emplacements de charge accueillent simultanément vos manettes DualSense™ et DualSense Edge™ pour ne jamais manquer de batterie. Le hub USB 3 ports vous permet de brancher facilement vos accessoires sans chercher les ports de la console. L\'éclairage RGB ambiant ajoute une touche gaming à votre espace de jeu. Compatible avec toutes les versions PS5 : originale (2020), Slim et Pro.',
    poids_kg: 0.45,
    dimensions: { longueur_cm: 32.0, largeur_cm: 14.5, hauteur_cm: 12.0, unite: 'cm' },
    stockage: null,
    contenu_boite: [
      '1 station de charge verticale PS5',
      '1 câble USB d\'alimentation',
      '1 manuel d\'utilisation',
    ],
    features:{ fr:['Charge 2 manettes DualSense simultanément','Ventilateur de refroidissement automatique','Hub USB 3 ports intégré','Éclairage RGB ambiant','Compatible PS5 originale, Slim et Pro'], mg:['Charge DualSense 2 miaraka','Ventilateur automatique','Hub USB 3 ports','RGB ambiant','Mifanaraka PS5 / Slim / Pro'] },
    compatibility: [
      { platform: 'ps5', label: 'PlayStation 5' },
      { platform: 'ps5', label: 'PlayStation 5 Slim' },
      { platform: 'ps5', label: 'PlayStation 5 Pro' },
    ],
    isNew: true,
    price_eur:80, image:'assets/images/products/station-charge-ps5.jpg', rating:4.6
  },

  {
    id:'p033', category:'consoles-jeux', subcategory:'accessoires-console',
    name:{ fr:'Manette Sans Fil DualSense Blanche PS5', mg:'Manette Sans Fil DualSense Fotsy PS5' },
    description:{ fr:'Manette officielle Sony DualSense pour PS5. Gâchettes adaptatives, retour haptique avancé, micro et haut-parleur intégrés. Coloris Blanc.', mg:'Manette ofisialy Sony DualSense ho an\'ny PS5. Gâchette adaptive, haptique, mikro sy speaker. Fotsy.' },
    description_complete: 'La manette DualSense de Sony redéfinit l\'expérience de jeu sur PS5 grâce à ses technologies immersives inédites. Les gâchettes adaptatives L2 et R2 offrent une résistance variable selon l\'action en jeu — ressentez la tension d\'un arc, la pression d\'une détente ou le freinage d\'un véhicule. Le retour haptique remplace la vibration classique par des sensations précises et directionnelles. Le microphone intégré vous permet de discuter sans casque, tandis que le haut-parleur diffuse des sons d\'ambiance directement dans la manette. La batterie rechargeable offre plusieurs heures d\'autonomie. Connexion sans fil via Bluetooth, compatible PS5 et PC.',
    poids_kg: 0.28,
    dimensions: { longueur_cm: 16.0, largeur_cm: 10.6, hauteur_cm: 6.6, unite: 'cm' },
    stockage: null,
    contenu_boite: [
      '1 manette DualSense Blanche',
      '1 câble USB-C',
    ],
    features:{ fr:['Gâchettes adaptatives L2/R2','Retour haptique avancé','Microphone et haut-parleur intégrés','Connexion sans fil Bluetooth','Compatible PS5 et PC'], mg:['Gâchette adaptive L2/R2','Retour haptique','Mikro sy speaker','Bluetooth','Mifanaraka PS5 sy PC'] },
    compatibility: [
      { platform: 'ps5', label: 'PlayStation 5' },
    ],
    isNew: false,
    price_eur:80, image:'assets/images/products/dualsense-blanc.jpg', rating:4.8
  },

  {
    id:'p034', category:'consoles-jeux', subcategory:'accessoires-console',
    name:{ fr:'PlayStation Portal — Lecteur à Distance PS5', mg:'PlayStation Portal — Lecteur à Distance PS5' },
    description:{ fr:'Jouez à vos jeux PS5 depuis n\'importe où via le Wi-Fi. Écran LCD 8" 60 FPS, gâchettes adaptatives DualSense intégrées. Disponible en Blanc et Noir.', mg:'Lalao PS5 avy any WiFi. Ekrana LCD 8" 60 FPS, gâchette adaptive DualSense. Fotsy sy Mainty.' },
    description_complete: 'Le PlayStation Portal est le lecteur à distance officiel de Sony qui vous permet de jouer à vos jeux PS5 depuis n\'importe quelle pièce de la maison ou en déplacement via le Wi-Fi. Son écran LCD de 8 pouces affiche vos jeux en 1080p à 60 FPS pour une expérience fluide et précise. Les touches DualSense intégrées reproduisent fidèlement les gâchettes adaptatives et le retour haptique pour une immersion complète. La connexion se fait directement avec votre PS5 sans abonnement supplémentaire requis — il vous suffit d\'un réseau Wi-Fi 5 GHz pour une latence minimale. Disponible en coloris Blanc (standard) et Noir (Deep Earth).',
    poids_kg: 0.53,
    dimensions: { longueur_cm: 28.0, largeur_cm: 11.7, hauteur_cm: 4.3, unite: 'cm' },
    stockage: null,
    contenu_boite: [
      '1 PlayStation Portal',
      '1 câble USB-C',
    ],
    features:{ fr:['Écran LCD 8" 1080p 60 FPS','Gâchettes adaptatives DualSense','Connexion Wi-Fi 5 GHz','Sans abonnement supplémentaire','Compatible PS5 uniquement'], mg:['Ekrana LCD 8" 1080p 60 FPS','Gâchette adaptive DualSense','Wi-Fi 5 GHz','Tsy mila souscription fanampiny','Mifanaraka PS5 irery'] },
    variants: [
      { id: 'blanc', label: 'Blanc', colorHex: '#f0f0f0', image: 'assets/images/products/ps-portal-blanc.jpg' },
      { id: 'noir', label: 'Noir', colorHex: '#1a1a2e', image: 'assets/images/products/ps-portal-noir.jpg' },
    ],
    compatibility: [
      { platform: 'ps5', label: 'PlayStation 5' },
    ],
    isNew: true,
    price_eur:250, image:'assets/images/products/ps-portal-blanc.jpg', rating:4.5
  },

  {
    id:'p035', category:'consoles-jeux', subcategory:'accessoires-console',
    name:{ fr:'Casque Sans Fil PULSE Elite™ + Housse PS5', mg:'Casque Sans Fil PULSE Elite™ + Housse PS5' },
    description:{ fr:'Casque sans fil premium Sony PULSE Elite™ avec housse de transport. Audio 3D PS5, microphone rétractable à tige, connexion sans fil PS Link et Bluetooth.', mg:'Casque Sony PULSE Elite™ premium miaraka amin\'ny sac. Audio 3D PS5, mikro retractable, PS Link sy Bluetooth.' },
    description_complete: 'Le PULSE Elite™ est le casque sans fil haut de gamme de Sony conçu pour tirer le meilleur du Tempest 3D Audio de la PS5. Ses transducteurs planaires délivrent un son d\'une clarté et d\'une précision exceptionnelles avec une large scène sonore. Le microphone rétractable à tige se replie discrètement dans l\'arceau quand vous n\'en avez pas besoin. La connexion sans fil PS Link assure une latence ultra-faible, tandis que le Bluetooth permet une utilisation avec PC, Mac et appareils mobiles. La housse de transport incluse protège votre casque lors des déplacements. Jusqu\'à 30 heures d\'autonomie avec charge USB-C.',
    poids_kg: 0.33,
    dimensions: { longueur_cm: 19.5, largeur_cm: 8.5, hauteur_cm: 17.0, unite: 'cm' },
    stockage: null,
    contenu_boite: [
      '1 casque sans fil PULSE Elite™',
      '1 housse de transport',
      '1 câble USB-C de charge',
      '1 adaptateur PS Link USB',
    ],
    features:{ fr:['Transducteurs planaires haute fidélité','Audio 3D PS5 (Tempest)','Microphone rétractable à tige','Connexion PS Link + Bluetooth','Jusqu\'à 30 h d\'autonomie'], mg:['Transducteur planaire','Audio 3D PS5 Tempest','Mikro retractable','PS Link + Bluetooth','Hatramin\'ny 30 ora'] },
    images: [
      'assets/images/products/pulse-elite-2.jpg',
      'assets/images/products/pulse-elite-1.jpg',
    ],
    compatibility: [
      { platform: 'ps5', label: 'PlayStation 5' },
    ],
    isNew: true,
    price_eur:150, image:'assets/images/products/pulse-elite-2.jpg', rating:4.7
  },

  /* ── MAISON INTELLIGENTE ─────────────────── */
  {
    id:'p014', category:'maison-intelligente', subcategory:'ampoules-led',
    name:{ fr:'Ampoule LED Smart RGB 12 W WiFi', mg:'Jiro LED Smart RGB 12W WiFi' },
    description:{ fr:'16,8 millions de couleurs, contrôle vocal Alexa / Google Home, E27', mg:"16,8M loko, vocon'olona Alexa/Google, E27" },
    features:{ fr:['12 W = 100 W equiv.','16,8 M couleurs','WiFi 2,4 GHz','Alexa & Google Home','Planification horaire'], mg:['12W=100W','16,8M loko','WiFi 2,4GHz','Alexa/Google','Fandaminana ora'] },
    price_eur:15, image:'https://picsum.photos/seed/ledsmrt/400/400', rating:4.3
  },
  {
    id:'p015', category:'maison-intelligente', subcategory:'alarme-connectee',
    name:{ fr:'Prise Connectée WiFi 16 A Matter', mg:'Prise Mifandray WiFi 16A Matter' },
    description:{ fr:'Suivi consommation en temps réel, compatible Matter/Zigbee, timer programmable', mg:"Fanarahana fampiasana, Matter/Zigbee, timer" },
    features:{ fr:['16 A / 3 680 W','Suivi consommation','Timer programmable','Matter + Zigbee','Alexa / Google'], mg:['16A / 3680W','Fanarahana','Timer','Matter+Zigbee','Alexa/Google'] },
    price_eur:20, image:'https://picsum.photos/seed/smtplug/400/400', rating:4.4
  },
  {
    id:'p016', category:'maison-intelligente', subcategory:'cameras-surveillance',
    name:{ fr:'Caméra Surveillance 4K IP67', mg:'Kamera Fanaraha-maso 4K IP67' },
    description:{ fr:'Vision nocturne couleur, détection IA (humains / véhicules), stockage local SD', mg:"Fahitana alina loko, AI, fitahirizana local SD" },
    features:{ fr:['4K Ultra HD','Vision nuit couleur','IA humains / véhicules','IP67 waterproof','Stockage SD local'], mg:['4K','Alina loko','AI','IP67','SD local'] },
    price_eur:55, image:'https://picsum.photos/seed/ipcam4k/400/400', rating:4.5
  },
];

const CATEGORIES = [
  {
    slug: 'telephone',
    image: 'https://picsum.photos/seed/cat-phone/600/350',
    subcategories: [
      { slug: 'coques-protections' },
      { slug: 'chargeurs-cables' },
      { slug: 'batterie-externe' },
      { slug: 'smartphones' },
      { slug: 'supports' },
    ]
  },
  {
    slug: 'son-image',
    image: 'https://picsum.photos/seed/cat-audio/600/350',
    subcategories: [
      { slug: 'ecouteurs-sans-fil' },
      { slug: 'enceintes-bluetooth' },
      { slug: 'tablette' },
      { slug: 'videoprojecteur' },
      { slug: 'iptv' },
    ]
  },
  {
    slug: 'bureau-gaming',
    image: 'https://picsum.photos/seed/cat-gaming/600/350',
    subcategories: [
      { slug: 'casque-gaming' },
      { slug: 'claviers-souris' },
      { slug: 'routeurs-wifi' },
      { slug: 'repeteur-wifi' },
      { slug: 'montre-connectee' },
    ]
  },
  {
    slug: 'consoles-jeux',
    image: 'https://picsum.photos/seed/cat-console/600/350',
    subcategories: [
      { slug: 'consoles' },
      { slug: 'jeux' },
      { slug: 'accessoires-console' },
    ]
  },
  {
    slug: 'maison-intelligente',
    image: 'https://picsum.photos/seed/cat-home/600/350',
    subcategories: [
      { slug: 'ampoules-led' },
      { slug: 'cameras-surveillance' },
      { slug: 'traceur-gps' },
      { slug: 'alarme-connectee' },
    ]
  },
];

function getProductsByCategory(cat, subcat) {
  let products = PRODUCTS.filter(p => p.category === cat);
  if (subcat) products = products.filter(p => p.subcategory === subcat);
  return products;
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
        <button class="fav-toggle" data-fav-id="${product.id}" aria-pressed="false" aria-label="${t('favoris.add')}" title="${t('favoris.add')}">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        </button>
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
  if (typeof updateWishlistUI === 'function') updateWishlistUI();
}
