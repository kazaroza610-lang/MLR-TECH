/* ═══════════════════════════════════════════════
   MLR TECH — Compte client (front)
   ───────────────────────────────────────────────
   • Dropdown compte dans le header (toutes les pages)
   • Connexion / Inscription (login.html / register.html)
   • Tableau de bord (compte.html)
   • Mini-admin statuts (admin.html)
   Appelle les fonctions serverless /api/* (cookie httpOnly).
   Si l'API n'est pas encore branchée, on retombe
   proprement sur l'état « non connecté ».
   ═══════════════════════════════════════════════ */

/* ── État courant (mémoïsé le temps de la page) ── */
let MLR_USER = undefined; // undefined = pas encore chargé, null = déconnecté

/* Libellés des statuts de commande (FR) */
const ORDER_STATUS = {
  en_preparation: { label: 'En préparation', cls: 'st-prep' },
  expediee:       { label: 'Expédiée',       cls: 'st-ship' },
  en_transit:     { label: 'En transit',     cls: 'st-transit' },
  livree:         { label: 'Livrée',         cls: 'st-done' },
};

/* ── Helpers fetch JSON ── */
async function apiGet(url) {
  const r = await fetch(url, { credentials: 'include' });
  if (!r.ok) throw await apiError(r);
  return r.json();
}
async function apiSend(url, method, body) {
  const r = await fetch(url, {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw await apiError(r);
  return r.json();
}
async function apiError(r) {
  let msg = 'Une erreur est survenue. Réessayez.';
  try { const d = await r.json(); if (d && d.error) msg = d.error; } catch (_) {}
  const e = new Error(msg); e.status = r.status; return e;
}

/* ── Charge l'utilisateur courant (tolérant aux pannes) ── */
async function loadCurrentUser() {
  if (MLR_USER !== undefined) return MLR_USER;
  try {
    const data = await apiGet('/api/auth/me');
    MLR_USER = data.user || null;
  } catch (_) {
    MLR_USER = null; // API absente ou non connecté
  }
  return MLR_USER;
}

/* ── Validation client ── */
function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function isValidPassword(v) { return typeof v === 'string' && v.length >= 8; }

/* ═══════════════════════════════════════════════
   1) DROPDOWN COMPTE (header — toutes pages)
   ═══════════════════════════════════════════════ */
function initAccountMenu() {
  const toggle = document.getElementById('accountToggle');
  const menu   = document.getElementById('accountMenu');
  if (!toggle || !menu) return;

  const open  = () => { menu.classList.add('open'); menu.setAttribute('aria-hidden', 'false'); toggle.setAttribute('aria-expanded', 'true'); };
  const close = () => { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); toggle.setAttribute('aria-expanded', 'false'); };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.contains('open') ? close() : open();
  });
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // Rendu selon l'état de connexion
  loadCurrentUser().then(user => { window._mlrCurrentUser = user; renderAccountMenu(user, menu); });
}

function renderAccountMenu(user, menu) {
  const dot = document.getElementById('accountDot');
  if (user) {
    if (dot) dot.classList.add('show');
    menu.innerHTML = `
      <div class="am-greeting">Bonjour,<strong>${escapeHtml(user.first_name || user.email)}</strong></div>
      <a href="compte.html" role="menuitem">👤 Mon compte</a>
      <a href="compte.html#commandes" role="menuitem">📦 Mes commandes / Suivi</a>
      ${user.is_admin ? '<a href="admin.html" role="menuitem">🛠️ Admin commandes</a>' : ''}
      <button type="button" class="am-logout" id="amLogout" role="menuitem">↩ Se déconnecter</button>
    `;
    const lo = menu.querySelector('#amLogout');
    if (lo) lo.addEventListener('click', doLogout);
  } else {
    if (dot) dot.classList.remove('show');
    menu.innerHTML = `
      <a href="login.html" class="am-primary" role="menuitem">Se connecter</a>
      <a href="register.html" role="menuitem">Créer un compte</a>
    `;
  }
}

async function doLogout() {
  try { await apiSend('/api/auth/logout', 'POST'); } catch (_) {}
  MLR_USER = null;
  window.location.href = 'index.html';
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

/* ═══════════════════════════════════════════════
   2) PAGE CONNEXION (login.html)
   ═══════════════════════════════════════════════ */
function initLoginPage() {
  const form = document.getElementById('loginForm');
  if (!form) return;
  const err = document.getElementById('formError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    err.textContent = '';
    const email = form.email.value.trim();
    const password = form.password.value;
    if (!isValidEmail(email)) return showError(err, 'Adresse email invalide.');
    if (!password) return showError(err, 'Veuillez saisir votre mot de passe.');

    const btn = form.querySelector('button[type="submit"]');
    setLoading(btn, true);
    try {
      await apiSend('/api/auth/login', 'POST', { email, password });
      const next = new URLSearchParams(location.search).get('next') || 'compte.html';
      window.location.href = next;
    } catch (ex) {
      showError(err, ex.status === 401 ? 'Email ou mot de passe incorrect.' : ex.message);
      setLoading(btn, false);
    }
  });
}

/* ═══════════════════════════════════════════════
   3) PAGE INSCRIPTION (register.html)
   ═══════════════════════════════════════════════ */
function initRegisterPage() {
  const form = document.getElementById('registerForm');
  if (!form) return;
  const err = document.getElementById('formError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    err.textContent = '';
    const first_name = form.first_name.value.trim();
    const last_name  = form.last_name.value.trim();
    const email      = form.email.value.trim();
    const password   = form.password.value;
    const password2  = form.password2.value;
    const phone      = form.phone.value.trim();

    if (!first_name || !last_name) return showError(err, 'Nom et prénom sont requis.');
    if (!isValidEmail(email))      return showError(err, 'Adresse email invalide.');
    if (!isValidPassword(password)) return showError(err, 'Le mot de passe doit contenir au moins 8 caractères.');
    if (password !== password2)    return showError(err, 'Les mots de passe ne correspondent pas.');

    const btn = form.querySelector('button[type="submit"]');
    setLoading(btn, true);
    try {
      await apiSend('/api/auth/register', 'POST', { first_name, last_name, email, password, phone });
      window.location.href = 'compte.html';
    } catch (ex) {
      showError(err, ex.status === 409 ? 'Un compte existe déjà avec cet email.' : ex.message);
      setLoading(btn, false);
    }
  });
}

/* ═══════════════════════════════════════════════
   4) TABLEAU DE BORD (compte.html)
   ═══════════════════════════════════════════════ */
async function initAccountPage() {
  const root = document.getElementById('accountDashboard');
  if (!root) return;

  const user = await loadCurrentUser();
  if (!user) { window.location.href = 'login.html?next=compte.html'; return; }

  // Infos perso
  fillProfile(user);
  document.getElementById('profileForm')?.addEventListener('submit', saveProfile);

  // Adresses + commandes
  loadAddresses();
  loadOrders();
}

function fillProfile(u) {
  const f = document.getElementById('profileForm');
  if (!f) return;
  f.first_name.value = u.first_name || '';
  f.last_name.value  = u.last_name || '';
  f.phone.value      = u.phone || '';
  const em = document.getElementById('profileEmail');
  if (em) em.textContent = u.email;
}

async function saveProfile(e) {
  e.preventDefault();
  const f = e.target;
  const msg = document.getElementById('profileMsg');
  msg.textContent = '';
  const btn = f.querySelector('button[type="submit"]');
  setLoading(btn, true);
  try {
    const { user } = await apiSend('/api/account/profile', 'PUT', {
      first_name: f.first_name.value.trim(),
      last_name:  f.last_name.value.trim(),
      phone:      f.phone.value.trim(),
    });
    MLR_USER = user;
    msg.textContent = '✓ Informations enregistrées.';
    msg.className = 'form-msg ok';
  } catch (ex) {
    msg.textContent = ex.message;
    msg.className = 'form-msg err';
  }
  setLoading(btn, false);
}

async function loadAddresses() {
  const wrap = document.getElementById('addressList');
  if (!wrap) return;
  try {
    const { addresses } = await apiGet('/api/account/addresses');
    renderAddresses(addresses, wrap);
  } catch (ex) {
    wrap.innerHTML = `<p class="muted">Impossible de charger les adresses.</p>`;
  }
}

function renderAddresses(addresses, wrap) {
  if (!addresses || !addresses.length) {
    wrap.innerHTML = `<p class="muted">Aucune adresse enregistrée.</p>`;
    return;
  }
  wrap.innerHTML = addresses.map(a => `
    <div class="address-card">
      <strong>${escapeHtml(a.recipient || '')}</strong>
      <span>${escapeHtml(a.line1 || '')}${a.line2 ? ', ' + escapeHtml(a.line2) : ''}</span>
      <span>${escapeHtml(a.city || '')} ${escapeHtml(a.region || '')}</span>
      <span>${escapeHtml(a.country || 'Madagascar')} · ${escapeHtml(a.phone || '')}</span>
      <button type="button" class="btn-text addr-del" data-id="${a.id}">Supprimer</button>
    </div>
  `).join('');
  wrap.querySelectorAll('.addr-del').forEach(b => {
    b.addEventListener('click', async () => {
      try { await apiSend('/api/account/addresses', 'DELETE', { id: Number(b.dataset.id) }); loadAddresses(); }
      catch (ex) { alert(ex.message); }
    });
  });
}

function initAddressForm() {
  const f = document.getElementById('addressForm');
  if (!f) return;
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = f.querySelector('button[type="submit"]');
    setLoading(btn, true);
    try {
      await apiSend('/api/account/addresses', 'POST', {
        recipient: f.recipient.value.trim(),
        line1: f.line1.value.trim(),
        line2: f.line2.value.trim(),
        city: f.city.value.trim(),
        region: f.region.value.trim(),
        phone: f.phone.value.trim(),
        country: 'Madagascar',
      });
      f.reset();
      loadAddresses();
    } catch (ex) { alert(ex.message); }
    setLoading(btn, false);
  });
}

async function loadOrders() {
  const wrap = document.getElementById('orderList');
  if (!wrap) return;
  try {
    const { orders } = await apiGet('/api/orders');
    renderOrders(orders, wrap);
  } catch (ex) {
    wrap.innerHTML = `<p class="muted">Impossible de charger les commandes.</p>`;
  }
}

function renderOrders(orders, wrap) {
  if (!orders || !orders.length) {
    wrap.innerHTML = `<p class="muted">Vous n'avez pas encore de commande.</p>`;
    return;
  }
  wrap.innerHTML = orders.map(o => {
    const st = ORDER_STATUS[o.status] || { label: o.status, cls: '' };
    const tracking = o.tracking_number
      ? `<div class="order-track">Suivi ${escapeHtml(o.carrier || '')} : <strong>${escapeHtml(o.tracking_number)}</strong></div>`
      : `<div class="order-track muted">Numéro de suivi communiqué dès l'expédition.</div>`;
    return `
      <div class="order-card">
        <div class="order-head">
          <span class="order-num">Commande ${escapeHtml(o.order_number)}</span>
          <span class="order-status ${st.cls}">${st.label}</span>
        </div>
        <div class="order-meta">${formatOrderDate(o.created_at)} · ${formatPrice ? formatPrice(o.total_eur) : o.total_eur + ' €'}</div>
        ${renderTracker(o.status)}
        ${tracking}
      </div>`;
  }).join('');
}

/* Barre de progression du suivi */
function renderTracker(status) {
  const steps = ['en_preparation', 'expediee', 'en_transit', 'livree'];
  const idx = steps.indexOf(status);
  const stepsHtml = steps.map((s, i) => `
    <div class="tracker-step ${i <= idx ? 'done' : ''}">
      <span class="tracker-dot"></span>
      <span class="tracker-label">${ORDER_STATUS[s].label}</span>
    </div>`).join('');
  return `<div class="tracker">${stepsHtml}</div>`;
}

function formatOrderDate(d) {
  try { return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }); }
  catch (_) { return d; }
}

/* ═══════════════════════════════════════════════
   5) MINI-ADMIN (admin.html)
   ═══════════════════════════════════════════════ */
async function initAdminPage() {
  const root = document.getElementById('adminOrders');
  if (!root) return;
  const user = await loadCurrentUser();
  if (!user) { window.location.href = 'login.html?next=admin.html'; return; }
  if (!user.is_admin) { root.innerHTML = '<p class="muted">Accès réservé à l\'administration.</p>'; return; }
  loadAdminOrders();
}

async function loadAdminOrders() {
  const root = document.getElementById('adminOrders');
  try {
    const { orders } = await apiGet('/api/admin/orders');
    if (!orders.length) { root.innerHTML = '<p class="muted">Aucune commande.</p>'; return; }
    root.innerHTML = orders.map(o => `
      <div class="admin-order">
        <div>
          <strong>${escapeHtml(o.order_number)}</strong>
          <span class="muted"> · ${escapeHtml(o.email || '')}</span>
        </div>
        <div class="admin-row">
          <select data-id="${o.id}" class="admin-status">
            ${Object.keys(ORDER_STATUS).map(s => `<option value="${s}" ${s === o.status ? 'selected' : ''}>${ORDER_STATUS[s].label}</option>`).join('')}
          </select>
          <input type="text" class="admin-tracking" data-id="${o.id}" placeholder="N° de suivi" value="${escapeHtml(o.tracking_number || '')}">
          <input type="text" class="admin-carrier" data-id="${o.id}" placeholder="Transporteur" value="${escapeHtml(o.carrier || '')}">
          <button type="button" class="btn btn-primary admin-save" data-id="${o.id}">Enregistrer</button>
        </div>
      </div>`).join('');
    root.querySelectorAll('.admin-save').forEach(b => {
      b.addEventListener('click', async () => {
        const id = Number(b.dataset.id);
        const status   = root.querySelector(`.admin-status[data-id="${id}"]`).value;
        const tracking = root.querySelector(`.admin-tracking[data-id="${id}"]`).value.trim();
        const carrier  = root.querySelector(`.admin-carrier[data-id="${id}"]`).value.trim();
        b.textContent = '…';
        try {
          await apiSend('/api/admin/orders', 'PUT', { id, status, tracking_number: tracking, carrier });
          b.textContent = '✓';
          setTimeout(() => { b.textContent = 'Enregistrer'; }, 1500);
        } catch (ex) { alert(ex.message); b.textContent = 'Enregistrer'; }
      });
    });
  } catch (ex) {
    root.innerHTML = `<p class="muted">Erreur de chargement.</p>`;
  }
}

/* ═══════════════════════════════════════════════
   6) CHECKOUT — crée une vraie commande en base
   ═══════════════════════════════════════════════ */
async function doCheckout() {
  if (typeof cart === 'undefined' || !cart.length) {
    if (typeof showToast === 'function') showToast('Votre panier est vide.');
    return;
  }
  const user = await loadCurrentUser();
  if (!user) {
    // Pas connecté → on invite à se connecter, puis retour au panier
    window.location.href = 'login.html?next=cart.html';
    return;
  }
  const items = cart.map(i => {
    if (i.custom) {
      return { product_id: i.id, name: i.custom.caseLabel, price_eur: i.custom.price_eur, qty: i.qty };
    }
    const p = getProductById(i.id);
    return p ? { product_id: p.id, name: p.name.fr, price_eur: p.price_eur, qty: i.qty } : null;
  }).filter(Boolean);
  if (!items.length) return;

  try {
    await apiSend('/api/orders', 'POST', { items });
    // Vide le panier puis redirige vers le suivi
    cart.length = 0;
    localStorage.setItem('mlr-cart', '[]');
    if (typeof updateCartCount === 'function') updateCartCount();
    window.location.href = 'compte.html#commandes';
  } catch (ex) {
    alert(ex.message || 'Erreur lors de la création de la commande.');
  }
}

/* ── UI utils ── */
function showError(el, msg) { el.textContent = msg; el.className = 'form-msg err'; }
function setLoading(btn, on) {
  if (!btn) return;
  if (on) { btn.dataset.label = btn.textContent; btn.disabled = true; btn.textContent = 'Veuillez patienter…'; }
  else { btn.disabled = false; if (btn.dataset.label) btn.textContent = btn.dataset.label; }
}

/* Exposé globalement pour que main.js puisse lire l'utilisateur courant */
window.mlrLoadUser = loadCurrentUser;

/* ── Bootstrap (après le DOM) ── */
document.addEventListener('DOMContentLoaded', () => {
  initAccountMenu();
  initLoginPage();
  initRegisterPage();
  initAddressForm();
  initAccountPage();
  initAdminPage();

  // Checkout (boutons #checkoutBtn — panneau panier ET page cart.html)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#checkoutBtn');
    if (btn) { e.preventDefault(); doCheckout(); }
  });
});
