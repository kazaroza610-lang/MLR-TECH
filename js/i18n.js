const MLR_TRANSLATIONS = {
  fr: {
    'nav.home': 'Accueil',
    'category.telephone': 'Téléphone',
    'category.son-image': 'Son & Image',
    'category.bureau-gaming': 'Bureau & Gaming',
    'category.maison-intelligente': 'Maison Intelligente',
    'category.montre': 'Montre Connectée',
    'category.cta': 'Voir la catégorie',
    'category.desc.telephone': 'Accessoires mobiles et chargeurs haute performance',
    'category.desc.son-image': 'Casques, enceintes et barres de son premium',
    'category.desc.bureau-gaming': 'Périphériques pro et gaming',
    'category.desc.maison-intelligente': 'Domotique et objets connectés',
    'category.desc.montre': 'Montres et bracelets intelligents',
    'hero.title': 'MLR TECH — Électronique Premium',
    'hero.subtitle': 'Livraison rapide Madagascar | DHL Express 10 jours',
    'hero.cta': 'Découvrir nos produits',
    'categories.title': 'Nos Catégories',
    'products.all': 'Tous les produits',
    'products.add': 'Ajouter au panier',
    'products.dhl': 'DHL 10 jours',
    'products.similar': 'Produits similaires',
    'products.features': 'Caractéristiques',
    'products.view': 'Voir le produit',
    'cart.title': 'PANIER',
    'cart.empty': 'Votre panier est vide',
    'cart.total': 'Total',
    'cart.checkout': 'Passer la commande',
    'cart.continue': 'Continuer shopping',
    'cart.qty': 'Qté',
    'dhl.badge': 'DHL Express • 10 jours',
    'search.placeholder': 'Rechercher des produits…',
    'filter.price': 'Prix max',
    'back': '← Retour',
    'footer.about': 'À propos',
    'footer.about-desc': 'Électronique premium livrée à Madagascar en 10 jours par DHL Express.',
    'footer.delivery': 'Livraison & Retours',
    'footer.delivery-desc': 'DHL Express : 10 jours partout à Madagascar. Retours acceptés sous 30 jours.',
    'footer.contact': 'Contact',
    'footer.follow': 'Nous suivre',
    'footer.privacy': 'Confidentialité',
    'footer.copyright': '© 2026 MLR TECH. Tous droits réservés.',
    'toast.added': '✓ Produit ajouté au panier',
    'toast.removed': '✓ Produit retiré',
  },
  mg: {
    'nav.home': 'Hafaintsika',
    'category.telephone': 'Telefona',
    'category.son-image': 'Feo sy Sary',
    'category.bureau-gaming': 'Biokary & Gaming',
    'category.maison-intelligente': 'Trano Intellegent',
    'category.montre': 'Famantaranandro Konektado',
    'category.cta': 'Mahita ny kategorya',
    'category.desc.telephone': 'Fitaovana mobily sy mpanafana fikatsa ambony',
    'category.desc.son-image': 'Sofina, fitaovana feo sy bars of sound premium',
    'category.desc.bureau-gaming': 'Fitaovana matihanina sy gaming',
    'category.desc.maison-intelligente': 'Domotika sy raha mifandray',
    'category.desc.montre': 'Famantaranandro sy fisikinana mifandray',
    'hero.title': 'MLR TECH — Elektronika Premium',
    'hero.subtitle': "Famitana mabiks an'i Madagasikara | DHL Express 10 andro",
    'hero.cta': 'Mahita ny vokatra',
    'categories.title': 'Ny Kategorya',
    'products.all': 'Ny vokatra rehetra',
    'products.add': "Ampidira ao amin'ny karata",
    'products.dhl': 'DHL 10 andro',
    'products.similar': 'Vokatra mitovy',
    'products.features': 'Toetry',
    'products.view': 'Hijery ny vokatra',
    'cart.title': 'KARATA',
    'cart.empty': 'Foana ny karata',
    'cart.total': 'Totaliny',
    'cart.checkout': 'Mibaolasa ny baiko',
    'cart.continue': 'Padidy mivarotra',
    'cart.qty': 'Isa',
    'dhl.badge': 'DHL Express • 10 andro',
    'search.placeholder': 'Hikaroka vokatra…',
    'filter.price': 'Vidiny max',
    'back': '← Hiverina',
    'footer.about': 'Momba',
    'footer.about-desc': "Elektronika premium atolotra an'i Madagasikara anatin'ny 10 andro.",
    'footer.delivery': 'Fandefasana & Famerenana',
    'footer.delivery-desc': 'DHL Express : 10 andro. Famerenana voaraisina anatin\'ny 30 andro.',
    'footer.contact': 'Fifandraisana',
    'footer.follow': 'Araho izahay',
    'footer.privacy': "Tsiambaratelon'ny",
    'footer.copyright': '© 2026 MLR TECH. Zo rehetra voatokana.',
    'toast.added': "✓ Vokatra nampidirina ao amin'ny karata",
    'toast.removed': '✓ Vokatra nesorina',
  }
};

let currentLang = localStorage.getItem('mlr-lang') || 'fr';

function t(key) {
  return MLR_TRANSLATIONS[currentLang]?.[key]
      || MLR_TRANSLATIONS['fr']?.[key]
      || key;
}

function setLanguage(lang) {
  if (!MLR_TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('mlr-lang', lang);
  document.querySelectorAll('.lang-select').forEach(s => s.value = lang);
  applyTranslations();
  if (typeof renderAll === 'function') renderAll();
  if (typeof updateCartDisplay === 'function') updateCartDisplay();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}
