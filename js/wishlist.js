/* ═══════════════════════════════════════════════
   WISHLIST / FAVORIS  (persistance localStorage)
   ═══════════════════════════════════════════════ */
const WISHLIST_KEY = 'mlr-wishlist';

function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
  catch { return []; }
}

function saveWishlist(ids) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
}

function isInWishlist(id) {
  return getWishlist().includes(id);
}

function toggleWishlist(id) {
  const ids = getWishlist();
  const i = ids.indexOf(id);
  if (i >= 0) ids.splice(i, 1);
  else ids.push(id);
  saveWishlist(ids);
  // Si on est sur la page Favoris, on régénère la grille (retrait visible immédiat)
  if (document.body.dataset.page === 'favoris' && typeof renderFavoris === 'function') {
    renderFavoris();
  }
  updateWishlistUI();
  return ids.includes(id);
}

/* Met à jour le compteur (pastille) sur l'icône Favoris du header */
function updateWishlistCount() {
  const n = getWishlist().length;
  document.querySelectorAll('.fav-count').forEach(el => {
    el.textContent = n;
    el.style.display = n > 0 ? 'flex' : 'none';
  });
}

/* Synchronise tous les cœurs visibles + le compteur.
   NB : ne re-rend PAS la page favoris ici (renderProductGrid appelle cette
   fonction → cela créerait une récursion renderFavoris ↔ renderProductGrid).
   Le re-render de la page favoris est déclenché par toggleWishlist. */
function updateWishlistUI() {
  updateWishlistCount();
  document.querySelectorAll('[data-fav-id]').forEach(btn => {
    const active = isInWishlist(btn.dataset.favId);
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

function initWishlist() {
  updateWishlistUI();
  // Délégation : tout bouton [data-fav-id] bascule le favori
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-fav-id]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(btn.dataset.favId);
  });
}
