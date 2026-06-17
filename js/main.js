/* ── Bootstrap ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initCurrencySelects();
  initMenu();
  initSearch();
  initCart();
  applyTranslations();

  const page = document.body.dataset.page;
  if (page === 'home')     initHome();
  if (page === 'category') initCategory();
  if (page === 'product')  initProduct();
  if (page === 'cart-page') initCartPage();

  initScrollAnimations();
});

/* ── Language init ──────────────────────────────────────── */
function initLang() {
  document.querySelectorAll('.lang-select').forEach(s => {
    s.value = currentLang;
    s.addEventListener('change', e => setLanguage(e.target.value));
  });
}

/* ── Menu burger (mobile / tablette) ────────────────────── */
function initMenu() {
  const toggle  = document.getElementById('menuToggle');
  const nav     = document.getElementById('mainNav');
  const overlay = document.getElementById('navOverlay');
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('open');
    overlay?.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    nav.classList.add('open');
    overlay?.classList.add('open');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  toggle.addEventListener('click', () => {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Fermer au clic sur un lien de catégorie
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') closeMenu();
  });

  // Fermer au clic sur l'overlay
  overlay?.addEventListener('click', closeMenu);

  // Fermer avec la touche Échap
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ── Barre de recherche (toggle via l'icône 🔍) ─────────── */
function initSearch() {
  const toggle = document.getElementById('searchToggle');
  const bar    = document.getElementById('searchBar');
  const input  = document.getElementById('searchInput');
  const close  = document.getElementById('searchClose');

  const openBar = () => {
    bar?.classList.add('open');
    toggle?.setAttribute('aria-expanded', 'true');
    input?.focus();
  };
  const closeBar = () => {
    bar?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  };

  if (toggle && bar) {
    toggle.addEventListener('click', () => {
      bar.classList.contains('open') ? closeBar() : openBar();
    });
  }
  close?.addEventListener('click', closeBar);

  // Fermer la recherche avec Échap
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeBar();
  });

  // Filtrage en direct de la grille produits (si présente sur la page)
  if (input) {
    input.addEventListener('input', debounce(() => {
      const q = input.value.trim().toLowerCase();
      const grid = document.getElementById('productsGrid');
      if (!grid) return;
      const filtered = q
        ? PRODUCTS.filter(p =>
            p.name[currentLang].toLowerCase().includes(q) ||
            p.description[currentLang].toLowerCase().includes(q))
        : currentProducts;
      renderProductGrid(filtered, grid);
    }, 250));
  }
}

function debounce(fn, ms) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

/* ── Price filter ───────────────────────────────────────── */
let currentProducts = PRODUCTS;

function initPriceFilter() {
  const slider  = document.getElementById('priceFilter');
  const display = document.getElementById('priceDisplay');
  if (!slider || !display) return;

  const max = Math.max(...PRODUCTS.map(p => p.price_eur));
  slider.max = max;
  slider.value = max;
  display.textContent = formatPrice(max);

  slider.addEventListener('input', () => {
    const val = parseFloat(slider.value);
    display.textContent = formatPrice(val);
    const grid = document.getElementById('productsGrid');
    const filtered = currentProducts.filter(p => p.price_eur <= val);
    renderProductGrid(filtered, grid);
  });
}

/* ── HOME page ──────────────────────────────────────────── */
function initHome() {
  renderCategories();
  currentProducts = PRODUCTS;
  renderProductGrid(PRODUCTS, document.getElementById('productsGrid'));
  initPriceFilter();

  document.getElementById('ctaBtn')?.addEventListener('click', () => {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Set active nav
  markActiveNav('index.html');

  // SEO dynamique (titre, description, canonical, OG, fil d'Ariane)
  updateSEOForPage();
}

function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card fade-in';
    card.innerHTML = `
      <a href="category.html?cat=${cat.slug}" class="category-card-link">
        <div class="category-img-wrap">
          <img src="${cat.image}" alt="${t('category.' + cat.slug)} à Madagascar — MLR TECH" loading="lazy" width="600" height="350">
        </div>
        <div class="category-card-body">
          <h3>${t('category.' + cat.slug)}</h3>
          <p>${t('category.desc.' + cat.slug)}</p>
          <span class="btn btn-secondary">${t('category.cta')}</span>
        </div>
      </a>
    `;
    grid.appendChild(card);
  });
}

function renderAll() {
  renderCategories();
  const grid = document.getElementById('productsGrid');
  if (grid) renderProductGrid(currentProducts, grid);
  updateCartDisplay();
}

/* ── CATEGORY page ──────────────────────────────────────── */
function initCategory() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('cat') || 'telephone';

  const titleEl = document.getElementById('categoryTitle');
  if (titleEl) titleEl.textContent = t('category.' + slug);

  const backLink = document.getElementById('backLink');
  if (backLink) backLink.textContent = t('back');

  currentProducts = getProductsByCategory(slug);
  const grid = document.getElementById('productsGrid');
  if (grid) renderProductGrid(currentProducts, grid);

  initPriceFilter();
  markActiveNav(`category.html?cat=${slug}`);

  // SEO dynamique selon la catégorie
  updateSEOForPage();
}

/* ── PRODUCT detail page ────────────────────────────────── */
function initProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = id ? getProductById(id) : null;

  if (!product) {
    document.getElementById('productDetail').innerHTML = '<p>Produit introuvable.</p>';
    return;
  }

  renderProductDetail(product);

  // SEO dynamique + données structurées Product (rich results Google)
  updateSEOForPage();

  const similarGrid = document.getElementById('similarGrid');
  if (similarGrid) renderProductGrid(getSimilarProducts(product, 4), similarGrid);
}

function renderProductDetail(p) {
  const el = document.getElementById('productDetail');
  if (!el) return;
  el.innerHTML = `
    <div class="product-detail-img">
      <img src="${p.image}" alt="${p.name[currentLang]} — ${t('category.' + p.category)} | MLR TECH Madagascar" width="600" height="600">
    </div>
    <div class="product-detail-info">
      <p class="product-cat-label">${t('category.' + p.category)}</p>
      <h1 class="product-detail-name">${p.name[currentLang]}</h1>
      <div class="product-detail-rating">${renderStars(p.rating)} <span>${p.rating}/5</span></div>
      <div class="product-detail-price" data-price-eur="${p.price_eur}">${formatPrice(p.price_eur)}</div>
      <p class="product-detail-desc">${p.description[currentLang]}</p>
      <p class="dhl-badge dhl-detail">${t('dhl.badge')}</p>
      <ul class="product-features">
        ${p.features[currentLang].map(f => `<li>${f}</li>`).join('')}
      </ul>
      <button class="btn btn-primary btn-full btn-add-big" data-product-id="${p.id}">
        ${t('products.add')}
      </button>
    </div>
  `;
  el.querySelector('.btn-add-big').addEventListener('click', () => addToCart(p.id));
}

/* ── CART page ──────────────────────────────────────────── */
function initCartPage() {
  updateCartDisplay();
  document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    alert('Fonctionnalité de commande bientôt disponible !');
  });
}

/* ── Active nav link ────────────────────────────────────── */
function markActiveNav(href) {
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === href);
  });
}

/* ── SEO dynamique selon la page ────────────────────────────
   Met à jour titre / description / canonical / Open Graph /
   fil d'Ariane (et le schema Product sur la page produit).
   Réappelé aussi au changement de langue (cf. i18n.js).
   ─────────────────────────────────────────────────────────── */
function updateSEOForPage() {
  if (typeof applySEO !== 'function') return;   // js/seo.js requis
  const page = document.body.dataset.page;
  const OG_IMG = SEO_BASE + '/og-image.png';

  if (page === 'home') {
    applySEO({
      title: t('seo.home.title'),
      description: t('seo.home.desc'),
      canonical: SEO_BASE + '/',
      image: OG_IMG,
      type: 'website'
    });
    setBreadcrumb([{ name: t('nav.home'), url: SEO_BASE + '/' }]);

  } else if (page === 'category') {
    const slug = new URLSearchParams(location.search).get('cat') || 'telephone';
    applySEO({
      title: t('seo.cat.title.' + slug),
      description: t('seo.cat.desc.' + slug),
      canonical: SEO_BASE + '/category.html?cat=' + slug,
      image: OG_IMG,
      type: 'website'
    });
    setBreadcrumb([
      { name: t('nav.home'), url: SEO_BASE + '/' },
      { name: t('category.' + slug), url: SEO_BASE + '/category.html?cat=' + slug }
    ]);

  } else if (page === 'product') {
    const id = new URLSearchParams(location.search).get('id');
    const p = id ? getProductById(id) : null;
    if (!p) return;
    const url = SEO_BASE + '/product.html?id=' + p.id;
    const desc = p.description[currentLang];

    applySEO({
      title: p.name[currentLang] + ' | MLR TECH Madagascar',
      description: desc,
      canonical: url,
      image: p.image,
      type: 'product'
    });
    setBreadcrumb([
      { name: t('nav.home'), url: SEO_BASE + '/' },
      { name: t('category.' + p.category), url: SEO_BASE + '/category.html?cat=' + p.category },
      { name: p.name[currentLang], url }
    ]);

    // Données structurées Product (prix, note, disponibilité)
    injectJsonLd('ld-product', {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name[currentLang],
      description: desc,
      image: p.image,
      sku: p.id,
      brand: { '@type': 'Brand', name: 'MLR TECH' },
      category: t('category.' + p.category),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: p.rating,
        bestRating: 5,
        ratingCount: 1
      },
      offers: {
        '@type': 'Offer',
        url: url,
        priceCurrency: 'EUR',
        price: p.price_eur,
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'MLR TECH' }
      }
    });
  }
}

/* ── Scroll fade-in animations ──────────────────────────── */
function initScrollAnimations() {
  if (!window.IntersectionObserver) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
