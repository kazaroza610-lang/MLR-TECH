/* ═══════════════════════════════════════════════
   SEO — Mise à jour dynamique des balises <head>
   ───────────────────────────────────────────────
   Les pages catégorie/produit étant rendues côté
   client (paramètres ?cat= / ?id=), ce module met à
   jour dynamiquement : <title>, meta description,
   canonical, Open Graph, Twitter Card et les blocs
   JSON-LD (Schema.org). Googlebot exécute le JS et
   lit donc ces balises mises à jour.
   ═══════════════════════════════════════════════ */

/* URL de base du site (domaine de production) */
const SEO_BASE = 'https://mlr-tech.com';

/* ── Helpers : créent la balise si absente, sinon la mettent à jour ── */
function setMetaName(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaProp(property, content) {
  let el = document.head.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
  setMetaProp('og:url', url);
}

/* Injecte (ou remplace) un bloc JSON-LD identifié par son id */
function injectJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/* ── Applique un jeu complet de balises SEO à la page courante ── */
function applySEO({ title, description, canonical, image, type = 'website' }) {
  if (title) {
    document.title = title;
    setMetaProp('og:title', title);
    setMetaName('twitter:title', title);
  }
  if (description) {
    setMetaName('description', description);
    setMetaProp('og:description', description);
    setMetaName('twitter:description', description);
  }
  if (canonical) setCanonical(canonical);
  if (image) {
    setMetaProp('og:image', image);
    setMetaName('twitter:image', image);
  }
  setMetaProp('og:type', type);
}

/* ── Fil d'Ariane (BreadcrumbList Schema.org) ── */
function setBreadcrumb(items) {
  injectJsonLd('ld-breadcrumb', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url
    }))
  });
}
