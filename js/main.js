/* ── Bootstrap ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initCurrencySelects();
  initMenu();
  initSearch();
  initCart();
  initWishlist();
  applyTranslations();

  const page = document.body.dataset.page;
  if (page === 'home')     initHome();
  if (page === 'category') initCategory();
  if (page === 'product')  initProduct();
  if (page === 'cart-page') initCartPage();
  if (page === 'favoris')  initFavoris();

  initScrollAnimations();
  initHeaderScroll();
});

/* ── Header auto-hide au scroll ──────────────────────────────
   Descend → header masqué (slide vers le haut). Monte → réapparaît.
   En haut de page (scroll 0) → toujours visible. Détection via
   requestAnimationFrame pour ne pas saturer le thread au scroll. */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  let lastY = window.scrollY || 0;
  let ticking = false;

  const update = () => {
    const y = window.scrollY || 0;
    if (y <= 0) {
      header.classList.remove('header--hidden');          // tout en haut
    } else if (y > lastY + 4) {
      // on descend → masquer (sauf si le menu burger est ouvert)
      if (!document.getElementById('mainNav')?.classList.contains('open')) {
        header.classList.add('header--hidden');
      }
    } else if (y < lastY - 4) {
      header.classList.remove('header--hidden');           // on remonte
    }
    lastY = y;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
}

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
    // Ferme tous les sous-menus ouverts
    document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
  };

  const openMenu = () => {
    nav.classList.add('open');
    overlay?.classList.add('open');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.querySelector('.header')?.classList.remove('header--hidden'); // header visible quand le menu s'ouvre
  };

  toggle.addEventListener('click', () => {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Fermer au clic sur un lien de sous-catégorie (pas sur le toggle parent)
  nav.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (link && link.closest('.nav-sub')) closeMenu();
  });

  // Accordéon mobile : toggle sous-menu au clic sur le nav-link parent
  document.querySelectorAll('.nav-item.has-sub > .nav-link').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth >= 1024) return; // desktop : navigation normale
      e.preventDefault();
      const item = link.closest('.nav-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // Fermer au clic sur l'overlay
  overlay?.addEventListener('click', closeMenu);

  // Fermer avec la touche Échap
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ── Barre de recherche (toujours visible dans le header) ──── */
function filterProductGrid(q) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return false;
  const query = (q || '').trim().toLowerCase();
  const filtered = query
    ? PRODUCTS.filter(p =>
        p.name[currentLang].toLowerCase().includes(query) ||
        p.description[currentLang].toLowerCase().includes(query))
    : currentProducts;
  renderProductGrid(filtered, grid);
  return true;
}

function initSearch() {
  const form  = document.getElementById('headerSearch');
  const input = document.getElementById('searchInput');
  if (!input) return;

  // Filtrage en direct sur les pages qui ont une grille produits
  input.addEventListener('input', debounce(() => filterProductGrid(input.value), 250));

  // Validation (clic loupe ou touche Entrée)
  form?.addEventListener('submit', e => {
    // Si la page affiche une grille, on filtre sur place (pas de navigation).
    // Sinon on laisse le <form action="index.html"> renvoyer vers l'accueil avec ?q=
    if (document.getElementById('productsGrid')) {
      e.preventDefault();
      filterProductGrid(input.value);
      input.blur();
    }
  });
}

// Applique une recherche passée en ?q= dans l'URL (accueil / catégorie)
function applySearchQueryFromURL() {
  const q = new URLSearchParams(location.search).get('q');
  if (!q) return;
  const input = document.getElementById('searchInput');
  if (input) input.value = q;
  filterProductGrid(q);
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

  // Recherche passée via ?q= (depuis une autre page)
  applySearchQueryFromURL();

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
  const subcat = params.get('subcat') || '';

  const titleEl = document.getElementById('categoryTitle');
  if (titleEl) {
    titleEl.textContent = subcat
      ? t('subcat.' + subcat)
      : t('category.' + slug);
  }

  const backLink = document.getElementById('backLink');
  if (backLink) backLink.textContent = t('back');

  currentProducts = getProductsByCategory(slug, subcat);
  const grid = document.getElementById('productsGrid');
  if (grid) renderProductGrid(currentProducts, grid);

  initPriceFilter();
  markActiveNav(`category.html?cat=${slug}`);

  // Recherche passée via ?q=
  applySearchQueryFromURL();

  // SEO dynamique selon la catégorie
  updateSEOForPage();
}

/* ── FAVORIS page ───────────────────────────────────────── */
function initFavoris() {
  const titleEl = document.getElementById('favorisTitle');
  if (titleEl) titleEl.textContent = t('favoris.title');
  const backLink = document.querySelector('#backLink a');
  if (backLink) backLink.textContent = t('back');
  renderFavoris();
}

function renderFavoris() {
  const grid  = document.getElementById('productsGrid');
  const empty = document.getElementById('favEmpty');
  if (!grid) return;
  const ids = getWishlist();
  const products = PRODUCTS.filter(p => ids.includes(p.id));
  if (!products.length) {
    grid.innerHTML = '';
    if (empty) { empty.style.display = 'block'; empty.textContent = t('favoris.empty'); }
    return;
  }
  if (empty) empty.style.display = 'none';
  renderProductGrid(products, grid);
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

  const checkIcon = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#22c55e" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
  const truckIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></svg>`;
  const caretIcon = `<svg class="pd-acc-caret" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;

  // Icônes SVG des caractéristiques (remplacent les anciens emojis)
  const dimSvg = inner => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  const lengthIcon  = dimSvg('<path d="m18 8 4 4-4 4"/><path d="M2 12h20"/><path d="m6 8-4 4 4 4"/>');
  const widthIcon   = dimSvg('<path d="M11 19H5v-6"/><path d="M19 5v6h-6"/><path d="m5 19 14-14"/>');
  const heightIcon  = dimSvg('<path d="m8 18 4 4 4-4"/><path d="M12 2v20"/><path d="m8 6 4-4 4 4"/>');
  const weightIcon  = dimSvg('<circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.9 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.9-2.5L19.4 9.46A2 2 0 0 0 17.5 8Z"/>');
  const storageIcon = dimSvg('<line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/>');

  const hasDims  = p.dimensions && p.dimensions.longueur_cm != null;
  const hasStock = !!p.stockage;
  const hasBox   = Array.isArray(p.contenu_boite) && p.contenu_boite.length > 0;
  const hasDesc  = !!p.description_complete;
  const hasSpecs = p.features[currentLang].length > 0 || hasDims || !!p.poids_kg || hasStock;

  el.innerHTML = `
    <div class="pd-main">
      <div class="product-detail-img">
        <img src="${p.image}" alt="${p.name[currentLang]} — ${t('category.' + p.category)} | MLR TECH Madagascar" width="600" height="600">
      </div>
      <div class="product-detail-info">
        <p class="product-cat-label">${t('category.' + p.category)}</p>
        <h1 class="product-detail-name">${p.name[currentLang]}</h1>
        <div class="product-detail-rating" id="pdRating">${renderStars(p.rating)} <span>${p.rating}/5</span></div>
        <div class="product-detail-price" data-price-eur="${p.price_eur}">${formatPrice(p.price_eur)}</div>
        ${p.variants && p.variants.length ? `
        <div class="pd-variants">
          <p class="pd-variant-label">Couleur : <strong id="variantColorName">${p.variants[0].label}</strong></p>
          <div class="pd-variant-swatches">
            ${p.variants.map((v, i) => `
              <button class="pd-variant-swatch${i === 0 ? ' active' : ''}"
                      data-variant-image="${v.image}"
                      data-variant-label="${v.label}"
                      title="${v.label}"
                      style="background:${v.colorHex};"
                      aria-label="${v.label}"
                      aria-pressed="${i === 0 ? 'true' : 'false'}">
              </button>`).join('')}
          </div>
        </div>` : ''}
        <div class="pd-delivery-inline">${truckIcon}<span>Livraison estimée : <strong>${DELIVERY_DAYS} jours ouvrés</strong></span></div>
        <button class="btn btn-primary btn-full btn-add-big" data-product-id="${p.id}">${t('products.add')}</button>
        <button class="btn-fav-detail" data-fav-id="${p.id}" aria-pressed="false" aria-label="${t('favoris.add')}">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>
          <span data-i18n="favoris.add">${t('favoris.add')}</span>
        </button>
      </div>
    </div>

    <div class="pd-sections">

      ${hasDesc ? `
      <div class="pd-section pd-accordion open" id="pd-desc">
        <button class="pd-acc-toggle" aria-expanded="true"><span class="pd-acc-title">Description</span>${caretIcon}</button>
        <div class="pd-acc-body"><div class="pd-acc-inner"><p class="pd-desc-text">${p.description_complete}</p></div></div>
      </div>` : ''}

      ${hasBox ? `
      <div class="pd-section pd-accordion" id="pd-box">
        <button class="pd-acc-toggle" aria-expanded="false"><span class="pd-acc-title">Contenu du carton</span>${caretIcon}</button>
        <div class="pd-acc-body"><div class="pd-acc-inner">
          <ul class="pd-box-list">${p.contenu_boite.map(item => `<li>${checkIcon}<span>${item}</span></li>`).join('')}</ul>
        </div></div>
      </div>` : ''}

      ${hasSpecs ? `
      <div class="pd-section pd-accordion" id="pd-specs">
        <button class="pd-acc-toggle" aria-expanded="false"><span class="pd-acc-title">Caractéristiques</span>${caretIcon}</button>
        <div class="pd-acc-body"><div class="pd-acc-inner">
          ${(hasDims || p.poids_kg || hasStock) ? `<div class="pd-dims-grid">
            ${hasDims ? `
            <div class="pd-dim-card"><span class="pd-dim-icon">${lengthIcon}</span><span class="pd-dim-val">${p.dimensions.longueur_cm} cm</span><span class="pd-dim-label">Longueur</span></div>
            <div class="pd-dim-card"><span class="pd-dim-icon">${widthIcon}</span><span class="pd-dim-val">${p.dimensions.largeur_cm} cm</span><span class="pd-dim-label">Largeur</span></div>
            <div class="pd-dim-card"><span class="pd-dim-icon">${heightIcon}</span><span class="pd-dim-val">${p.dimensions.hauteur_cm} cm</span><span class="pd-dim-label">Hauteur</span></div>` : ''}
            ${p.poids_kg ? `<div class="pd-dim-card"><span class="pd-dim-icon">${weightIcon}</span><span class="pd-dim-val">${p.poids_kg} kg</span><span class="pd-dim-label">Poids</span></div>` : ''}
            ${hasStock ? `<div class="pd-dim-card"><span class="pd-dim-icon">${storageIcon}</span><span class="pd-dim-val">${p.stockage}</span><span class="pd-dim-label">Capacité de stockage</span></div>` : ''}
          </div>` : ''}
          ${p.features[currentLang].length ? `<ul class="product-features">${p.features[currentLang].map(f => `<li>${f}</li>`).join('')}</ul>` : ''}
        </div></div>
      </div>` : ''}

      <div class="pd-section pd-accordion" id="pd-reviews">
        <button class="pd-acc-toggle" aria-expanded="false"><span class="pd-acc-title">Avis clients</span>${caretIcon}</button>
        <div class="pd-acc-body"><div class="pd-acc-inner">
          <div id="reviewsSummary" class="reviews-summary"></div>
          <div id="reviewsList" class="reviews-list"></div>
          <div id="reviewFormContainer"></div>
        </div></div>
      </div>
    </div>

    <div class="sticky-cart-bar" id="stickyCartBar" aria-hidden="true">
      <span class="sticky-cart-price" data-price-eur="${p.price_eur}">${formatPrice(p.price_eur)}</span>
      <button class="btn btn-primary sticky-cart-btn" data-product-id="${p.id}">${t('products.add')}</button>
    </div>
  `;

  el.querySelector('.btn-add-big').addEventListener('click', () => addToCart(p.id));
  el.querySelector('.sticky-cart-btn').addEventListener('click', () => addToCart(p.id));

  // Variantes couleur : switch image + label au clic sur un swatch
  el.querySelectorAll('.pd-variant-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.pd-variant-swatch').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const img = el.querySelector('.product-detail-img img');
      if (img) img.src = btn.dataset.variantImage;
      const lbl = el.querySelector('#variantColorName');
      if (lbl) lbl.textContent = btn.dataset.variantLabel;
    });
  });

  if (typeof updateWishlistUI === 'function') updateWishlistUI();
  initProductAccordion(el);
  initStickyCartBar();
  loadProductReviews(p.id);
}

/* Accordéon fiche produit — desktop ET mobile, animation max-height douce.
   Chaque panneau s'ouvre/se ferme indépendamment. La section ouverte au
   chargement (Description) reçoit la classe « open » dans le HTML. */
function initProductAccordion(container) {
  const setOpen = (section, open) => {
    const body  = section.querySelector('.pd-acc-body');
    const inner = section.querySelector('.pd-acc-inner');
    const btn   = section.querySelector('.pd-acc-toggle');
    if (!body || !inner || !btn) return;
    btn.setAttribute('aria-expanded', String(open));
    if (open) {
      section.classList.add('open');
      body.style.maxHeight = inner.scrollHeight + 'px';
      // une fois ouvert, on libère la contrainte pour gérer le contenu dynamique (avis…)
      body.addEventListener('transitionend', function done(e) {
        if (e.propertyName === 'max-height' && section.classList.contains('open')) {
          body.style.maxHeight = 'none';
        }
        body.removeEventListener('transitionend', done);
      });
    } else {
      section.classList.remove('open');
      body.style.maxHeight = inner.scrollHeight + 'px';       // valeur concrète…
      requestAnimationFrame(() => { body.style.maxHeight = '0'; }); // …puis on referme
    }
  };

  container.querySelectorAll('.pd-accordion').forEach(section => {
    const body = section.querySelector('.pd-acc-body');
    if (section.classList.contains('open') && body) body.style.maxHeight = 'none';
    section.querySelector('.pd-acc-toggle')?.addEventListener('click', () => {
      setOpen(section, !section.classList.contains('open'));
    });
  });
}

function initStickyCartBar() {
  if (!window.IntersectionObserver) return;
  const mainBtn   = document.querySelector('.btn-add-big');
  const stickyBar = document.getElementById('stickyCartBar');
  if (!mainBtn || !stickyBar) return;
  new IntersectionObserver(([entry]) => {
    const show = !entry.isIntersecting;
    stickyBar.classList.toggle('visible', show);
    stickyBar.setAttribute('aria-hidden', String(!show));
  }, { threshold: 0 }).observe(mainBtn);
}

async function loadProductReviews(productId) {
  const summary  = document.getElementById('reviewsSummary');
  const list     = document.getElementById('reviewsList');
  const formWrap = document.getElementById('reviewFormContainer');
  if (!summary || !list) return;

  summary.innerHTML = '<p class="reviews-loading">Chargement des avis…</p>';
  try {
    const res  = await fetch(`/api/reviews?product_id=${encodeURIComponent(productId)}`);
    const data = await res.json();
    if (data.error) { summary.innerHTML = ''; return; }

    const reviews = data.reviews || [];
    if (reviews.length === 0) {
      summary.innerHTML = '<p class="reviews-empty">Aucun avis pour l\'instant. Soyez le premier !</p>';
    } else {
      const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
      summary.innerHTML = `<div class="reviews-avg"><span class="reviews-avg-score">${avg}</span><div><div class="reviews-avg-stars">${renderStars(parseFloat(avg))}</div><span class="reviews-avg-count">${reviews.length} avis</span></div></div>`;
    }

    list.innerHTML = reviews.map(r => `
      <div class="review-card">
        <div class="review-header">
          <span class="review-author">${r.first_name} ${r.last_name_initial}.</span>
          <span class="review-stars">${renderStars(r.rating)}</span>
          <span class="review-date">${new Date(r.created_at).toLocaleDateString('fr-FR')}</span>
        </div>
        <p class="review-comment">${r.comment}</p>
      </div>`).join('');

    if (formWrap) renderReviewForm(formWrap, productId, data.user_review);
  } catch (_) { summary.innerHTML = ''; }
}

function renderReviewForm(container, productId, hasExistingReview) {
  const user = window._mlrCurrentUser;
  if (!user) {
    container.innerHTML = `<p class="review-login-prompt"><a href="login.html?next=${encodeURIComponent(location.pathname + location.search)}">Connectez-vous</a> pour laisser un avis.</p>`;
    return;
  }
  if (hasExistingReview) {
    container.innerHTML = '<p class="review-already">Vous avez déjà laissé un avis pour ce produit.</p>';
    return;
  }
  container.innerHTML = `
    <div class="review-form-wrap">
      <h4>Laisser un avis</h4>
      <div class="star-input" role="radiogroup" aria-label="Note">
        ${[1,2,3,4,5].map(i => `<button class="star-btn" data-val="${i}" type="button" aria-label="${i} étoile${i>1?'s':''}">★</button>`).join('')}
      </div>
      <p class="star-input-hint">Sélectionnez une note</p>
      <textarea id="reviewComment" class="review-textarea" placeholder="Votre avis (10 caractères minimum)" rows="4" maxlength="1000"></textarea>
      <p class="review-error" id="reviewError" aria-live="polite"></p>
      <button class="btn btn-primary" id="submitReview">Publier mon avis</button>
    </div>`;

  let selectedRating = 0;
  const highlightStars = n => container.querySelectorAll('.star-btn').forEach((b, i) => b.classList.toggle('active', i < n));

  container.querySelectorAll('.star-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => highlightStars(+btn.dataset.val));
    btn.addEventListener('mouseleave', () => highlightStars(selectedRating));
    btn.addEventListener('click', () => {
      selectedRating = +btn.dataset.val;
      highlightStars(selectedRating);
      container.querySelector('.star-input-hint').textContent = `${selectedRating} étoile${selectedRating > 1 ? 's' : ''}`;
    });
  });

  container.querySelector('#submitReview').addEventListener('click', async () => {
    const comment   = container.querySelector('#reviewComment').value.trim();
    const errorEl   = container.querySelector('#reviewError');
    const submitBtn = container.querySelector('#submitReview');
    errorEl.textContent = '';
    if (!selectedRating)     { errorEl.textContent = 'Veuillez sélectionner une note.'; return; }
    if (comment.length < 10) { errorEl.textContent = 'Le commentaire doit faire au moins 10 caractères.'; return; }
    submitBtn.disabled = true; submitBtn.textContent = 'Publication…';
    try {
      const res  = await fetch('/api/reviews', {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, rating: selectedRating, comment }),
      });
      const data = await res.json();
      if (data.error) { errorEl.textContent = data.error; submitBtn.disabled = false; submitBtn.textContent = 'Publier mon avis'; }
      else { loadProductReviews(productId); }
    } catch (_) { errorEl.textContent = 'Erreur réseau. Réessayez.'; submitBtn.disabled = false; submitBtn.textContent = 'Publier mon avis'; }
  });
}

/* ── CART page ──────────────────────────────────────────── */
function initCartPage() {
  updateCartDisplay();
  // Le checkout est géré par js/account.js (doCheckout) via délégation —
  // crée une vraie commande en base si l'utilisateur est connecté.
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
