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

/* ── Hamburger menu ─────────────────────────────────────── */
function initMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ── Search ─────────────────────────────────────────────── */
function initSearch() {
  const desktopInput  = document.getElementById('searchInput');
  const mobileBtn     = document.getElementById('mobileSearchBtn');
  const mobileBar     = document.getElementById('mobileSearchBar');
  const mobileInput   = document.getElementById('mobileSearchInput');
  const mobileClose   = document.getElementById('mobileSearchClose');

  if (mobileBtn && mobileBar) {
    mobileBtn.addEventListener('click', () => {
      mobileBar.classList.add('open');
      mobileInput?.focus();
    });
  }
  if (mobileClose && mobileBar) {
    mobileClose.addEventListener('click', () => mobileBar.classList.remove('open'));
  }

  [desktopInput, mobileInput].forEach(input => {
    if (!input) return;
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
  });
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
          <img src="${cat.image}" alt="${t('category.' + cat.slug)}" loading="lazy" width="600" height="350">
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

  document.title = `MLR TECH – ${t('category.' + slug)}`;

  const backLink = document.getElementById('backLink');
  if (backLink) backLink.textContent = t('back');

  currentProducts = getProductsByCategory(slug);
  const grid = document.getElementById('productsGrid');
  if (grid) renderProductGrid(currentProducts, grid);

  initPriceFilter();
  markActiveNav(`category.html?cat=${slug}`);
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

  document.title = `MLR TECH – ${product.name[currentLang]}`;
  renderProductDetail(product);

  const similarGrid = document.getElementById('similarGrid');
  if (similarGrid) renderProductGrid(getSimilarProducts(product, 4), similarGrid);
}

function renderProductDetail(p) {
  const el = document.getElementById('productDetail');
  if (!el) return;
  el.innerHTML = `
    <div class="product-detail-img">
      <img src="${p.image}" alt="${p.name[currentLang]}" width="600" height="600">
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
