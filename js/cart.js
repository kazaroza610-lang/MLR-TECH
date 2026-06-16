/* ── Cart state ───────────────────────────────────────────── */
let cart = JSON.parse(localStorage.getItem('mlr-cart') || '[]');

function saveCart() {
  localStorage.setItem('mlr-cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    const product = getProductById(productId);
    if (!product) return;
    cart.push({ id: productId, qty: 1 });
  }
  saveCart();
  updateCartCount();
  updateCartDisplay();
  showToast(t('toast.added'));
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartCount();
  updateCartDisplay();
  showToast(t('toast.removed'));
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartDisplay();
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = getProductById(item.id);
    return sum + (p ? p.price_eur * item.qty : 0);
  }, 0);
}

/* ── UI ───────────────────────────────────────────────────── */
function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

function updateCartDisplay() {
  const body = document.getElementById('cartBody');
  if (!body) return;

  if (!cart.length) {
    body.innerHTML = `<p class="cart-empty">${t('cart.empty')}</p>`;
  } else {
    body.innerHTML = '';
    cart.forEach(item => {
      const p = getProductById(item.id);
      if (!p) return;
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <img src="${p.image}" alt="${p.name[currentLang]}" width="60" height="60">
        <div class="cart-item-info">
          <p class="cart-item-name">${p.name[currentLang]}</p>
          <p class="cart-item-price" data-price-eur="${p.price_eur}">${formatPrice(p.price_eur)}</p>
        </div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="changeQty('${p.id}',-1)" aria-label="Diminuer">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${p.id}',1)" aria-label="Augmenter">+</button>
          <button class="remove-btn" onclick="removeFromCart('${p.id}')" aria-label="Supprimer">✕</button>
        </div>
      `;
      body.appendChild(row);
    });
  }

  const totalEl = document.getElementById('cartTotalAmount');
  if (totalEl) totalEl.textContent = formatPrice(getCartTotal());

  const cartTitleEl = document.querySelector('.cart-title');
  if (cartTitleEl) cartTitleEl.textContent = t('cart.title');

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.textContent = t('cart.checkout');

  const continueBtn = document.getElementById('continueBtn');
  if (continueBtn) continueBtn.textContent = t('cart.continue');

  const totalLabel = document.querySelector('.cart-total-label');
  if (totalLabel) totalLabel.textContent = t('cart.total');
}

/* ── Panel open/close ─────────────────────────────────────── */
function openCart() {
  document.getElementById('cartPanel')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartPanel')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Toast ────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ── Init cart UI (injected into every page) ─────────────── */
function initCart() {
  const overlay = document.createElement('div');
  overlay.id = 'cartOverlay';
  overlay.className = 'cart-overlay';
  overlay.addEventListener('click', closeCart);

  const panel = document.createElement('aside');
  panel.id = 'cartPanel';
  panel.className = 'cart-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', t('cart.title'));
  panel.innerHTML = `
    <div class="cart-header">
      <h2 class="cart-title">${t('cart.title')}</h2>
      <button class="cart-close" id="cartClose" aria-label="Fermer">✕</button>
    </div>
    <div class="cart-body" id="cartBody"></div>
    <div class="cart-footer">
      <div class="cart-total-row">
        <span class="cart-total-label">${t('cart.total')}</span>
        <span class="cart-total-amount" id="cartTotalAmount">0 €</span>
      </div>
      <button class="btn btn-primary btn-full" id="checkoutBtn">${t('cart.checkout')}</button>
      <button class="btn btn-ghost btn-full" id="continueBtn">${t('cart.continue')}</button>
    </div>
  `;

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  document.body.appendChild(overlay);
  document.body.appendChild(panel);
  document.body.appendChild(toast);

  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('continueBtn').addEventListener('click', closeCart);

  const cartBtns = document.querySelectorAll('.cart-btn');
  cartBtns.forEach(btn => btn.addEventListener('click', openCart));

  updateCartCount();
  updateCartDisplay();
}
